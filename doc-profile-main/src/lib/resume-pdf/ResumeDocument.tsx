import React from "react";
import { Document, Page, Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import type { SiteContent } from "@/lib/content";
import { parseJson } from "@/lib/utils";
import { htmlToPlainText } from "@/lib/resume-pdf/html-to-text";
import { resumeColors as c } from "@/lib/resume-pdf/theme";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 9.5,
    lineHeight: 1.45,
    color: c.ink,
    backgroundColor: c.pageBg,
    paddingBottom: 48,
  },
  header: {
    backgroundColor: c.ink,
    paddingHorizontal: 40,
    paddingTop: 32,
    paddingBottom: 24,
  },
  eyebrow: {
    fontSize: 8,
    color: c.copper,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  name: {
    fontFamily: "Times-Roman",
    fontSize: 26,
    color: c.cream,
    marginBottom: 8,
  },
  tagline: {
    fontSize: 10,
    color: c.creamMuted,
    lineHeight: 1.5,
    maxWidth: 480,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 14,
  },
  contactItem: {
    fontSize: 8.5,
    color: c.creamSubtle,
  },
  contactLink: {
    color: c.copper,
    textDecoration: "none",
  },
  metricsBar: {
    backgroundColor: c.pageBg,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
    paddingHorizontal: 40,
  },
  metricValue: {
    fontFamily: "Times-Roman",
    fontSize: 18,
    color: c.copper,
    textAlign: "center",
  },
  metricLabel: {
    fontSize: 7.5,
    color: c.muted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    textAlign: "center",
    marginTop: 3,
  },
  body: {
    paddingHorizontal: 40,
    paddingTop: 22,
  },
  section: {
    marginBottom: 18,
  },
  sectionLabel: {
    fontSize: 8,
    fontWeight: 700,
    color: c.copper,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: "Times-Roman",
    fontSize: 14,
    color: c.ink,
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 9.5,
    color: c.ink,
    lineHeight: 1.55,
    marginBottom: 6,
  },
  lead: {
    fontFamily: "Times-Italic",
    fontSize: 11,
    color: c.ink,
    marginBottom: 10,
    lineHeight: 1.45,
  },
  degreeItem: {
    borderLeftWidth: 2,
    borderLeftColor: c.copper,
    paddingLeft: 10,
    marginBottom: 6,
    fontSize: 9,
    color: c.muted,
  },
  roleBlock: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  roleTitle: {
    fontFamily: "Times-Roman",
    fontSize: 11,
    color: c.ink,
  },
  roleOrg: {
    fontSize: 9,
    color: c.ink,
    marginTop: 2,
  },
  rolePeriod: {
    fontSize: 8,
    color: c.copper,
    marginTop: 2,
  },
  roleDesc: {
    fontSize: 8.5,
    color: c.muted,
    marginTop: 4,
    lineHeight: 1.45,
  },
  expRow: {
    flexDirection: "row",
    marginBottom: 10,
    gap: 12,
  },
  expPeriod: {
    width: 72,
    fontSize: 8,
    color: c.copper,
    fontWeight: 700,
  },
  expContent: {
    flex: 1,
  },
  pillarGrid: {
    flexDirection: "row",
    gap: 10,
  },
  pillarCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: c.border,
    padding: 10,
    backgroundColor: c.beigeDeep,
  },
  pillarNum: {
    fontSize: 8,
    color: c.copper,
    fontWeight: 700,
    marginBottom: 4,
  },
  pillarTitle: {
    fontFamily: "Times-Roman",
    fontSize: 10,
    marginBottom: 4,
  },
  pillarBody: {
    fontSize: 8,
    color: c.muted,
    lineHeight: 1.4,
  },
  pubItem: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: c.border,
  },
  pubYear: {
    fontSize: 8,
    color: c.copper,
    fontWeight: 700,
    marginBottom: 2,
  },
  pubTitle: {
    fontFamily: "Times-Roman",
    fontSize: 9.5,
    lineHeight: 1.35,
  },
  pubMeta: {
    fontSize: 8,
    color: c.muted,
    marginTop: 2,
  },
  awardItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: c.ink,
    paddingVertical: 10,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontSize: 7.5,
    color: c.creamSubtle,
  },
  footerLinks: {
    flexDirection: "row",
    gap: 12,
  },
  footerLink: {
    fontSize: 7.5,
    color: c.copper,
    textDecoration: "none",
  },
  pageNumber: {
    fontSize: 7,
    color: c.muted,
  },
});

type ResumeDocumentProps = {
  content: SiteContent;
};

