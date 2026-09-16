import { getProjects, getPosts, getExperiences } from "@/lib/api";
import Sidebar from "@/components/Sidebar";
import ResumeLink from "@/components/ResumeLink";
import { Fuel, Globe } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const allProjects = await getProjects();
  const allPosts = await getPosts();
  const allExperiences = await getExperiences();
  const projects = allProjects.filter((p) => p.status === "published");
  const posts = allPosts.filter((p) => p.status === "published");
  const experiences = allExperiences.filter((e) => e.status === "published");

  return (
    <main className="min-h-screen bg-ink text-paper">
      <div className="flex flex-col md:flex-row max-w-[1100px] mx-auto">
        <Sidebar />
        <div className="flex-1 md:ml-[340px] px-6 py-16 md:px-12 max-w-2xl">

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
            {experiences.length === 0 ? (
              <p className="text-muted text-sm">No experience entries yet.</p>
            ) : (
              <div className="space-y-6 mb-6">
                {experiences.map((exp) => {
                  const tagList = exp.tags ? exp.tags.split(",").map((t) => t.trim()).filter(Boolean) : [];
                  return (
                    <div key={exp.id} className="flex gap-6">
                      <div className="w-24 md:w-28 shrink-0 text-xs text-muted pt-1">{exp.date_range}</div>
                      <div>
                        <h3 className="font-semibold text-paper mb-2">{exp.title}</h3>
                        {exp.description && <p className="text-paper/80 leading-relaxed mb-4">{exp.description}</p>}
                        {tagList.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {tagList.map((tag) => (
                              <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-panel text-accent-green border border-white/5">{tag}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <ResumeLink />
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
                  const tagList = project.tags
                    ? project.tags.split(",").map((t) => t.trim()).filter(Boolean)
                    : (isFuel ? ["HTML", "JavaScript", "Netlify"] : ["FastAPI", "Next.js", "PostgreSQL"]);
                  return (
                    <a key={project.id} href={link || undefined} target={link ? "_blank" : undefined} rel={link ? "noopener noreferrer" : undefined} className="flex gap-5 group">
                      {project.image_url ? (
                        <img src={project.image_url} alt={project.title} className="w-24 h-16 shrink-0 object-cover rounded-md border border-white/5" />
                      ) : (
                        <div className="w-24 h-16 shrink-0 bg-panel rounded-md border border-white/5 flex items-center justify-center text-signal">
                          {isFuel ? <Fuel size={24} /> : <Globe size={24} />}
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-paper mb-1 group-hover:text-signal transition-colors">
                          {project.title}{link ? " ↗" : ""}
                        </h3>
                        <p className="text-sm text-muted mb-2">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {tagList.map((tag) => (
                            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-panel text-accent-green border border-white/5">{tag}</span>
                          ))}
                        </div>
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
                  <Link key={post.id} href={`/blog/${post.slug}`} className="flex gap-5 group">
                    <div className="w-20 h-14 shrink-0 bg-panel rounded-md border border-white/5"></div>
                    <div>
                      <h3 className="font-semibold text-paper group-hover:text-signal transition-colors">{post.title} ↗</h3>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          <footer className="text-xs text-muted pb-10">
            Designed and built by Shamallah Chibeu. Coded with FastAPI, Next.js and Tailwind CSS.
          </footer>

        </div>
      </div>
    </main>
  );
}
