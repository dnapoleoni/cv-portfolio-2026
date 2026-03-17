import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link, Font } from '@react-pdf/renderer';
import type { ResolvedTimelineEntry } from '@/types';

// Register fonts from Google Fonts
Font.register({
  family: 'Outfit',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4W61C4E.ttf',
      fontWeight: 300,
    },
    {
      src: 'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4E.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/outfit/v15/QGYyz_MVcBeNP4NjuGObqx1XmO1I4QK1C4E.ttf',
      fontWeight: 500,
    },
  ],
});

Font.register({
  family: 'JetBrains Mono',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPQ.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/jetbrainsmono/v24/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8-qxjPQ.ttf',
      fontWeight: 500,
    },
  ],
});

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface CVTemplateProps {
  name: string;
  title: string;
  email: string;
  siteUrl: string;
  siteUrlPath?: string;
  linkedIn: string;
  summary: string;
  skills: SkillCategory[];
  experiences: ResolvedTimelineEntry[];
  footer: string;
}

const COLORS = {
  accent: '#b05a30',
  text: '#1c1b18',
  textSecondary: '#4a4840',
  textTertiary: '#7a7870',
  border: '#c8c5bc',
  bg: '#ffffff',
};

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Outfit',
    fontWeight: 400,
    fontSize: 9.5,
    color: COLORS.textSecondary,
    backgroundColor: COLORS.bg,
    paddingTop: 42,
    paddingBottom: 42,
    paddingHorizontal: 54,
    lineHeight: 1.5,
    fontFeatureSettings: '"liga" 0',
  },
  // ── Header ──────────────────────────────────────────────
  headerName: {
    fontFamily: 'JetBrains Mono',
    fontWeight: 500,
    fontSize: 22,
    color: COLORS.accent,
    marginBottom: 15,
  },
  headerTitle: {
    fontFamily: 'Outfit',
    fontWeight: 300,
    fontSize: 11,
    color: COLORS.textSecondary,
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 14,
  },
  contactLink: {
    fontFamily: 'JetBrains Mono',
    fontWeight: 400,
    fontSize: 8,
    color: COLORS.textSecondary,
    textDecoration: 'none',
  },
  contactSep: {
    fontFamily: 'JetBrains Mono',
    fontWeight: 400,
    fontSize: 8,
    color: COLORS.textTertiary,
  },
  // ── Dividers ─────────────────────────────────────────────
  dividerAccent: {
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.accent,
    marginBottom: 16,
  },
  dividerBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    marginTop: 8,
    marginBottom: 10,
  },
  // ── Section block ────────────────────────────────────────
  sectionBlock: {
    marginBottom: 14,
  },
  sectionHeading: {
    fontFamily: 'JetBrains Mono',
    fontWeight: 400,
    fontSize: 9,
    color: COLORS.accent,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  // ── Summary ──────────────────────────────────────────────
  summary: {
    fontFamily: 'Outfit',
    fontWeight: 400,
    fontSize: 9.5,
    color: COLORS.textSecondary,
    lineHeight: 1.6,
  },
  // ── Skills ───────────────────────────────────────────────
  skillRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  skillCategory: {
    fontFamily: 'JetBrains Mono',
    fontWeight: 400,
    fontSize: 8,
    color: COLORS.textTertiary,
    width: 72,
    flexShrink: 0,
    paddingTop: 1,
  },
  skillItems: {
    fontFamily: 'Outfit',
    fontWeight: 400,
    fontSize: 9,
    color: COLORS.textSecondary,
    flex: 1,
    lineHeight: 1.5,
  },
  skillItemsFlat: {
    fontFamily: 'Outfit',
    fontWeight: 400,
    fontSize: 9,
    color: COLORS.textSecondary,
    lineHeight: 1.5,
  },
  // ── Experience ───────────────────────────────────────────
  experienceEntry: {
    marginBottom: 12,
  },
  experienceTitle: {
    fontFamily: 'Outfit',
    fontWeight: 500,
    fontSize: 10.5,
    color: COLORS.text,
    marginBottom: 2,
  },
  experienceMeta: {
    fontFamily: 'JetBrains Mono',
    fontWeight: 400,
    fontSize: 8,
    color: COLORS.textTertiary,
    marginBottom: 3,
  },
  experienceDescription: {
    fontFamily: 'Outfit',
    fontWeight: 400,
    fontSize: 9,
    color: COLORS.textSecondary,
    lineHeight: 1.55,
  },
  // ── Footer ───────────────────────────────────────────────
  footer: {
    fontFamily: 'JetBrains Mono',
    fontWeight: 400,
    fontSize: 8,
    color: COLORS.textTertiary,
    textAlign: 'center',
  },
  footerLink: {
    color: COLORS.accent,
    textDecoration: 'none',
  },
});