export function ResumeDocument({ content }: ResumeDocumentProps) {
  const { hero, about, contact, experiences, publications, leadershipRoles, awards, socialLinks } =
    content;

  const degrees = hero ? parseJson<string[]>(hero.degrees, []) : [];
  const roles = hero ? parseJson<{ label: string; url: string; org: string }[]>(hero.roles, []) : [];
  const stats = hero ? parseJson<{ num: string; label: string }[]>(hero.stats, []) : [];
  const pillars = about ? parseJson<{ num: string; title: string; body: string }[]>(about.pillars, []) : [];

  const fullName = hero ? [hero.name, hero.nameEmphasis].filter(Boolean).join(" ") : "Dr. Mwenya Mubanga";
  const aboutText = about ? htmlToPlainText(about.body) : "";
  const aboutParagraphs = aboutText.split(/\n\n+/).filter(Boolean);

  const profileLinks = socialLinks.filter(
    (l) => ["orcid", "linkedin", "google scholar", "researchgate"].some((p) => l.platform.toLowerCase().includes(p))
  );

  const topPublications = publications.slice(0, 12);

  return (
    <Document
      title={`${fullName} — Curriculum Vitae`}
      author={fullName}
      subject="Curriculum Vitae"
    >
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header}>
          {hero?.eyebrow && <Text style={styles.eyebrow}>{hero.eyebrow}</Text>}
          <Text style={styles.name}>{fullName}</Text>
          {hero?.tagline && <Text style={styles.tagline}>{hero.tagline}</Text>}
          <View style={styles.contactRow}>
            {contact?.email && <Text style={styles.contactItem}>{contact.email}</Text>}
            {contact?.location && <Text style={styles.contactItem}>{contact.location}</Text>}
            {profileLinks.slice(0, 3).map((link) => (
              <Link key={link.id} src={link.url} style={styles.contactLink}>
                {link.platform}
              </Link>
            ))}
          </View>
        </View>

        {stats.length > 0 && (
          <View style={styles.metricsBar}>
            {stats.map((s) => (
              <View key={s.label}>
                <Text style={styles.metricValue}>{s.num}</Text>
                <Text style={styles.metricLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.body}>
          {about && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>{about.sectionLabel || "About"}</Text>
              {about.lead && <Text style={styles.lead}>{about.lead}</Text>}
              {aboutParagraphs.map((p, i) => (
                <Text key={i} style={styles.paragraph}>
                  {p}
                </Text>
              ))}
            </View>
          )}

          {degrees.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Education & Credentials</Text>
              {degrees.map((d) => (
                <Text key={d} style={styles.degreeItem}>
                  {d}
                </Text>
              ))}
            </View>
          )}

          {leadershipRoles.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Leadership & Service</Text>
              {leadershipRoles.map((role) => (
                <View key={role.id} style={styles.roleBlock} wrap={false}>
                  <Text style={styles.roleTitle}>{role.title}</Text>
                  <Text style={styles.roleOrg}>{role.organization}</Text>
                  {role.period && <Text style={styles.rolePeriod}>{role.period}</Text>}
                  {role.description && <Text style={styles.roleDesc}>{role.description}</Text>}
                </View>
              ))}
            </View>
          )}

          {experiences.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Research & Professional Experience</Text>
              {experiences.map((exp) => (
                <View key={exp.id} style={styles.expRow} wrap={false}>
                  <View>
                    <Text style={styles.expPeriod}>{exp.period}</Text>
                    {exp.country && (
                      <Text style={{ fontSize: 7, color: c.muted, marginTop: 2 }}>{exp.country}</Text>
                    )}
                  </View>
                  <View style={styles.expContent}>
                    <Text style={{ fontSize: 10, fontWeight: 700, color: c.ink }}>{exp.role}</Text>
                    <Text style={{ fontSize: 9, color: c.muted, marginTop: 2 }}>{exp.organization}</Text>
                    <Text style={styles.roleDesc}>{exp.description}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {pillars.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Research Focus</Text>
              <View style={styles.pillarGrid}>
                {pillars.map((p) => (
                  <View key={p.num} style={styles.pillarCard}>
                    <Text style={styles.pillarNum}>{p.num}</Text>
                    <Text style={styles.pillarTitle}>{p.title}</Text>
                    <Text style={styles.pillarBody}>{p.body}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {roles.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Current Appointments</Text>
              {roles.map((role) => (
                <Text key={role.org} style={styles.paragraph}>
                  <Text style={{ fontWeight: 700 }}>{role.label}</Text>
                  {" · "}
                  {role.org}
                </Text>
              ))}
            </View>
          )}

          {topPublications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Selected Publications</Text>
              {topPublications.map((pub) => (
                <View key={pub.id} style={styles.pubItem} wrap={false}>
                  <Text style={styles.pubYear}>{pub.year}</Text>
                  <Text style={styles.pubTitle}>{pub.title}</Text>
                  <Text style={styles.pubMeta}>{pub.authors}</Text>
                  <Text style={{ fontSize: 8, color: c.muted, fontStyle: "italic", marginTop: 2 }}>
                    {pub.journal}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {awards.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Awards & Recognition</Text>
              {awards.map((award) => (
                <View key={award.id} style={styles.awardItem}>
                  <Text style={{ fontSize: 9, flex: 1 }}>{award.title}</Text>
                  {award.year && (
                    <Text style={{ fontSize: 8, color: c.copper, marginLeft: 8 }}>{award.year}</Text>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            {content.settings?.siteTitle?.split("|")[0]?.trim() || fullName} · Curriculum Vitae
          </Text>
          <View style={styles.footerLinks}>
            {profileLinks.slice(0, 4).map((link) => (
              <Link key={link.id} src={link.url} style={styles.footerLink}>
                {link.platform}
              </Link>
            ))}
          </View>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          />
        </View>
      </Page>
    </Document>
  );
}
