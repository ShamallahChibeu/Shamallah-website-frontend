import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/api";

export default async function PostDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || post.status !== "published") {
    notFound();
  }

  return (
    <main className="min-h-screen bg-ink text-paper px-6 py-16 md:px-12 max-w-2xl mx-auto">
      <Link href="/" className="font-mono text-sm text-signal hover:underline">← Back To Home</Link>
      <h1 className="text-3xl md:text-5xl font-bold mt-8 mb-6">
        {post.title}
      </h1>
      {post.file_url && (
        <a href={post.file_url} target="_blank" rel="noopener noreferrer" className="inline-block text-signal text-sm font-semibold hover:underline mb-6 border border-signal rounded px-4 py-2">
          Download attachment ↓
        </a>
      )}
      {post.content && (
        <div className="text-paper/90 leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      )}
    </main>
  );
}
