import { parseJson } from "@/lib/utils";
import type { SiteContent } from "@/lib/content";

export function AboutSection({ about }: { about: NonNullable<SiteContent["about"]> }) {
  const title = [about.title, about.titleEmphasis].filter(Boolean).join(" ");

  return (
    <section id="about" className="section-padding">
      <div className="site-container section-panel section-panel-padding">
        <p className="section-label">{about.sectionLabel}</p>
        <h2 className="section-title max-w-3xl">{title}</h2>
        <p className="mt-6 max-w-3xl font-serif text-[clamp(1.25rem,2.5vw,1.65rem)] italic leading-[1.45] text-ink">
          {about.lead}
        </p>

        <div
          className="prose prose-neutral mt-10 max-w-3xl text-[16px] leading-[1.8] text-ink prose-p:mb-5 prose-strong:font-semibold prose-strong:text-ink prose-a:text-copper"
          dangerouslySetInnerHTML={{ __html: about.body }}
        />
      </div>
    </section>
  );
}

export function ResearchAreasSection({ about }: { about: NonNullable<SiteContent["about"]> }) {
  const pillars = parseJson<{ num: string; title: string; body: string }[]>(about.pillars, []);

  if (!pillars.length) return null;

  return (
    <section id="research-areas" className="section-padding">
      <div className="site-container section-panel section-panel-padding">
        <p className="section-label">Research Focus</p>
        <h2 className="section-title">Research areas</h2>
        <p className="section-lead">
          Three interconnected domains guiding population health research from exposure to policy.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-8">
          {pillars.map((p) => (
            <article key={p.num} className="card-academic flex flex-col">
              <span className="text-[13px] font-semibold tabular-nums text-copper">{p.num}</span>
              <h3 className="mt-3 font-serif text-[1.2rem] leading-snug text-ink">{p.title}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-text-muted">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
