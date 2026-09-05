"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import { getToken } from "@/lib/auth";

interface TopPage {
  path: string;
  count: number;
}

interface Analytics {
  total_visits: number;
  unique_visitors: number;
  online_now: number;
  top_pages: TopPage[];
  total_messages: number;
}

export default function AnalyticsPage() {
  const router = useRouter();
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }
    fetch(`${API_URL}/analytics`, { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" })
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, [router]);

  if (loading || !data) {
    return <main className="min-h-screen bg-ink text-paper flex items-center justify-center">Loading...</main>;
  }

  return (
    <main className="min-h-screen bg-ink text-paper px-6 py-10 md:px-12">
      <a href="/admin" className="text-signal text-sm hover:underline">← Back to dashboard</a>
      <h1 className="text-xl font-semibold mt-6 mb-8">Analytics</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-3xl">
        <div className="bg-panel border border-white/10 rounded-lg p-5">
          <div className="text-2xl font-bold text-signal">{data.online_now}</div>
          <div className="text-xs text-muted mt-1">Online now</div>
        </div>
        <div className="bg-panel border border-white/10 rounded-lg p-5">
          <div className="text-2xl font-bold text-signal">{data.total_visits}</div>
          <div className="text-xs text-muted mt-1">Total visits</div>
        </div>
        <div className="bg-panel border border-white/10 rounded-lg p-5">
          <div className="text-2xl font-bold text-signal">{data.unique_visitors}</div>
          <div className="text-xs text-muted mt-1">Unique visitors</div>
        </div>
        <div className="bg-panel border border-white/10 rounded-lg p-5">
          <div className="text-2xl font-bold text-signal">{data.total_messages}</div>
          <div className="text-xs text-muted mt-1">Messages received</div>
        </div>
      </div>

      <div className="bg-panel border border-white/10 rounded-lg p-6 max-w-2xl">
        <h2 className="text-sm font-semibold mb-4">Most viewed pages</h2>
        <table className="w-full text-sm">
          <tbody>
            {data.top_pages.map((p) => (
              <tr key={p.path} className="border-b border-white/5">
                <td className="py-3 text-paper/90">{p.path}</td>
                <td className="py-3 text-right text-muted">{p.count} views</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
