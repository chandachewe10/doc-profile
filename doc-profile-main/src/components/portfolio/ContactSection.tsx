import Link from "next/link";
import { ExternalLink, Mail, MapPin } from "lucide-react";
import type { SiteContent } from "@/lib/content";

export function ContactSection({
  contact,
  socialLinks,
}: {
  contact: NonNullable<SiteContent["contact"]>;
  socialLinks: SiteContent["socialLinks"];
}) {
  const contactLinks = socialLinks.filter((l) => l.showInContact);
  const title = [contact.title, contact.titleEmphasis].filter(Boolean).join(" ");

  return (
    <section id="contact" className="section-padding">
      <div className="site-container max-w-[880px] section-panel section-panel-padding">
        <p className="section-label text-center">Contact</p>
        <h2 className="section-title text-center">{title}</h2>
        <div
          className="prose prose-neutral mx-auto mt-5 max-w-lg text-center text-[15px] leading-relaxed text-text-muted"
          dangerouslySetInnerHTML={{ __html: contact.body.replace(/\n/g, "<br />") }}
        />
        {contact.location && (
          <p className="mt-4 flex items-center justify-center gap-2 text-[14px] text-text-subtle">
            <MapPin className="h-4 w-4" />
            {contact.location}
          </p>
        )}

        <div className="mt-10 space-y-3">
          <a
            href={`mailto:${contact.email}`}
            className="card-academic flex items-center justify-between !py-5 transition-colors hover:border-copper/35"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-copper text-ink">
                <Mail className="h-4 w-4" />
              </span>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wide text-text-subtle">Email</p>
                <p className="text-[15px] font-medium text-ink">{contact.email}</p>
              </div>
            </div>
          </a>

          {contactLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-academic flex items-center justify-between !py-5 transition-colors hover:border-copper/35"
            >
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-wide text-text-subtle">{link.label}</p>
                <p className="text-[15px] font-medium text-ink">
                  {link.url.replace(/^https?:\/\/(www\.)?/, "")}
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-text-subtle" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer({
  settings,
  socialLinks,
}: {
  settings: SiteContent["settings"];
  socialLinks: SiteContent["socialLinks"];
}) {
  const footerLinks = socialLinks.filter((l) => l.showInFooter);

  return (
    <footer className="border-t border-border bg-ink">
      <div className="site-container flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center md:py-12">
        <p className="max-w-md text-[13px] leading-relaxed text-warm-light/55">
          {settings?.footerText || "© Dr. Mwenya Mubanga"}
        </p>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link href="/admin" className="btn-outline-light !px-4 !py-2 text-[12px]">
            Dashboard
          </Link>
          {footerLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] text-warm-light/60 transition-colors hover:text-copper"
            >
              {link.platform}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
