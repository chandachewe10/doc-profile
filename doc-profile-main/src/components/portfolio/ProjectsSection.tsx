import Image from "next/image";
import type { SiteContent } from "@/lib/content";
import { SectionHeader } from "./ServicesSection";

export function ProjectsSection({ projects }: { projects: SiteContent["projects"] }) {
  if (!projects.length) return null;

  return (
    <section id="projects" className="bg-cream py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-16">
        <SectionHeader
          label="Portfolio"
          title="Selected"
          emphasis="projects"
          lead="Research outputs, ventures, media, and community work — science in the public sphere."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((p) => (
            <a
              key={p.id}
              href={p.linkUrl || "#"}
              target={p.linkUrl ? "_blank" : undefined}
              rel={p.linkUrl ? "noopener noreferrer" : undefined}
              className="group flex flex-col overflow-hidden border border-[var(--border)] bg-white transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative flex h-40 items-center justify-center bg-ink">
                {p.imageUrl ? (
                  <Image src={p.imageUrl} alt={p.title} fill className="object-cover opacity-80" />
                ) : (
                  <span className="text-4xl">{p.featured ? "🌍" : "📁"}</span>
                )}
                <span className="absolute bottom-3 left-0 right-0 text-center font-mono text-[0.6rem] uppercase tracking-widest text-white/55">
                  {p.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="mb-1 font-mono text-[0.62rem] uppercase tracking-widest text-earth">{p.category}</p>
                <h3 className="mb-2 font-serif text-xl font-semibold leading-snug">{p.title}</h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                {p.linkText && (
                  <span className="font-mono text-xs tracking-wide text-earth transition group-hover:tracking-widest">
                    {p.linkText} →
                  </span>
                )}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
