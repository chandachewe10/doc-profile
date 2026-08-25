import { parseJson } from "@/lib/utils";
import type { SiteContent } from "@/lib/content";
import { SectionHeader } from "./ServicesSection";

export function ExperienceSection({
  experiences,
  skillCategories,
}: {
  experiences: SiteContent["experiences"];
  skillCategories: SiteContent["skillCategories"];
}) {
  return (
    <section id="experience" className="py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-16">
        <SectionHeader
          label="Experience & Skills"
          title="Career"
          emphasis="journey"
          lead="From clinical medicine in Southern Africa to population epidemiology in the Nordics and back."
        />

        <div className="mb-16 space-y-0">
          {experiences.map((exp) => {
            const skills = parseJson<string[]>(exp.skills, []);
            return (
              <article
                key={exp.id}
                className="career-item reveal grid gap-6 border-b border-[var(--border)] py-10 lg:grid-cols-[180px_1px_1fr]"
              >
                <div className="text-right lg:text-right">
                  <p className="font-mono text-xs tracking-wide text-earth">{exp.period}</p>
                  <p className="mt-1 text-sm text-muted">{exp.organization}</p>
                  {exp.country && <p className="mt-0.5 text-xs italic text-muted">{exp.country}</p>}
                </div>
                <div className="relative hidden w-px bg-earth lg:block">
                  <div className="absolute -left-1 top-1 h-2.5 w-2.5 rounded-full bg-earth" />
                </div>
                <div>
                  <h3 className="mb-2 font-serif text-2xl font-semibold">{exp.role}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => (
                      <span key={s} className="border border-[var(--border)] bg-white px-2 py-0.5 font-mono text-[0.7rem] text-muted">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {skillCategories.length > 0 && (
          <div className="grid gap-6 md:grid-cols-3">
            {skillCategories.map((cat) => {
              const skills = parseJson<string[]>(cat.skills, []);
              return (
                <div key={cat.id} className="border border-[var(--border)] bg-white p-6">
                  <h3 className="mb-4 font-serif text-lg font-semibold">{cat.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s) => (
                      <span key={s} className="bg-cream px-2 py-1 text-xs text-muted">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