function getTypeLabel(type?: 'contract' | 'redundancy' | 'permanent'): string | null {
  if (type === 'contract') return 'Contract';
  if (type === 'redundancy') return 'Role made redundant';
  return null;
}

export function CVTemplate({
  name,
  title,
  email,
  siteUrl,
  siteUrlPath,
  linkedIn,
  summary,
  skills,
  experiences,
  footer: _footer,
}: CVTemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <Text style={styles.headerName}>{name}</Text>
        <Text style={styles.headerTitle}>{title}</Text>

        {/* Contact row */}
        <View style={styles.contactRow}>
          <Link src={`mailto:${email}`} style={styles.footerLink}>
            {email}
          </Link>
          <Text>{'    '}</Text>
          <Link src={`https://${siteUrl}${siteUrlPath || ''}`} style={styles.footerLink}>
            {siteUrl}
          </Link>
          <Text>{'    '}</Text>
          <Link src={`https://${linkedIn}`} style={styles.footerLink}>
            {linkedIn}
          </Link>
        </View>

        {/* Terracotta divider */}
        <View style={styles.dividerAccent} />

        {/* Summary */}
        <View style={{ marginBottom: 14 }}>
          <Text style={styles.sectionHeading}>Summary</Text>
          <Text style={styles.summary}>{summary}</Text>
        </View>

        {/* Skills */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionHeading}>Skills & Tools</Text>
          {skills.map((group, i) => (
            <View key={i} style={styles.skillRow}>
              {group.category ? <Text style={styles.skillCategory}>{group.category}</Text> : null}
              <Text style={group.category ? styles.skillItems : styles.skillItemsFlat}>
                {group.items.join('  ·  ')}
              </Text>
            </View>
          ))}
        </View>

        {/* Experience */}
        {/* <View style={styles.sectionBlock} wrap={true}> */}
        <Text style={styles.sectionHeading}>Experience</Text>
        {experiences.map((exp, i) => {
          const typeLabel = getTypeLabel(exp.type);
          const metaLine = typeLabel ? `${exp.date}  ·  ${typeLabel}` : exp.date;
          return (
            <View key={i} style={styles.experienceEntry} wrap={false}>
              <Text style={styles.experienceTitle}>
                {exp.role}, {exp.company}
              </Text>
              <Text style={styles.experienceMeta}>{metaLine}</Text>
              <Text style={styles.experienceDescription}>{exp.description}</Text>
            </View>
          );
        })}
        {/* </View> */}
        <View wrap={false}>
          {/* Education */}
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionHeading}>Education</Text>
            <View style={styles.experienceEntry} wrap={false}>
              <Text style={styles.experienceTitle}>Diploma, Web Design — Riverina TAFE (2007)</Text>
              <Text style={styles.experienceTitle}>
                Diploma, Digital Media — Riverina TAFE (2005)
              </Text>
            </View>
          </View>

          {/* Border divider */}
          <View style={styles.dividerBorder} />

          {/* Footer */}
          <Text style={styles.footer}>
            More at{' '}
            <Link src={`https://${siteUrl}${siteUrlPath || ''}`} style={styles.footerLink}>
              {siteUrl}
            </Link>
          </Text>
        </View>
      </Page>
    </Document>
  );
}
