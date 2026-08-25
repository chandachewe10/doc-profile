import type { SiteContent } from "@/lib/content";
import { SectionHeader } from "./ServicesSection";

export function TestimonialsSection({ testimonials }: { testimonials: SiteContent["testimonials"] }) {
  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="bg-cream py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-16">
        <SectionHeader label="Testimonials" title="What colleagues" emphasis="say" />

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <blockquote
              key={t.id}
              className="reveal border-l-[3px] border-earth bg-white p-8"
            >
              <p className="mb-4 font-serif text-xl font-light italic leading-relaxed text-ink">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer>
                <cite className="not-italic">
                  <span className="font-medium text-ink">{t.author}</span>
                  {t.role && <span className="block text-sm text-muted">{t.role}</span>}
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
