"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { API_URL } from "@/lib/api";
import { getToken } from "@/lib/auth";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [status, setStatus] = useState("draft");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    async function load() {
      const res = await fetch(`${API_URL}/projects/${id}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setTitle(data.title);
        setSlug(data.slug);
        setDescription(data.description || "");
        setContent(data.content || "");
        setGithubUrl(data.github_url || "");
        setDemoUrl(data.demo_url || "");
        setStatus(data.status);
      }
      setFetching(false);
    }
    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const token = getToken();
    try {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ title, slug, description, content, github_url: githubUrl, demo_url: demoUrl, status }),
      });
      if (!res.ok) throw new Error("Failed to update project");
      router.push("/admin");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return <main className="min-h-screen bg-ink text-paper flex items-center justify-center">Loading...</main>;
  }

  return (
    <main className="min-h-screen bg-ink text-paper px-6 py-10 md:px-12">
      <a href="/admin" className="text-signal text-sm hover:underline">← Back to dashboard</a>
      <h1 className="text-xl font-semibold mt-6 mb-6">Edit project</h1>
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
          <label className="block text-xs text-muted mb-1">Description</label>
          <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-panel border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal" />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Content (full write-up, optional)</label>
          <textarea rows={5} value={content} onChange={(e) => setContent(e.target.value)} className="w-full bg-panel border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal" />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">GitHub URL</label>
          <input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="w-full bg-panel border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal" />
        </div>
        <div>
          <label className="block text-xs text-muted mb-1">Live demo URL</label>
          <input value={demoUrl} onChange={(e) => setDemoUrl(e.target.value)} className="w-full bg-panel border border-white/10 rounded px-3 py-2 text-paper focus:outline-none focus:border-signal" />
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
          {loading ? "Saving..." : "Save changes"}
        </button>
      </form>
    </main>
  );
}
