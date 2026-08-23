export interface Project {
  id: number;
  title: string;
  slug: string;
  description?: string;
  github_url?: string;
  demo_url?: string;
  status: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  status: string;
}

const API_URL = "http://localhost:8000";

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/posts`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}