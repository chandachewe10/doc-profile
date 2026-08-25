import { ExternalLink } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function LeadershipSection({
  leadershipRoles,
  experiences,
}: {
  leadershipRoles: SiteContent["leadershipRoles"];
  experiences: SiteContent["experiences"];
}) {
  if (!leadershipRoles.length && !experiences.length) return null;

  return (
    <section id="leadership" className="section-padding">
      <div className="site-container section-panel section-panel-padding">
        <p className="section-label">Leadership & Service</p>
        <h2 className="section-title">Public health leadership</h2>
        <p className="section-lead">
          Executive, advisory, and institutional roles bridging research, clinical medicine, and health system impact.
        </p>

        {leadershipRoles.length > 0 && (
          <div className="panel-list mt-12 divide-y divide-border">
            {leadershipRoles.map((role) => (
              <article
                key={role.id}
                className="grid gap-4 px-6 py-7 md:grid-cols-[1fr_auto] md:items-start md:gap-8 md:px-8"
              >
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="font-serif text-[18px] text-ink">{role.title}</h3>
                    {role.period && (
                      <span className="text-[13px] text-copper">{role.period}</span>
                    )}
                  </div>
                  <p className="mt-1 text-[15px] text-ink">{role.organization}</p>
                  {role.description && (
                    <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-text-muted">{role.description}</p>
                  )}
                </div>
                {role.url && (
                  <a
                    href={role.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-ink transition-colors hover:text-copper"
                  >
                    Visit
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </article>
            ))}
          </div>
        )}

        {experiences.length > 0 && (
          <div className="mt-14">
            <h3 className="mb-6 text-[13px] font-semibold uppercase tracking-[0.06em] text-copper">
              Research appointments
            </h3>
            <div className="panel-list divide-y divide-border">
              {experiences.map((exp) => (
                <article key={exp.id} className="grid gap-2 px-6 py-6 md:grid-cols-[160px_1fr] md:gap-10 md:px-8">
                  <div>
                    <p className="text-[13px] font-medium text-copper">{exp.period}</p>
                    {exp.country && <p className="mt-0.5 text-[13px] text-text-subtle">{exp.country}</p>}
                  </div>
                  <div>
                    <h4 className="text-[16px] font-medium text-ink">{exp.role}</h4>
                    <p className="mt-0.5 text-[14px] text-text-muted">{exp.organization}</p>
                    <p className="mt-2 text-[14px] leading-relaxed text-text-muted">{exp.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
