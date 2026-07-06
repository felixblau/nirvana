const KEY = "nirvana_pledge";

export type PledgeCookie = { id: string; email: string };

export function readPledgeCookie(): PledgeCookie | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (
      typeof parsed === "object" && parsed !== null &&
      typeof (parsed as PledgeCookie).id === "string" &&
      typeof (parsed as PledgeCookie).email === "string"
    ) {
      return parsed as PledgeCookie;
    }
    localStorage.removeItem(KEY);
    return null;
  } catch {
    return null;
  }
}

export function writePledgeCookie(c: PledgeCookie): void {
  try { localStorage.setItem(KEY, JSON.stringify(c)); } catch {}
}

export function clearPledgeCookie(): void {
  try { localStorage.removeItem(KEY); } catch {}
}

export function tempId(): string {
  return `temp-${Math.random().toString(36).slice(2, 12)}`;
}
