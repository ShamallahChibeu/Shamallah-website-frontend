"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function NewExperiencePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("draft");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const token = getToken();
    try {
      const res = await fetch(`${API_URL}/experiences`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, date_range: dateRange, description, tags, status }),
      });
      if (!res.ok) throw new Error("Failed to create experience");
      router.push("/admin");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-ink text-paper px-6 py-10 md:px-12">
      <a href="/admin" className="text-signal text-sm hover:underline">← Back to dashboard</a>
      <h1 className="text-xl font-semibold mt-6 mb-6">New experience</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <label className="block text-xs text-muted mb-1">Title</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-panel border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal" />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Date range (e.g. 2026 — Present)</label>
          <input required value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="w-full bg-panel border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal" />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Description</label>
          <textarea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-panel border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal" />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Tags (comma-separated)</label>
          <input value={tags} onChange={(e) => setTags(e.target.value)} className="w-full bg-panel border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal" />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-panel border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <button type="submit" disabled={loading} className="bg-signal text-ink font-semibold rounded px-5 py-2 hover:opacity-90 transition-opacity disabled:opacity-50">
          {loading ? "Saving..." : "Save experience"}
        </button>
      </form>
    </main>
  );
}
