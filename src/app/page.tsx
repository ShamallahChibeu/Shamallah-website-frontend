import { getProjects } from "@/lib/api";
import { MessageCircle, Phone, Mail } from "lucide-react";
import Nav from "@/components/Nav";

export default async function Home() {
  const allProjects = await getProjects();
  const projects = allProjects.filter((p) => p.status === "published");

  return (
    <main className="min-h-screen bg-ink text-paper">
      <Nav />

      <section className="px-6 py-20 md:px-12 md:py-32 max-w-3xl">
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold leading-tight mb-6">
          Shamallah Chibeu
        </h1>
        <p className="text-lg md:text-xl text-paper/90 leading-relaxed">
          Learning Python, Machine Learning, and Full-Stack Development —
          building this very site as my first serious full-stack project.
        </p>
      </section>

      <section id="projects" className="px-6 py-16 md:px-12 border-t border-white/5">
        <div className="font-mono text-sm text-signal uppercase tracking-wide mb-8">Projects</div>
        {projects.length === 0 ? (
          <p className="text-muted font-mono text-sm">No published projects yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-panel rounded-lg p-6 border border-white/5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-medium">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-accent-green">{project.status}</span>
                </div>
                <p className="text-muted mb-4">{project.description}</p>
                <div className="flex gap-4 font-mono text-xs">
                  {project.github_url && (
                    <a href={project.github_url} className="text-signal hover:underline">github →</a>
                  )}
                  {project.demo_url && (
                    <a href={project.demo_url} className="text-signal hover:underline">live demo →</a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="px-6 py-10 md:px-12 border-t border-white/5">
        <div className="flex items-center gap-4 mb-4">
          <a href="https://wa.me/254707351238" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 flex items-center justify-center rounded-full bg-panel border border-white/10 text-muted hover:text-accent-green hover:border-accent-green/40 transition-colors"><MessageCircle size={16} /></a>
          <a href="tel:+254707351238" aria-label="Call" className="w-9 h-9 flex items-center justify-center rounded-full bg-panel border border-white/10 text-muted hover:text-signal hover:border-signal/40 transition-colors"><Phone size={16} /></a>
          <a href="mailto:shamallah.chibeu@gmail.com" aria-label="Email" className="w-9 h-9 flex items-center justify-center rounded-full bg-panel border border-white/10 text-muted hover:text-signal hover:border-signal/40 transition-colors"><Mail size={16} /></a>
        </div>
        <p className="font-mono text-xs text-muted">
          © 2026 Shamallah Chibeu — built with FastAPI, Next.js & PostgreSQL
        </p>
      </footer>
    </main>
  );
}
