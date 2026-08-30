import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "@/lib/api";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project || project.status !== "published") {
    notFound();
  }

  return (
    <main className="min-h-screen bg-ink text-paper px-6 py-16 md:px-12 max-w-3xl mx-auto">
      <Link href="/projects" className="font-mono text-sm text-signal hover:underline uppercase tracking-wide">← All Projects</Link>
      <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold mt-8 mb-4">
        {project.title}
      </h1>
      <p className="text-lg text-paper/90 mb-6">{project.description}</p>
      <div className="flex gap-4 font-mono text-sm mb-8">
        {project.github_url && (
          <a href={project.github_url} className="text-signal hover:underline">github →</a>
        )}
        {project.demo_url && (
          <a href={project.demo_url} className="text-signal hover:underline">live demo →</a>
        )}
      </div>
      {project.content && (
        <div className="text-paper/90 leading-relaxed whitespace-pre-wrap border-t border-white/5 pt-6">
          {project.content}
        </div>
      )}
    </main>
  );
}
