export interface Project {
  id: number;
  title: string;
  slug: string;
  description?: string;
  content?: string;
  github_url?: string;
  demo_url?: string;
  image_url?: string;
  tags?: string;
  status: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  file_url?: string;
  status: string;
}

export interface Experience {
  id: number;
  title: string;
  date_range: string;
  description?: string;
  tags?: string;
  status: string;
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${API_URL}/projects`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug);
}

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${API_URL}/posts`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
}

export async function getExperiences(): Promise<Experience[]> {
  const res = await fetch(`${API_URL}/experiences`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}
