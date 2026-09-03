"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import { saveToken } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Invalid email or password");
      const data = await res.json();
      saveToken(data.access_token);
      router.push("/admin");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-ink text-paper flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-panel border border-white/10 rounded-lg p-8">
        <h1 className="text-xl font-semibold mb-1">Admin login</h1>
        <p className="text-sm text-muted mb-6">Sign in to manage your site</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-muted mb-1">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-ink border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal" />
          </div>
          <div>
            <label className="block text-xs text-muted mb-1">Password</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-ink border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal" />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button type="submit" disabled={loading} className="w-full bg-signal text-ink font-semibold rounded px-4 py-2 hover:opacity-90 transition-opacity disabled:opacity-50">
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
