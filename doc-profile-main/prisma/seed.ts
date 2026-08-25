import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@mwenya.com";
  const password = process.env.ADMIN_PASSWORD || "Admin123!";
  const name = process.env.ADMIN_NAME || "Dr. Mwenya Mubanga";

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name },
    create: { email, passwordHash, name },
  });

  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      siteTitle: "Dr. Mwenya Mubanga | Epidemiologist & Public Health Scientist",
      siteDescription:
        "Epidemiologist, Medical Doctor, and Public Health Scientist. HIV surveillance, infectious disease research, and population health across Zambia, Sweden, and the world.",
      keywords:
        "Mwenya Mubanga, epidemiologist, CIDRZ, HIV surveillance, Karolinska, Uppsala, public health, Zambia, infectious disease, research",
      footerText: "© 2026 Dr. Mwenya Mubanga · Epidemiologist · Lusaka, Zambia",
    },
  });

  await prisma.heroContent.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      eyebrow:
        "Epidemiologist · Medical Doctor · Public Health Specialist · Digital Health Enthusiast",
      name: "Dr. Mwenya",
      nameEmphasis: "Mubanga",
      degrees: JSON.stringify([
        "Bachelor of Medicine & Bachelor of Surgery",
        "Master of Medical Science in Nephrology",
        "Master of Public Health",
        "Doctor of Philosophy in Epidemiology",
      ]),
      roles: JSON.stringify([
        { label: "Chief Medical Officer", url: "https://www.manjehealth.com", org: "Manje Health" },
        {
          label: "Secretary/Treasurer",
          url: "https://www.isee.net",
          org: "Africa Chapter, International Society of Environmental Epidemiology",
        },
      ]),
      tagline:
        "A physician-scientist bridging clinical medicine, population epidemiology, and implementation research — from cardiovascular disease registers in Sweden to HIV transmission hotspots in Zambia.",
      stats: JSON.stringify([
        { num: "30+", label: "Publications" },
        { num: "600+", label: "Citations" },
        { num: "15+", label: "Years Active" },
      ]),
      ctaPrimary: JSON.stringify({ text: "Research Publications", url: "#publications" }),
      ctaSecondary: JSON.stringify({
        text: "ORCID Profile",
        url: "https://orcid.org/0000-0002-6877-4307",
      }),
      photoUrl: null,
    },
  });

  await prisma.aboutContent.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      sectionLabel: "About Me",
      title: "A singular question asked across",
      titleEmphasis: "many contexts",
      lead: "How does the world we live in shape our health?",
      body: `<p>My scientific career may appear to span disparate fields — pets and cardiovascular disease, gut microbiome and asthma, HIV transmission and geospatial analysis. But the thread running through all of it is the same: <strong>the relationship between environment and human health</strong>, studied rigorously using population-level data, and translated into actionable insight.</p><p>In Sweden, I asked whether living with a dog changes your cardiovascular risk — and found that it does. I asked whether the microbial world in a child's gut shapes their immune system — and found evidence that it might. In Zambia, I am now asking where HIV is spreading fastest, who is most affected, and what can be done today. The tools change. The question never does.</p>`,
      pillars: JSON.stringify([
        {
          num: "01",
          title: "Environment & Host Biology",
          body: "From dog ownership to antibiotic exposure to maternal BMI — understanding how external exposures shape immune, cardiovascular, and metabolic health across the life course.",
        },
        {
          num: "02",
          title: "Population Surveillance & Data",
          body: "Designing and running surveillance systems that turn raw clinical data into epidemiological intelligence — whether that means 3.8 million Swedish register records or real-time HIV recency testing in Zambia.",
        },
        {
          num: "03",
          title: "Evidence to Policy",
          body: "Research doesn't end at publication. From creating surveillance dashboards for Zambia's Ministry of Health to translating findings into popular science, I work to close the gap between knowledge and action.",
        },
      ]),
    },
  });

  await prisma.contactInfo.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      title: "Open to",
      titleEmphasis: "collaborations & opportunities",
      body: "I welcome conversations with fellow researchers, institutions, funders, and policy partners working at the intersection of infectious disease, environmental health, and population surveillance — particularly in sub-Saharan Africa and the Nordic countries.\n\nI am especially interested in collaborative grants, advisory roles, and postdoctoral or visiting researcher exchanges.",
      email: "mwenya.mubanga@example.com",
      location: "Lusaka, Zambia",
    },
  });

  await prisma.resumeFile.upsert({
    where: { id: "main" },
    update: {},
    create: {
      id: "main",
      filename: "Mwenya-Mubanga-CV.pdf",
      url: "/generated",
      label: "Download CV",
    },
  });

  const services = [
    {
      icon: "🔬",
      title: "Epidemiological Research",
      description:
        "Design and execution of population-based studies, register linkage, and infectious disease surveillance across diverse health systems.",
      tags: ["Cohort Studies", "Surveillance", "HIV", "Infectious Disease"],
      sortOrder: 0,
    },
    {
      icon: "📊",
      title: "Data & Analytics",
      description:
        "Transforming clinical and public health data into actionable intelligence through geospatial analysis, dashboards, and statistical modeling.",
      tags: ["Geospatial", "Registers", "Dashboards", "Analytics"],
      sortOrder: 1,
    },
    {
      icon: "🏥",
      title: "Clinical & Public Health Advisory",
      description:
        "Medical leadership bridging research insight with health system design, quality benchmarks, and evidence-informed policy.",
      tags: ["CMO Advisory", "Policy", "Health Systems", "Africa"],
      sortOrder: 2,
    },
    {
      icon: "✍️",
      title: "Science Communication",
      description:
        "Translating complex epidemiological findings for policymakers, communities, and the public through writing, media, and advocacy.",
      tags: ["Writing", "Documentary", "Advocacy", "Popular Science"],
      sortOrder: 3,
    },
  ];

  for (const s of services) {
    const existing = await prisma.service.findFirst({ where: { title: s.title } });
    if (!existing) {
      await prisma.service.create({
        data: { ...s, tags: JSON.stringify(s.tags) },
      });
    }
  }

  const projects = [
    {
      title: "Kantolomba: Battling the Bottle",
      slug: "kantolomba-battling-the-bottle",
      category: "Documentary · Zambia",
      description:
        "A documentary examining the challenges of alcohol abuse in the Copperbelt of Zambia — combining personal storytelling with public health advocacy.",
      linkUrl: "https://www.youtube.com/watch?v=MSQLvlSyUzI",
      linkText: "Watch on YouTube",
      sortOrder: 0,
    },
    {
      title: "The Corona Times",
      slug: "the-corona-times",
      category: "Blog · Science Communication",
      description:
        "Public health writing and commentary during the COVID-19 pandemic — translating emerging science for a broad, non-specialist readership.",
      linkUrl: "https://www.coronatimes.net/about/",
      linkText: "Read the blog",
      sortOrder: 1,
    },
    {
      title: "Fray College Mental Health Project",
      slug: "fray-college-mental-health",
      category: "Mental Health · Zambia",
      description:
        "Community-based mental health advocacy and resource platform for Zambia, developed through the Fray College of Communications Africa Health Communications Program.",
      linkUrl: "https://www.mentalhealthhelpzambia.org/",
      linkText: "Visit project",
      sortOrder: 2,
    },
    {
      title: "Manje Health",
      slug: "manje-health",
      category: "Health Innovation · Africa",
      description:
        "Healthcare search and financing platform enabling African families and diaspora to find quality hospitals and fund care affordably and transparently.",
      linkUrl: "https://manjehealth.com",
      linkText: "Visit Manje Health",
      featured: true,
      sortOrder: 3,
    },
  ];

  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: p,
    });
  }

  const experiences = [
    {
      period: "2022 — Present",
      organization: "Centre for Infectious Disease Research in Zambia (CIDRZ)",
      country: "Zambia",
      role: "Epidemiologist · HIV Surveillance",
      description:
        "Leading HIV recency testing surveillance and geospatial analysis to identify transmission hotspots and inform Ministry of Health policy.",
      skills: ["HIV Surveillance", "Geospatial Analysis", "Policy Translation"],
      sortOrder: 0,
    },
    {
      period: "2015 — 2022",
      organization: "Karolinska Institutet / Uppsala University",
      country: "Sweden",
      role: "PhD Epidemiology · Postdoctoral Research",
      description:
        "Population register-based research on cardiovascular disease, atopic disease, and the gut microbiome using Swedish nationwide cohorts.",
      skills: ["Register Epidemiology", "CVD", "Microbiome", "Twin Studies"],
      sortOrder: 1,
    },
    {
      period: "2012 — 2015",
      organization: "Various Clinical & Research Roles",
      country: "Lesotho & Zambia",
      role: "Medical Doctor · Community Health",
      description:
        "Community-based ART programs, tuberculosis research, and clinical medicine in resource-limited settings across Southern Africa.",
      skills: ["Clinical Medicine", "TB Research", "Community ART"],
      sortOrder: 2,
    },
  ];

  for (const e of experiences) {
    const existing = await prisma.experience.findFirst({
      where: { role: e.role, organization: e.organization },
    });
    if (!existing) {
      await prisma.experience.create({
        data: { ...e, skills: JSON.stringify(e.skills) },
      });
    }
  }

  const skillCategories = [
    {
      name: "Research Methods",
      skills: ["Cohort Studies", "Register Linkage", "Surveillance Design", "Geospatial Analysis", "Systematic Review"],
      sortOrder: 0,
    },
    {
      name: "Domains",
      skills: ["HIV & Infectious Disease", "Cardiovascular Epidemiology", "Atopy & Microbiome", "Environmental Health"],
      sortOrder: 1,
    },
    {
      name: "Tools & Platforms",
      skills: ["R", "Stata", "GIS", "Health Dashboards", "Digital Health"],
      sortOrder: 2,
    },
  ];

  for (const sc of skillCategories) {
    const existing = await prisma.skillCategory.findFirst({ where: { name: sc.name } });
    if (!existing) {
      await prisma.skillCategory.create({
        data: { ...sc, skills: JSON.stringify(sc.skills) },
      });
    }
  }

  const testimonials = [
    {
      quote:
        "Timing is everything in healthcare. Prevention, early detection, and treatment save lives — but only when people can actually access and pay for care. That is the gap Manje exists to close.",
      author: "Dr. Mwenya Mubanga",
      role: "Chief Medical Officer, Manje Health",
      sortOrder: 0,
    },
    {
      quote:
        "Mwenya brings a rare combination of clinical depth, epidemiological rigour, and the ability to translate findings into policy-relevant action.",
      author: "Research Collaborator",
      role: "Karolinska Institutet",
      sortOrder: 1,
    },
  ];

  for (const t of testimonials) {
    const existing = await prisma.testimonial.findFirst({ where: { quote: t.quote } });
    if (!existing) {
      await prisma.testimonial.create({ data: t });
    }
  }

  const socialLinks = [
    { platform: "LinkedIn", label: "LinkedIn", url: "https://www.linkedin.com/in/mwenya-mubanga-45b069190/", icon: "linkedin", sortOrder: 0 },
    { platform: "ORCID", label: "ORCID", url: "https://orcid.org/0000-0002-6877-4307", icon: "orcid", sortOrder: 1 },
    { platform: "Google Scholar", label: "Google Scholar", url: "https://scholar.google.com/citations?user=dF_YUTEAAAAJ", icon: "scholar", sortOrder: 2 },
    { platform: "ResearchGate", label: "ResearchGate", url: "https://www.researchgate.net/profile/Mwenya-Mubanga", icon: "researchgate", sortOrder: 3 },
  ];

  for (const link of socialLinks) {
    const existing = await prisma.socialLink.findFirst({ where: { platform: link.platform } });
    if (!existing) {
      await prisma.socialLink.create({ data: link });
    }
  }

  const publications = [
    {
      year: "2026",
      title: "From shock to resilience in GBV and SRH services: the role of research",
      authors: "Kaunda Mwansa J, Hartmann M, Salazar M, Chibesakunda M, Vlahakis N, Ekström AM, and Mwenya Mubanga",
      journal: "BMJ Global Health · 2026 · doi:10.1136/bmjgh-2025-021152",
      category: "hiv",
      badge: "New",
      badgeType: "new",
      sortOrder: 0,
    },
    {
      year: "2025",
      title: "Association between asthma and type 2 diabetes in a Swedish adult population: a register-based cross-sectional study",
      authors: "Mubanga M, Gong T, Smew AI, et al.",
      journal: "Thorax · Published Online First March 2025 · doi:10.1136/thorax-2024-222819",
      category: "atopy",
      badge: "Featured",
      badgeType: "featured",
      sortOrder: 1,
    },
    {
      year: "2019",
      title: "Dog Ownership and Survival After a Major Cardiovascular Event: A Register-Based Prospective Study",
      authors: "Mubanga M, Byberg L, Egenvall A, Ingelsson E and Fall T",
      journal: "Circulation: Cardiovascular Quality and Outcomes · 12:e005342 · doi:10.1161/CIRCOUTCOMES.118.005342",
      category: "cvd",
      sortOrder: 2,
    },
    {
      year: "2017",
      title: "Dog ownership and the risk of cardiovascular disease and death — a nationwide cohort study",
      authors: "Mubanga M, Byberg L, Nowak C, Egenvall A, Magnusson PK, Ingelsson E and Fall T",
      journal: "Scientific Reports · 7:15821 · doi:10.1038/s41598-017-16118-6",
      category: "cvd",
      badge: "Featured",
      badgeType: "featured",
      sortOrder: 3,
    },
  ];

  for (const pub of publications) {
    const existing = await prisma.publication.findFirst({ where: { title: pub.title } });
    if (!existing) {
      await prisma.publication.create({ data: pub });
    }
  }

  const leadershipRoles = [
    {
      title: "Chief Medical Officer",
      organization: "Manje Health",
      url: "https://www.manjehealth.com",
      description:
        "Leading medical strategy, hospital quality benchmarks, and population health-informed platform design for healthcare access across Africa.",
      period: "Present",
      sortOrder: 0,
    },
    {
      title: "Secretary/Treasurer",
      organization: "Africa Chapter, International Society of Environmental Epidemiology (ISEE)",
      url: "https://www.isee.net",
      description: "Supporting environmental epidemiology research leadership and policy engagement across the African continent.",
      period: "Present",
      sortOrder: 1,
    },
  ];

  for (const role of leadershipRoles) {
    const existing = await prisma.leadershipRole.findFirst({
      where: { title: role.title, organization: role.organization },
    });
    if (!existing) await prisma.leadershipRole.create({ data: role });
  }

  const awards = [
    {
      title: "600+ Research Citations",
      year: "2026",
      organization: "Google Scholar",
      description: "Peer-reviewed research cited across cardiovascular epidemiology, atopic disease, and infectious disease.",
      sortOrder: 0,
    },
    {
      title: "30+ Peer-Reviewed Publications",
      year: "2026",
      organization: "International Journals",
      description: "Publications in BMJ, Circulation, Scientific Reports, Thorax, and leading public health journals.",
      sortOrder: 1,
    },
  ];

  for (const award of awards) {
    const existing = await prisma.award.findFirst({ where: { title: award.title } });
    if (!existing) await prisma.award.create({ data: award });
  }

  const mediaAppearances = [
    {
      title: "Kantolomba: Battling the Bottle",
      type: "Documentary",
      outlet: "YouTube · Public Health Advocacy",
      date: "Zambia",
      description: "Documentary examining alcohol abuse in the Copperbelt — personal storytelling combined with public health advocacy.",
      linkUrl: "https://www.youtube.com/watch?v=MSQLvlSyUzI",
      sortOrder: 0,
    },
    {
      title: "The Corona Times",
      type: "Public Writing",
      outlet: "Science Communication",
      date: "2020–2022",
      description: "Public health writing and commentary during the COVID-19 pandemic for a broad, non-specialist readership.",
      linkUrl: "https://www.coronatimes.net/about/",
      sortOrder: 1,
    },
    {
      title: "Fray College Mental Health Project",
      type: "Public Engagement",
      outlet: "Mental Health Help Zambia",
      date: "Zambia",
      description: "Community-based mental health advocacy and resource platform for Zambia.",
      linkUrl: "https://www.mentalhealthhelpzambia.org/",
      sortOrder: 2,
    },
    {
      title: "HIV Surveillance & Geospatial Analysis",
      type: "Conference",
      outlet: "Ministry of Health, Zambia",
      description: "Presentations on HIV recency testing surveillance and transmission hotspot mapping for policy partners.",
      sortOrder: 3,
    },
  ];

  for (const media of mediaAppearances) {
    const existing = await prisma.mediaAppearance.findFirst({ where: { title: media.title } });
    if (!existing) await prisma.mediaAppearance.create({ data: media });
  }

  console.log("Database seeded successfully.");
  console.log(`Admin login: ${email} / ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
