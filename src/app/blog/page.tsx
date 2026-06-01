import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-page">
      <header className="border-b border-border bg-ink">
        <div className="site-container flex h-[68px] items-center">
          <Link href="/" className="text-[13px] text-warm-light/70 transition-colors hover:text-copper">
            ← Dr. Mwenya Mubanga
          </Link>
        </div>
      </header>

      <main className="site-container section-padding max-w-[720px]">
        <div className="section-panel section-panel-padding">
          <p className="section-label">Writing</p>
          <h1 className="section-title">News & updates</h1>
          <p className="section-lead">Articles, announcements, and commentary.</p>

          {posts.length === 0 ? (
            <p className="mt-12 text-[15px] text-text-muted">No posts published yet.</p>
          ) : (
            <ul className="panel-list mt-12 divide-y divide-border">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="group block px-6 py-7 md:px-8">
                    <h2 className="font-serif text-[18px] text-ink group-hover:text-copper group-hover:underline">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-[15px] leading-relaxed text-text-muted">{post.excerpt}</p>
                    {post.publishedAt && (
                      <time className="mt-3 block text-[13px] tabular-nums text-text-subtle">
                        {formatDate(post.publishedAt)}
                      </time>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
