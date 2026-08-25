export default function AboutPage() {
  return (
    <main className="min-h-screen bg-ink text-paper px-6 py-16 md:px-12 max-w-2xl mx-auto">
      <a href="/" className="font-mono text-sm text-signal hover:underline">← back home</a>
      <div className="font-mono text-sm text-signal mt-8 mb-8"># about</div>
      <p className="text-lg text-paper/90 leading-relaxed mb-6">
        I&apos;m Shamallah Chibeu — learning Python, Machine Learning, and Full-Stack
        Development by building real things instead of just following tutorials.
      </p>
      <p className="text-paper/80 leading-relaxed mb-6">
        This website is my first serious full-stack project: a self-built CMS
        with a FastAPI backend, PostgreSQL database, and this Next.js frontend —
        built from the ground up, including authentication and CRUD.
      </p>
      <div className="font-mono text-sm text-signal mt-12 mb-4"># currently learning</div>
      <div className="flex flex-wrap gap-2">
        {["Python", "FastAPI", "PostgreSQL", "Next.js", "TypeScript", "Machine Learning"].map((skill) => (
          <span key={skill} className="font-mono text-xs px-3 py-1.5 rounded bg-panel border border-white/5 text-paper/80">
            {skill}
          </span>
        ))}
      </div>
    </main>
  );
}
