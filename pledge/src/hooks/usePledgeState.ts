import { useCallback, useEffect, useRef, useState } from "react";
import { apiSubmit, apiLookup, apiRescind, apiList } from "@/lib/api";
import { readPledgeCookie, writePledgeCookie, clearPledgeCookie, tempId } from "@/lib/storage";
import type { PublicPledge } from "@/types";

type Local =
  | { kind: "fresh" }
  | { kind: "submitting" }
  | { kind: "pending"; id: string; email: string; firstName: string; company: string }
  | { kind: "approved"; id: string; email: string; firstName: string; company: string };

const POLL_MS = 60_000;

export function usePledgeState() {
  const [local, setLocal] = useState<Local>({ kind: "fresh" });
  const [list, setList] = useState<PublicPledge[] | null>(null);
  const [listHidden, setListHidden] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const listRetryTimer = useRef<number | null>(null);

  const refreshList = useCallback(async (retryOnFail = true) => {
    try {
      const data = await apiList();
      setList(data);
      setListHidden(false);
    } catch (err) {
      console.warn("[pledge] list fetch failed", err);
      if (retryOnFail) {
        listRetryTimer.current = window.setTimeout(() => refreshList(false), 5_000);
      } else {
        setListHidden(true);
      }
    }
  }, []);

  const refreshMe = useCallback(async () => {
    const cookie = readPledgeCookie();
    if (!cookie) return;
    try {
      const row = await apiLookup(cookie.email);
      if (!row) {
        if (cookie.id.startsWith("temp-")) return;
        clearPledgeCookie();
        setLocal({ kind: "fresh" });
        return;
      }
      if (row.id !== cookie.id) writePledgeCookie({ id: row.id, email: cookie.email });
      if (row.status === "rescinded") {
        clearPledgeCookie();
        setLocal({ kind: "fresh" });
      } else {
        setLocal({
          kind: row.status,
          id: row.id,
          email: cookie.email,
          firstName: row.firstName,
          company: row.company,
        });
      }
    } catch (err) {
      console.warn("[pledge] lookup failed", err);
    }
  }, []);

  useEffect(() => {
    refreshList(true);
    refreshMe();
    const iv = window.setInterval(() => {
      refreshList(false);
      refreshMe();
    }, POLL_MS);
    return () => {
      window.clearInterval(iv);
      if (listRetryTimer.current) window.clearTimeout(listRetryTimer.current);
    };
  }, [refreshList, refreshMe]);

  const submit = useCallback(async (data: {
    firstName: string; lastName: string; email: string; company: string; role: string;
  }) => {
    setSubmitError(null);
    setLocal({ kind: "submitting" });
    try {
      await apiSubmit(data);
      const cookie = { id: tempId(), email: data.email };
      writePledgeCookie(cookie);
      setLocal({
        kind: "pending",
        id: cookie.id,
        email: data.email,
        firstName: data.firstName,
        company: data.company,
      });
      refreshMe();
    } catch (err) {
      console.warn("[pledge] submit failed", err);
      setSubmitError("Couldn't submit — please try again.");
      setLocal({ kind: "fresh" });
    }
  }, [refreshMe]);

  const rescind = useCallback(async () => {
    if (local.kind !== "pending" && local.kind !== "approved") return;
    try {
      let id = local.id;
      // Temp ids are local-only placeholders — resolve the real sheet row id first.
      if (id.startsWith("temp-")) {
        const row = await apiLookup(local.email);
        if (!row) throw new Error("pledge not found yet — try again in a moment");
        id = row.id;
        writePledgeCookie({ id: row.id, email: local.email });
      }
      const result = await apiRescind(id, local.email);
      if (result.ok) {
        clearPledgeCookie();
        setLocal({ kind: "fresh" });
        refreshList(false);
      } else {
        throw new Error(result.error || "rescind failed");
      }
    } catch (err) {
      console.warn("[pledge] rescind failed", err);
      throw err;
    }
  }, [local, refreshList]);

  const lookupByEmail = useCallback(async (email: string) => {
    const normalized = email.toLowerCase().trim();
    const row = await apiLookup(normalized);
    if (!row) return null;
    writePledgeCookie({ id: row.id, email: normalized });
    if (row.status === "rescinded") {
      clearPledgeCookie();
      setLocal({ kind: "fresh" });
      return null;
    }
    setLocal({
      kind: row.status,
      id: row.id,
      email: normalized,
      firstName: row.firstName,
      company: row.company,
    });
    return row;
  }, []);

  return {
    local,
    list,
    listHidden,
    submitError,
    submit,
    rescind,
    lookupByEmail,
    refreshList,
  };
}
