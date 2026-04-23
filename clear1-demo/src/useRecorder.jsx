import { useRef, useCallback } from "react";
import html2canvas from "html2canvas";

export default function useRecorder(phoneRef) {
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const rafRef = useRef(null);
  const canvasRef = useRef(null);

  const startRecording = useCallback(async () => {
    const phone = phoneRef.current;
    if (!phone) return;

    const w = 375 * 2;
    const h = 780 * 2;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvasRef.current = canvas;
    const ctx = canvas.getContext("2d");

    const stream = canvas.captureStream(30);
    const recorder = new MediaRecorder(stream, {
      mimeType: "video/webm;codecs=vp9",
      videoBitsPerSecond: 8_000_000,
    });
    chunksRef.current = [];
    recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
    recorder.start(100);
    recorderRef.current = recorder;

    async function captureFrame() {
      try {
        const snapshot = await html2canvas(phone, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: null,
          width: 375,
          height: 780,
        });
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(snapshot, 0, 0, w, h);
      } catch {}
      if (recorderRef.current?.state === "recording") {
        rafRef.current = setTimeout(() => captureFrame(), 1000 / 15);
      }
    }
    captureFrame();
  }, [phoneRef]);

  const stopRecording = useCallback(() => {
    return new Promise(resolve => {
      clearTimeout(rafRef.current);
      const recorder = recorderRef.current;
      if (!recorder || recorder.state !== "recording") { resolve(null); return; }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "clear1-demo.webm";
        a.click();
        URL.revokeObjectURL(url);
        resolve(blob);
      };
      recorder.stop();
    });
  }, []);

  return { startRecording, stopRecording };
}
