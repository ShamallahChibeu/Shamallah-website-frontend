import { getProjects, getPosts } from "@/lib/api";
import Sidebar from "@/components/Sidebar";

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
              Hi there! I&apos;m Shamallah, and I enjoy building things that solve real-world problems. I&apos;m an aspiring Machine Learning Engineer and Full-Stack Developer with a growing passion for turning ideas, data, and technology into intelligent and useful digital solutions. I enjoy exploring how machine learning and modern web development can work together to create products that are both powerful and practical.
            </p>
            <p className="text-paper/80 leading-relaxed mb-4">
              I&apos;m currently building my skills in Python, Machine Learning, and Full-Stack Web Development while working on projects that help me apply what I learn to real-world challenges. I&apos;m particularly interested in creating intelligent applications, data-driven systems, and scalable web platforms that make technology more useful and accessible.
            </p>
            <p className="text-paper/80 leading-relaxed mb-4">
              One of the things I enjoy most about technology is the process of turning an idea into something real. From understanding a problem and designing a solution to writing the code and continuously improving the final product, I&apos;m constantly learning and challenging myself to become a better builder.
            </p>
            <p className="text-paper/80 leading-relaxed mb-4">
              As I continue my journey, I&apos;m focused on developing projects, expanding my technical knowledge, and building a portfolio of work that reflects my growth as a Machine Learning Engineer and Full-Stack Developer. I&apos;m excited about the possibilities ahead and always looking for the next problem worth solving.
            </p>
            <p className="text-paper/80 leading-relaxed">
              Outside of coding and learning, I enjoy exploring new ideas, working on personal projects, and continuously finding new ways to challenge myself and grow.
            </p>
          </section>

          <section id="experience" className="mb-16">
            <div className="text-xs tracking-widest font-semibold text-signal mb-5">EXPERIENCE</div>
            <p className="text-paper/80 leading-relaxed mb-4">
              I&apos;m currently focused on building my experience in Machine Learning and Full-Stack Development through continuous learning and hands-on projects. My work involves exploring real-world problems, designing practical solutions, and turning ideas into functional applications using modern technologies.
            </p>
            <p className="text-paper/80 leading-relaxed mb-6">
              Alongside my technical journey, I&apos;m actively developing projects that strengthen my skills in Python, Machine Learning, web development, and software engineering. Each project gives me the opportunity to move beyond theory and gain practical experience in building, testing, and improving real applications.
            </p>
            <a href="#" className="text-signal text-sm font-semibold hover:underline">View full résumé ↗</a>
          </section>

          <section id="projects" className="mb-16">
            <div className="text-xs tracking-widest font-semibold text-signal mb-5">PROJECTS</div>
            {projects.length === 0 ? (
              <p className="text-muted text-sm">No published projects yet.</p>
            ) : (
              <div className="space-y-8 mb-6">
                {projects.map((project) => (
                  <div key={project.id} className="flex gap-5">
                    <div className="w-24 h-16 shrink-0 bg-panel rounded-md border border-white/5"></div>
                    <div>
                      <h3 className="font-semibold text-paper mb-1">{project.title}</h3>
                      <p className="text-sm text-muted">{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <a href="/projects" className="text-signal text-sm font-semibold hover:underline">View full project archive →</a>
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
            Designed and built by Shamalah Chibeu. Coded with FastAPI, Next.js and Tailwind CSS.
          </footer>

        </div>
      </div>
    </main>
  );
}
