"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { API_URL } from "@/lib/api";

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    fetch(`${API_URL}/visits`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname }),
    }).catch(() => {});
  }, [pathname]);

  useEffect(() => {
    function ping() {
      fetch(`${API_URL}/heartbeat`, { method: "POST" }).catch(() => {});
    }
    ping();
    const interval = setInterval(ping, 20000);
    return () => clearInterval(interval);
  }, []);

  return null;
}
