"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL, type Project, type Post } from "@/lib/api";
import { getToken, clearToken } from "@/lib/auth";

interface Message {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }
    async function load() {
      const [projRes, postRes, msgRes] = await Promise.all([
        fetch(`${API_URL}/projects`, { cache: "no-store" }),
        fetch(`${API_URL}/posts`, { cache: "no-store" }),
        fetch(`${API_URL}/messages`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }),
      ]);
      if (projRes.ok) setProjects(await projRes.json());
      if (postRes.ok) setPosts(await postRes.json());
      if (msgRes.ok) setMessages(await msgRes.json());
      setLoading(false);
    }
    load();
  }, [router]);

  async function handleDeleteProject(id: number) {
    if (!confirm("Delete this project?")) return;
    const token = getToken();
    await fetch(`${API_URL}/projects/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    setProjects(projects.filter((p) => p.id !== id));
  }

  async function handleDeletePost(id: number) {
    if (!confirm("Delete this post?")) return;
    const token = getToken();
    await fetch(`${API_URL}/posts/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    setPosts(posts.filter((p) => p.id !== id));
  }

  function handleLogout() {
    clearToken();
    router.push("/admin/login");
  }

  if (loading) {
    return <main className="min-h-screen bg-ink text-paper flex items-center justify-center">Loading...</main>;
  }

  return (
    <main className="min-h-screen bg-ink text-paper px-6 py-10 md:px-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex gap-6 items-center">
          <a href="/admin/analytics" className="text-signal text-sm hover:underline">Analytics</a>
          <button onClick={handleLogout} className="text-signal text-sm hover:underline">Log out</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg">
        <div className="bg-panel border border-white/10 rounded-lg p-5">
          <div className="text-2xl font-bold text-signal">{projects.length}</div>
          <div className="text-xs text-muted mt-1">Projects</div>
        </div>
        <div className="bg-panel border border-white/10 rounded-lg p-5">
          <div className="text-2xl font-bold text-signal">{posts.length}</div>
          <div className="text-xs text-muted mt-1">Posts</div>
        </div>
        <div className="bg-panel border border-white/10 rounded-lg p-5">
          <div className="text-2xl font-bold text-signal">{messages.length}</div>
          <div className="text-xs text-muted mt-1">Messages</div>
        </div>
      </div>

      <div className="bg-panel border border-white/10 rounded-lg p-6 mb-6 max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold">Projects</h2>
          <a href="/admin/projects/new" className="text-signal text-sm hover:underline">+ New project</a>
        </div>
        <table className="w-full text-sm">
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-white/5">
                <td className="py-3 text-paper/90">{p.title}</td>
                <td className="py-3"><span className={p.status === "published" ? "text-xs px-2 py-1 rounded-full bg-green-900/40 text-green-400" : "text-xs px-2 py-1 rounded-full bg-yellow-900/40 text-yellow-400"}>{p.status}</span></td>
                <td className="py-3 text-right"><a href={`/admin/projects/${p.id}/edit`} className="text-signal text-xs hover:underline mr-4">Edit</a><button onClick={() => handleDeleteProject(p.id)} className="text-red-400 text-xs hover:underline">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-panel border border-white/10 rounded-lg p-6 mb-6 max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold">Posts</h2>
          <a href="/admin/posts/new" className="text-signal text-sm hover:underline">+ New post</a>
        </div>
        <table className="w-full text-sm">
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-b border-white/5">
                <td className="py-3 text-paper/90">{p.title}</td>
                <td className="py-3"><span className={p.status === "published" ? "text-xs px-2 py-1 rounded-full bg-green-900/40 text-green-400" : "text-xs px-2 py-1 rounded-full bg-yellow-900/40 text-yellow-400"}>{p.status}</span></td>
                <td className="py-3 text-right"><a href={`/admin/posts/${p.id}/edit`} className="text-signal text-xs hover:underline mr-4">Edit</a><button onClick={() => handleDeletePost(p.id)} className="text-red-400 text-xs hover:underline">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-panel border border-white/10 rounded-lg p-6 max-w-3xl">
        <h2 className="text-sm font-semibold mb-4">Messages</h2>
        <table className="w-full text-sm">
          <tbody>
            {messages.map((m) => (
              <tr key={m.id} className="border-b border-white/5">
                <td className="py-3 text-paper/90">{m.name}</td>
                <td className="py-3 text-muted">{m.subject || "-"}</td>
                <td className="py-3 text-muted text-xs">{new Date(m.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
