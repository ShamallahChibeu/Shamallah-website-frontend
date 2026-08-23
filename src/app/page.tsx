const projects = [
  {
    title: "House Price Predictor",
    description: "ML model estimating house prices from structured data using scikit-learn.",
    tech: ["Python", "Pandas", "Scikit-learn"],
    status: "In progress",
  },
  {
    title: "This Website",
    description: "A self-built CMS — FastAPI backend, Next.js frontend, PostgreSQL database.",
    tech: ["FastAPI", "Next.js", "PostgreSQL"],
    status: "In progress",
  },
];

const posts = [
  {
    title: "How I Built My First Machine Learning Model",
    excerpt: "A walkthrough of my first ML project.",
  },
];

const journey = [
  { date: "2026", label: "Started Python" },
  { date: "2026", label: "Started Machine Learning" },
  { date: "2026", label: "Set up full-stack dev environment" },
  { date: "2026", label: "Built personal CMS backend" },
  { date: "2026", label: "Shipped first frontend" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-ink text-paper">
      <nav className="flex items-center justify-between px-6 py-5 md:px-12 border-b border-white/5">
        <span className="font-mono text-sm text-signal">shamallah@dev:~$</span>
        <div className="flex gap-6 font-mono text-sm text-muted">
          <a href="#projects" className="hover:text-paper transition-colors">projects</a>
          <a href="#journal" className="hover:text-paper transition-colors">journal</a>
          <a href="#journey" className="hover:text-paper transition-colors">journey</a>
        </div>
      </nav>

      <section className="px-6 py-20 md:px-12 md:py-32 max-w-3xl">
        <div className="font-mono text-sm text-muted mb-2">$ whoami</div>
        <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold leading-tight mb-6">
          Shamallah Chibeu
        </h1>
        <div className="font-mono text-sm text-muted mb-2">$ status</div>
        <p className="text-lg md:text-xl text-paper/90 leading-relaxed">
          Learning Python, Machine Learning, and Full-Stack Development —
          building this very site as my first serious full-stack project.
        </p>
        <p className="mt-4 font-mono text-sm text-signal">
          <span className="cursor">▍</span>
        </p>
      </section>

      <section id="projects" className="px-6 py-16 md:px-12 border-t border-white/5">
        <div className="font-mono text-sm text-signal mb-8"># projects</div>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.title} className="bg-panel rounded-lg p-6 border border-white/5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium">
                  {project.title}
                </h3>
                <span className="font-mono text-xs text-accent-green">{project.status}</span>
              </div>
              <p className="text-muted mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="font-mono text-xs px-2 py-1 rounded bg-white/5 text-paper/80">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="journal" className="px-6 py-16 md:px-12 border-t border-white/5">
        <div className="font-mono text-sm text-signal mb-8"># journal</div>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.title} className="border-b border-white/5 pb-4">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-medium mb-1">
                {post.title}
              </h3>
              <p className="text-muted text-sm">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="journey" className="px-6 py-16 md:px-12 border-t border-white/5">
        <div className="font-mono text-sm text-signal mb-8"># git log --journey</div>
        <div className="space-y-0">
          {journey.map((entry, i) => (
            <div key={i} className="flex gap-4 font-mono text-sm py-3 border-b border-white/5 last:border-0">
              <span className="text-muted">{entry.date}</span>
              <span className="text-accent-green">●</span>
              <span className="text-paper/90">{entry.label}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="px-6 py-10 md:px-12 border-t border-white/5 font-mono text-xs text-muted">
        © 2026 Shamallah Chibeu — built with FastAPI, Next.js & PostgreSQL
      </footer>
    </main>
  );
}