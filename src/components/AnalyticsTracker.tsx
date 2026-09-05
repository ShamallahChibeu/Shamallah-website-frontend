"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { API_URL } from "@/lib/api";
import { getSessionId } from "@/lib/analytics";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const sessionId = getSessionId();
    fetch(`${API_URL}/visits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, session_id: sessionId }),
    }).catch(() => {});
  }, [pathname]);

  useEffect(() => {
    const sessionId = getSessionId();
    function ping() {
      fetch(`${API_URL}/heartbeat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId }),
      }).catch(() => {});
    }
    ping();
    const interval = setInterval(ping, 20000);
    return () => clearInterval(interval);
  }, []);

  return null;
}
