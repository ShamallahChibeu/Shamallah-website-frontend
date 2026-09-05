"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [status, setStatus] = useState("draft");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const token = getToken();
    try {
      const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, slug, excerpt, content, cover_image: coverImage, status }),
      });
      if (!res.ok) throw new Error("Failed to create post");
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
      <h1 className="text-xl font-semibold mt-6 mb-6">New post</h1>
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <label className="block text-xs text-muted mb-1">Title</label>
          <input required value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-panel border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal" />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Slug</label>
          <input required value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full bg-panel border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal" />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Excerpt</label>
          <textarea rows={2} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="w-full bg-panel border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal" />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Content</label>
          <textarea rows={8} value={content} onChange={(e) => setContent(e.target.value)} className="w-full bg-panel border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal" />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Cover image URL</label>
          <input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className="w-full bg-panel border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal" />
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
          {loading ? "Saving..." : "Save post"}
        </button>
      </form>
    </main>
  );
}
