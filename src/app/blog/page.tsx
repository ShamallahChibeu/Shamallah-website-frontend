import Link from "next/link";
import { getPosts } from "@/lib/api";

export default async function BlogPage() {
  const allPosts = await getPosts();
  const posts = allPosts.filter((p) => p.status === "published");

  return (
    <main className="min-h-screen bg-ink text-paper px-6 py-16 md:px-12">
      <Link href="/" className="font-mono text-sm text-signal hover:underline">← back home</Link>
      <div className="font-mono text-sm text-signal mt-8 mb-8"># journal</div>
      {posts.length === 0 ? (
        <p className="text-muted font-mono text-sm">No published posts yet.</p>
      ) : (
        <div className="space-y-6 max-w-2xl">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block border-b border-white/5 pb-6 hover:opacity-80 transition-opacity"
            >
              <h3 className="font-[family-name:var(--font-display)] text-xl font-medium mb-2">
                {post.title}
              </h3>
              <p className="text-muted">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}