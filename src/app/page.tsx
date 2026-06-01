import {
  getSiteContent,
  getOrcidUrl,
  getScholarUrl,
} from "@/lib/content";
import { Navigation } from "@/components/portfolio/Navigation";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { AboutSection, ResearchAreasSection } from "@/components/portfolio/AboutSection";
import { PublicationsSection } from "@/components/portfolio/PublicationsSection";
import { LeadershipSection } from "@/components/portfolio/LeadershipSection";
import { MediaSection, AwardsSection } from "@/components/portfolio/MediaSection";
import { ContactSection, Footer } from "@/components/portfolio/ContactSection";
import { ScrollReveal } from "@/components/portfolio/ScrollReveal";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getSiteContent();
  const orcidUrl = getOrcidUrl(content.socialLinks);
  const scholarUrl = getScholarUrl(content.socialLinks);

  return (
    <>
      <Navigation />
      <ScrollReveal />

      <main className="bg-page">
        {content.hero && (
          <HeroSection hero={content.hero} resume={content.resume} orcidUrl={orcidUrl} />
        )}

        {content.about && <AboutSection about={content.about} />}
        {content.about && <ResearchAreasSection about={content.about} />}

        <PublicationsSection
          publications={content.publications}
          scholarUrl={scholarUrl}
          orcidUrl={orcidUrl}
        />

        <AwardsSection awards={content.awards} />

        <LeadershipSection
          leadershipRoles={content.leadershipRoles}
          experiences={content.experiences}
        />

        <MediaSection mediaAppearances={content.mediaAppearances} />

        {content.contact && (
          <ContactSection
            contact={content.contact}
            socialLinks={content.socialLinks}
            resume={content.resume}
          />
        )}
      </main>

      <Footer settings={content.settings} socialLinks={content.socialLinks} />
    </>
  );
}
