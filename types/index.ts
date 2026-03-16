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
  type?: 'contract' | 'redundancy' | 'permanent';
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
  quote: string;
  name: string;
  role: string;
  company: string;
  relevantRoles: string[];
  contactable?: boolean;
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
}
