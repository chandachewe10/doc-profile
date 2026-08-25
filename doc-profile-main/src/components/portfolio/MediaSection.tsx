import { ExternalLink } from "lucide-react";
import type { SiteContent } from "@/lib/content";

const typeLabels: Record<string, string> = {
  Documentary: "Documentary",
  "Public Writing": "Public writing",
  "Public Engagement": "Public engagement",
  Conference: "Conference",
  Interview: "Interview",
  Presentation: "Presentation",
  "Media Coverage": "Media coverage",
};

export function MediaSection({ mediaAppearances }: { mediaAppearances: SiteContent["mediaAppearances"] }) {
  if (!mediaAppearances.length) return null;

  return (
    <section id="media" className="section-padding">
      <div className="site-container section-panel section-panel-padding">
        <p className="section-label">Media & Speaking</p>
        <h2 className="section-title">Public engagements</h2>
        <p className="section-lead">
          Conferences, media appearances, science communication, and community advocacy extending research beyond the laboratory.
        </p>

        <div className="panel-list mt-12 divide-y divide-border">
          {mediaAppearances.map((item) => (
            <article
              key={item.id}
              className="grid gap-3 px-6 py-6 md:grid-cols-[140px_1fr_auto] md:items-center md:gap-8 md:px-8 md:py-7"
            >
              <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-copper">
                {typeLabels[item.type] || item.type}
              </span>
              <div>
                <h3 className="font-serif text-[17px] text-ink">{item.title}</h3>
                {(item.outlet || item.date) && (
                  <p className="mt-1 text-[13px] text-text-subtle">
                    {[item.outlet, item.date].filter(Boolean).join(" · ")}
                  </p>
                )}
                {item.description && (
                  <p className="mt-2 text-[14px] leading-relaxed text-text-muted">{item.description}</p>
                )}
              </div>
              {item.linkUrl && (
                <a
                  href={item.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink hover:underline"
                >
                  View
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AwardsSection({ awards }: { awards: SiteContent["awards"] }) {
  if (!awards.length) return null;

  return (
    <section id="awards" className="section-padding">
      <div className="site-container section-panel section-panel-padding">
        <p className="section-label">Recognition</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {awards.map((award) => (
            <article key={award.id} className="card-academic !py-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-[17px] text-ink">{award.title}</h3>
                {award.year && (
                  <span className="shrink-0 text-[13px] font-medium tabular-nums text-copper">{award.year}</span>
                )}
              </div>
              {award.organization && (
                <p className="mt-1 text-[13px] font-medium text-text-subtle">{award.organization}</p>
              )}
              {award.description && (
                <p className="mt-2 text-[14px] leading-relaxed text-text-muted">{award.description}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
