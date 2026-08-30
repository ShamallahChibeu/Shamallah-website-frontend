"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (!res.ok) throw new Error("Failed to send");
      setStatus("sent");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-ink text-paper px-6 py-16 md:px-12 max-w-xl mx-auto">
      <a href="/" className="font-mono text-sm text-signal hover:underline uppercase tracking-wide">← Back To Home</a>
      <div className="font-mono text-sm text-signal uppercase tracking-wide mt-8 mb-8">Contact</div>

      {status === "sent" ? (
        <p className="text-accent-green font-mono text-sm">Message sent — I&apos;ll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-mono text-xs text-muted mb-1">name</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-panel border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal" />
          </div>
          <div>
            <label className="block font-mono text-xs text-muted mb-1">email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-panel border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal" />
          </div>
          <div>
            <label className="block font-mono text-xs text-muted mb-1">subject</label>
            <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full bg-panel border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal" />
          </div>
          <div>
            <label className="block font-mono text-xs text-muted mb-1">message</label>
            <textarea required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-panel border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal" />
          </div>
          <button type="submit" disabled={status === "sending"} className="font-mono text-sm px-4 py-2 rounded bg-signal text-ink font-medium hover:opacity-90 transition-opacity disabled:opacity-50">
            {status === "sending" ? "sending..." : "send message"}
          </button>
          {status === "error" && (
            <p className="text-red-400 font-mono text-xs">Something went wrong — try again.</p>
          )}
        </form>
      )}
    </main>
  );
}
