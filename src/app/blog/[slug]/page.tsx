import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/api";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  return (
    <main className="min-h-screen bg-ink text-paper px-6 py-16 md:px-12 max-w-2xl mx-auto">
      <Link href="/blog" className="font-mono text-sm text-signal hover:underline">← journal</Link>
      <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold mt-8 mb-6">
        {post.title}
      </h1>
      {post.content && (
        <div className="text-paper/90 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      )}
    </main>
  );
}