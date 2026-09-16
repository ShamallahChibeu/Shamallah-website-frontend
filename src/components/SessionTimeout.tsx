"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getToken, clearToken } from "@/lib/auth";

const IDLE_LIMIT_MS = 10 * 60 * 1000;
const COUNTDOWN_SECONDS = 60;

export default function SessionTimeout() {
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const showWarningRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    showWarningRef.current = showWarning;
  }, [showWarning]);

  const logout = useCallback(() => {
    clearToken();
    router.push("/admin/login");
  }, [router]);

  const startCountdown = useCallback(() => {
    setShowWarning(true);
    setSecondsLeft(COUNTDOWN_SECONDS);
    countdownRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (countdownRef.current) clearInterval(countdownRef.current);
          logout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [logout]);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(startCountdown, IDLE_LIMIT_MS);
  }, [startCountdown]);

  function handleStayLoggedIn() {
    if (countdownRef.current) clearInterval(countdownRef.current);
    setShowWarning(false);
    resetIdleTimer();
  }

  useEffect(() => {
    if (!getToken()) return;

    resetIdleTimer();

    function handleActivity() {
      if (!showWarningRef.current) {
        resetIdleTimer();
      }
    }

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((event) => window.addEventListener(event, handleActivity));

    return () => {
      events.forEach((event) => window.removeEventListener(event, handleActivity));
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-6">
      <div className="bg-panel border border-white/10 rounded-lg p-6 max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold text-paper mb-2">Still there?</h2>
        <p className="text-sm text-muted mb-4">You&apos;ve been inactive. You&apos;ll be logged out in {secondsLeft} seconds.</p>
        <button onClick={handleStayLoggedIn} className="bg-signal text-ink font-semibold rounded px-5 py-2 hover:opacity-90 transition-opacity">
          Remain logged in
        </button>
      </div>
    </div>
  );
}
