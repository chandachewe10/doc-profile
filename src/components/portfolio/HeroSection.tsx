import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { ResumeDownloadLink } from "@/components/portfolio/ResumeDownloadLink";
import { parseJson } from "@/lib/utils";
import type { SiteContent } from "@/lib/content";

type HeroProps = {
  hero: NonNullable<SiteContent["hero"]>;
  resume: SiteContent["resume"];
  orcidUrl?: string;
};

export function HeroSection({ hero, resume, orcidUrl }: HeroProps) {
  const degrees = parseJson<string[]>(hero.degrees, []);
  const roles = parseJson<{ label: string; url: string; org: string }[]>(hero.roles, []);
  const stats = parseJson<{ num: string; label: string }[]>(hero.stats, []);
  const ctaPrimary = parseJson<{ text: string; url: string }>(hero.ctaPrimary, {
    text: "Research Publications",
    url: "#publications",
  });
  const ctaSecondary = parseJson<{ text: string; url: string }>(hero.ctaSecondary, {
    text: "ORCID",
    url: orcidUrl || "#",
  });

  const fullName = [hero.name, hero.nameEmphasis].filter(Boolean).join(" ");

  return (
    <section className="grid min-h-[calc(100dvh-68px)] grid-cols-1 pt-[68px] lg:grid-cols-[3fr_2fr] lg:pt-[72px]">
      <div className="relative flex flex-col justify-end bg-ink px-8 py-12 md:px-12 md:py-16 lg:px-14">
        <div
          className="pointer-events-none absolute inset-y-[15%] left-0 w-[3px] bg-gradient-to-b from-transparent via-copper to-transparent"
          aria-hidden
        />

        <div className="relative z-10">
          {hero.eyebrow && (
            <p className="mb-6 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-copper">
              <span className="h-px w-10 bg-copper" aria-hidden />
              {hero.eyebrow}
            </p>
          )}

          <h1 className="font-serif text-[clamp(2.75rem,5.5vw,4.5rem)] font-light leading-[0.95] tracking-[-0.02em] text-warm-light">
            {hero.name}
            {hero.nameEmphasis && (
              <em className="mt-1 block font-serif text-[clamp(2.75rem,5.5vw,4.5rem)] italic text-copper-light">
                {hero.nameEmphasis}
              </em>
            )}
          </h1>

          {degrees.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {degrees.map((d) => (
                <li
                  key={d}
                  className="border border-warm-light/20 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-warm-light/60"
                >
                  {d}
                </li>
              ))}
            </ul>
          )}

          {roles.length > 0 && (
            <div className="mt-5 space-y-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-warm-light/50">
              {roles.map((role) => (
                <p key={role.org}>
                  {role.label}{" "}
                  <a
                    href={role.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-copper no-underline hover:underline"
                  >
                    {role.org}
                  </a>
                </p>
              ))}
            </div>
          )}

          {hero.tagline && (
            <p className="mt-8 max-w-md border-l-2 border-copper pl-4 text-[15px] leading-[1.75] text-warm-light/75">
              {hero.tagline}
            </p>
          )}

          {stats.length > 0 && (
            <dl className="mt-10 flex flex-wrap gap-8 md:gap-10">
              {stats.map((s) => (
                <div key={s.label}>
                  <dd className="metric-value">{s.num}</dd>
                  <dt className="metric-label">{s.label}</dt>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <a href={ctaPrimary.url} className="btn-navy">
              {ctaPrimary.text}
            </a>
            <a
              href={ctaSecondary.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light"
            >
              {ctaSecondary.text}
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            {resume && <ResumeDownloadLink resume={resume} variant="hero" />}
          </div>
        </div>
      </div>

      <div className="relative min-h-[360px] bg-beige lg:min-h-0">
        {hero.photoUrl ? (
          <Image src={hero.photoUrl} alt={fullName} fill className="object-cover object-top" priority />
        ) : (
          <div className="flex h-full min-h-[360px] items-end justify-start p-10 lg:min-h-full lg:p-14">
            <div
              className="flex h-44 w-44 items-center justify-center rounded-full border border-dashed border-border-light md:h-52 md:w-52"
              aria-hidden
            >
              <svg viewBox="0 0 80 96" className="h-24 w-20 text-plum md:h-28 md:w-24" fill="currentColor">
                <circle cx="40" cy="28" r="18" />
                <path d="M8 96c0-18 14-32 32-32s32 14 32 32" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
