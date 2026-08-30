import Link from "next/link";
import { getProjects } from "@/lib/api";

export default async function ProjectsPage() {
  const allProjects = await getProjects();
  const projects = allProjects.filter((p) => p.status === "published");

  return (
    <main className="min-h-screen bg-ink text-paper px-6 py-16 md:px-12">
      <Link href="/" className="font-mono text-sm text-signal hover:underline uppercase tracking-wide">← Back To Home</Link>
      <div className="font-mono text-sm text-signal uppercase tracking-wide mt-8 mb-8">All Projects</div>
      {projects.length === 0 ? (
        <p className="text-muted font-mono text-sm">No published projects yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.slug}`} className="bg-panel rounded-lg p-6 border border-white/5 hover:border-signal/40 transition-colors block">
              <h3 className="font-[family-name:var(--font-display)] text-xl font-medium mb-2">
                {project.title}
              </h3>
              <p className="text-muted">{project.description}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
