import { getProjects, getPosts } from "@/lib/api";
import Sidebar from "@/components/Sidebar";
import { Fuel, Globe } from "lucide-react";

export default async function Home() {
  const allProjects = await getProjects();
  const allPosts = await getPosts();
  const projects = allProjects.filter((p) => p.status === "published");
  const posts = allPosts.filter((p) => p.status === "published");

  return (
    <main className="min-h-screen bg-ink text-paper">
      <div className="flex flex-col lg:flex-row max-w-[1100px] mx-auto">
        <Sidebar />
        <div className="flex-1 lg:ml-[340px] px-6 py-16 md:px-12 max-w-2xl">

          <section id="about" className="mb-16">
            <div className="text-xs tracking-widest font-semibold text-signal mb-5">ABOUT</div>
            <p className="text-paper/80 leading-relaxed mb-4">
              I&apos;m Shamallah — I design and build full-stack systems, from authenticated APIs and databases to production deployments. This site is proof of that: a self-built CMS with a FastAPI backend, PostgreSQL database, JWT authentication, and an admin dashboard I built myself to manage it, running live in production.
            </p>
            <p className="text-paper/80 leading-relaxed mb-4">
              Alongside building, I&apos;m deepening my machine learning skills, applying the same hands-on approach: understanding a problem, designing a solution, and shipping something real rather than stopping at theory.
            </p>
            <p className="text-paper/80 leading-relaxed">
              I&apos;m drawn to problems where data, automation, and good engineering intersect — projects that replace manual, repetitive work with something faster and more reliable.
            </p>
          </section>

          <section id="experience" className="mb-16">
            <div className="text-xs tracking-widest font-semibold text-signal mb-5">EXPERIENCE</div>
            <p className="text-paper/80 leading-relaxed mb-6">
              I designed and built this full-stack content management system from the ground up — a FastAPI backend with JWT authentication and a PostgreSQL database, a Next.js frontend, and an admin dashboard with visit tracking and analytics. It&apos;s deployed live on Render and Vercel, handling real authentication, real data, and real users.
            </p>
            <a href="#" className="text-signal text-sm font-semibold hover:underline">View full résumé ↗</a>
          </section>

          <section id="projects" className="mb-16">
            <div className="text-xs tracking-widest font-semibold text-signal mb-5">PROJECTS</div>
            {projects.length === 0 ? (
              <p className="text-muted text-sm">No published projects yet.</p>
            ) : (
              <div className="space-y-8">
                {projects.map((project) => {
                  const link = project.demo_url || project.github_url || "";
                  const isFuel = project.slug.includes("fuel");
                  return (
                    
                      key={project.id}
                      href={link || undefined}
                      target={link ? "_blank" : undefined}
                      rel={link ? "noopener noreferrer" : undefined}
                      className="flex gap-5 group"
                    >
                      <div className="w-24 h-16 shrink-0 bg-panel rounded-md border border-white/5 flex items-center justify-center text-signal">
                        {isFuel ? <Fuel size={24} /> : <Globe size={24} />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-paper mb-1 group-hover:text-signal transition-colors">
                          {project.title}{link ? " ↗" : ""}
                        </h3>
                        <p className="text-sm text-muted">{project.description}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </section>

          <section id="writing" className="mb-16">
            <div className="text-xs tracking-widest font-semibold text-signal mb-5">WRITING</div>
            {posts.length === 0 ? (
              <p className="text-muted text-sm">No published posts yet.</p>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <div key={post.id} className="flex gap-5">
                    <div className="w-20 h-14 shrink-0 bg-panel rounded-md border border-white/5"></div>
                    <div>
                      <h3 className="font-semibold text-paper">{post.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section id="contact" className="mb-16">
            <div className="text-xs tracking-widest font-semibold text-signal mb-5">CONTACT</div>
            <p className="text-paper/80 leading-relaxed mb-6 max-w-md">
              I&apos;m always open to discussing new projects or opportunities. Reach out through any of the icons above, or send a message directly.
            </p>
            <a href="/contact" className="text-signal text-sm font-semibold hover:underline">Get in touch →</a>
          </section>

          <footer className="text-xs text-muted pb-10">
            Designed and built by Shamallah Chibeu. Coded with FastAPI, Next.js and Tailwind CSS.
          </footer>

        </div>
      </div>
    </main>
  );
}
