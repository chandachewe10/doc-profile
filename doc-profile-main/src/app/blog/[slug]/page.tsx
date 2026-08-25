import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug, published: true } });

  if (!post) notFound();

  return (
    <div className="min-h-screen bg-page">
      <header className="border-b border-border bg-ink">
        <div className="site-container flex h-[68px] items-center">
          <Link href="/blog" className="text-[13px] text-warm-light/70 transition-colors hover:text-copper">
            ← Writing
          </Link>
        </div>
      </header>

      <article className="site-container section-padding max-w-[720px]">
        <div className="section-panel section-panel-padding">
        {post.publishedAt && (
          <time className="text-[13px] tabular-nums text-copper">{formatDate(post.publishedAt)}</time>
        )}
        <h1 className="mt-4 font-serif text-[clamp(1.75rem,4vw,2.25rem)] leading-[1.15] tracking-[-0.01em] text-ink">
          {post.title}
        </h1>
        <p className="mt-5 text-[17px] leading-relaxed text-text-muted">{post.excerpt}</p>
        <div
          className="prose prose-neutral mt-12 max-w-none text-[16px] leading-[1.8] text-ink prose-headings:font-serif prose-headings:text-ink prose-a:text-copper"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        </div>
      </article>
    </div>
  );
}
