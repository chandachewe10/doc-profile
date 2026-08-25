import { parseJson } from "@/lib/utils";
import type { SiteContent } from "@/lib/content";

export function ServicesSection({ services }: { services: SiteContent["services"] }) {
  if (!services.length) return null;

  return (
    <section id="services" className="py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-16">
        <SectionHeader label="Services" title="What I" emphasis="offer" lead="Expertise spanning research, data, clinical leadership, and science communication." />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {services.map((s) => {
            const tags = parseJson<string[]>(s.tags, []);
            return (
              <article
                key={s.id}
                className="group relative overflow-hidden border border-[var(--border)] bg-white p-8 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="absolute bottom-0 left-0 top-0 w-0.5 origin-bottom scale-y-0 bg-earth transition-transform group-hover:scale-y-100" />
                <span className="mb-4 block text-2xl">{s.icon}</span>
                <h3 className="mb-2 font-serif text-xl font-semibold">{s.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted">{s.description}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <span key={t} className="bg-cream px-2 py-0.5 font-mono text-[0.68rem] uppercase tracking-wider text-muted">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  label,
  title,
  emphasis,
  lead,
}: {
  label: string;
  title: string;
  emphasis?: string;
  lead?: string;
}) {
  return (
    <div className="mb-12">
      <p className="mb-2 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-earth">
        {label}
        <span className="h-px w-14 bg-[var(--border)]" />
      </p>
      <h2 className="mb-3 font-serif text-[clamp(2rem,3.5vw,3rem)] font-light leading-tight">
        {title} {emphasis && <em className="text-earth">{emphasis}</em>}
      </h2>
      {lead && <p className="max-w-xl text-muted leading-relaxed">{lead}</p>}
    </div>
  );
}

export { SectionHeader };
