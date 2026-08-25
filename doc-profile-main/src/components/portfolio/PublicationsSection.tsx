"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import type { SiteContent } from "@/lib/content";
import { cn } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  all: "All publications",
  hiv: "HIV & infectious disease",
  cvd: "Cardiovascular",
  atopy: "Atopy & microbiome",
};

export function PublicationsSection({
  publications,
  scholarUrl,
  orcidUrl,
}: {
  publications: SiteContent["publications"];
  scholarUrl?: string;
  orcidUrl?: string;
}) {
  const [filter, setFilter] = useState("all");
  const categories = ["all", ...Array.from(new Set(publications.map((p) => p.category)))];
  const filtered = filter === "all" ? publications : publications.filter((p) => p.category === filter);

  if (!publications.length) return null;

  const featured = publications.filter((p) => p.badgeType === "featured" || p.badge === "Featured");

  return (
    <section id="publications" className="section-padding">
      <div className="site-container section-panel section-panel-padding">
        <p className="section-label">Scholarly Output</p>
        <h2 className="section-title">Publications & research</h2>
        <p className="section-lead">
          Peer-reviewed publications across cardiovascular epidemiology, atopic disease, infectious disease, and global public health.
        </p>

        {(scholarUrl || orcidUrl) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {scholarUrl && (
              <a href={scholarUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-navy !py-2 text-[13px]">
                Google Scholar
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
            {orcidUrl && (
              <a href={orcidUrl} target="_blank" rel="noopener noreferrer" className="btn-outline-navy !py-2 text-[13px]">
                ORCID Profile
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        )}

        {featured.length > 0 && (
          <div className="mt-12">
            <h3 className="mb-5 text-[13px] font-semibold uppercase tracking-[0.06em] text-copper">Featured studies</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {featured.slice(0, 2).map((pub) => (
                <article key={pub.id} className="card-academic border-l-4 border-l-copper">
                  <p className="text-[13px] font-medium text-copper">{pub.year}</p>
                  <h4 className="mt-2 font-serif text-[17px] leading-snug text-ink">{pub.title}</h4>
                  <p className="mt-2 text-[13px] text-text-muted">{pub.journal}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn(
                "rounded-sm px-4 py-2 text-[13px] font-medium transition-colors",
                filter === cat
                  ? "bg-copper text-ink"
                  : "border border-border bg-beige-deep text-text-muted hover:border-copper/40 hover:text-ink"
              )}
            >
              {categoryLabels[cat] || cat}
            </button>
          ))}
        </div>

        <div className="panel-list mt-8 divide-y divide-border">
          {filtered.map((pub) => (
            <article key={pub.id} className="grid gap-3 px-6 py-5 md:grid-cols-[72px_1fr] md:gap-8 md:px-8 md:py-6">
              <time className="text-[14px] font-medium tabular-nums text-copper">{pub.year}</time>
              <div>
                <h3 className="font-serif text-[16px] leading-snug text-ink md:text-[17px]">
                  {pub.title}
                  {pub.badge && (
                    <span className="ml-2 inline-block rounded-sm bg-gold-muted px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-copper">
                      {pub.badge}
                    </span>
                  )}
                </h3>
                <p className="mt-1.5 text-[14px] text-text-muted">{pub.authors}</p>
                <p className="mt-1 text-[13px] italic text-text-subtle">{pub.journal}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
