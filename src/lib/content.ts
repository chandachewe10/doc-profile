import { prisma } from "./prisma";

export async function getSiteContent() {
  const [
    settings,
    hero,
    about,
    services,
    projects,
    experiences,
    skillCategories,
    testimonials,
    contact,
    socialLinks,
    resume,
    publications,
    blogPosts,
    awards,
    leadershipRoles,
    mediaAppearances,
  ] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "main" } }),
    prisma.heroContent.findUnique({ where: { id: "main" } }),
    prisma.aboutContent.findUnique({ where: { id: "main" } }),
    prisma.service.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
    prisma.project.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
    prisma.experience.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
    prisma.skillCategory.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.testimonial.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
    prisma.contactInfo.findUnique({ where: { id: "main" } }),
    prisma.socialLink.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.resumeFile.findUnique({ where: { id: "main" } }),
    prisma.publication.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
    prisma.blogPost.findMany({ where: { published: true }, orderBy: { publishedAt: "desc" }, take: 6 }),
    prisma.award.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
    prisma.leadershipRole.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
    prisma.mediaAppearance.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }),
  ]);

  return {
    settings,
    hero,
    about,
    services,
    projects,
    experiences,
    skillCategories,
    testimonials,
    contact,
    socialLinks,
    resume,
    publications,
    blogPosts,
    awards,
    leadershipRoles,
    mediaAppearances,
  };
}

export type SiteContent = Awaited<ReturnType<typeof getSiteContent>>;

export function getOrcidUrl(socialLinks: SiteContent["socialLinks"]) {
  return socialLinks.find((l) => l.platform.toLowerCase() === "orcid")?.url;
}

export function getScholarUrl(socialLinks: SiteContent["socialLinks"]) {
  return socialLinks.find((l) => l.platform.toLowerCase().includes("scholar"))?.url;
}
