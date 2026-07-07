import type { PublicPledge, PrivatePledge } from "@/types";

const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx3Ol5gXIS3d0rwY7vnl73l8a5mIwpBk311MFC2Eogv7qI7K88KNRRVCWP6NgdXXocppw/exec";

export async function apiList(): Promise<PublicPledge[]> {
  const res = await fetch(`${APPS_SCRIPT_URL}?action=list`, { redirect: "follow" });
  if (!res.ok) throw new Error(`list failed: ${res.status}`);
  return res.json();
}

export async function apiSubmit(data: {
  firstName: string; lastName: string; email: string; company: string; role: string;
}): Promise<void> {
  await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "submit", ...data }),
  });
}

export function apiLookup(email: string): Promise<PrivatePledge | null> {
  return jsonp("lookup", { email });
}

export function apiRescind(id: string, email: string): Promise<{ ok?: true; error?: string }> {
  return jsonp("rescind", { id, email });
}

function jsonp<T>(action: string, params: Record<string, string>): Promise<T> {
  return new Promise((resolve, reject) => {
    const cb = `_nirvana_cb_${Math.random().toString(36).slice(2)}`;
    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error(`${action} timeout`));
    }, 10_000);
    (window as any)[cb] = (data: T) => {
      cleanup();
      resolve(data);
    };
    const cleanup = () => {
      clearTimeout(timeout);
      delete (window as any)[cb];
      script.remove();
    };
    const qs = new URLSearchParams({ action, callback: cb, ...params });
    const script = document.createElement("script");
    script.src = `${APPS_SCRIPT_URL}?${qs.toString()}`;
    script.onerror = () => { cleanup(); reject(new Error(`${action} network error`)); };
    document.body.appendChild(script);
  });
}
