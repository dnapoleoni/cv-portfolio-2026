/** Tech icons used in role cards and headers */
export type TechIconId =
  | 'react'
  | 'typescript'
  | 'vue'
  | 'javascript'
  | 'html'
  | 'css'
  | 'nextjs'
  | 'salesforce'
  | 'figma'
  | 'git'
  | 'sparkles'
  | 'puzzle'
  | 'users'
  | 'accessibility';

/** A field that's either universal (string) or has role-specific variants */
export type RoleVariant = string | { id: string; value: string }[];

/** Timeline entry after resolving role-specific variants */
export interface ResolvedTimelineEntry {
  date: string;
  role: string;
  company: string;
  type?: 'contract' | 'redundancy' | 'permanent' | 'freelance';
  description: string;
}

/** Three-font tagline used on role hero sections */
export interface Tagline {
  mono: string;
  serif: string;
  hand: string;
}

/** A content item — case study, achievement, story, or plain paragraph */
export interface ContentItem {
  id: string;
  title?: string;
  description: string;
}

/** A role's content section configuration — heading + references to content items */
export interface ContentSection {
  heading: string;
  itemIds: string[];
}

/** Testimonial quote with role relevance tagging */
export interface Testimonial {
  name: string;
  role: string;
  company: string;
  contactable: boolean;
  quotes: {
    text: string;
    relevantRoles: string[]; // ['frontend-developer', 'ux-engineer'] or ['general'] for homepage/full-picture
  }[];
}

export interface ResolvedTestimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  contactable: boolean;
}

/** Color values for a single theme mode (light or dark) */
export interface ThemeColors {
  bg: string;
  bgElevated: string;
  bgHover: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  accent: string;
  accentHover: string;
  border: string;
  borderSubtle: string;
}

/** A complete theme with light and dark modes */
export interface Theme {
  id: string;
  name: string;
  light: ThemeColors;
  dark: ThemeColors;
}

/** Full role definition */
export interface RoleData {
  slug: string;
  title: string;
  shortDesc: string;
  subtitle: string;
  tagline?: Tagline;
  intro: string[];
  variant?: 'vibes';
  contactHeading?: string;
  icons?: TechIconId[];
  skills: string[];
  experienceIds: string[];
  contentSection?: ContentSection;
  ctaHeading?: string;
  ctaDescription?: string;
}
