import { useState, useCallback } from "react";

export default function useTapRipple() {
  const [ripples, setRipples] = useState([]);

  const showTap = useCallback((x, y) => {
    const id = Date.now() + Math.random();
    setRipples(r => [...r, { id, x, y }]);
    setTimeout(() => setRipples(r => r.filter(t => t.id !== id)), 900);
  }, []);

  const TapOverlay = () => (
    <>
      <style>{`
        .tap-ripple-container{pointer-events:none;z-index:9999;position:absolute}
        .tap-finger{background:rgba(0,0,0,0.12);border-radius:50%;width:44px;height:44px;animation:.8s forwards tapDown;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(0)}
        .tap-ring{opacity:0;background:#fff;border:2px solid #0e544e;border-radius:50%;width:44px;height:44px;animation:.8s .15s forwards tapRing;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(1)}
        @keyframes tapDown{0%{opacity:0;transform:translate(-50%,-50%) scale(0)}30%{opacity:1;transform:translate(-50%,-50%) scale(1)}70%{opacity:1;transform:translate(-50%,-50%) scale(1)}to{opacity:0;transform:translate(-50%,-50%) scale(.9)}}
        @keyframes tapRing{0%{opacity:1;transform:translate(-50%,-50%) scale(1)}to{opacity:0;transform:translate(-50%,-50%) scale(3)}}
      `}</style>
      {ripples.map(r => (
        <div key={r.id} className="tap-ripple-container" style={{ left: r.x, top: r.y }}>
          <div className="tap-finger" />
          <div className="tap-ring" />
        </div>
      ))}
    </>
  );

  return { showTap, TapOverlay };
}
