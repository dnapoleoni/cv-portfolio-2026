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
type RoleVariant = string | { id: string; value: string }[];

/**
 * Resolve a RoleVariant field for a given role.
 * - If string, return it directly.
 * - If array, try: exact role match → 'default' → first entry.
 */
export function resolveVariant(field: RoleVariant, roleId: string): string {
  if (typeof field === 'string') return field;
  const match = field.find((v) => v.id === roleId);
  if (match) return match.value;
  const defaultMatch = field.find((v) => v.id === 'default');
  if (defaultMatch) return defaultMatch.value;
  return field[0].value;
}

interface Experience {
  id: string;
  date: RoleVariant;
  role: RoleVariant;
  company: string;
  type?: 'contract' | 'redundancy' | 'permanent';
  description: RoleVariant;
}

export interface ResolvedTimelineEntry {
  date: string;
  role: string;
  company: string;
  type?: 'contract' | 'redundancy' | 'permanent';
  description: string;
}

export interface ContentSection {
  heading: string;
  items: { title?: string; description: string }[];
}

export interface Tagline {
  mono: string; // displayed in JetBrains Mono
  serif: string; // displayed in Cormorant Garamond italic
  hand: string; // displayed in Caveat, accent colour
}

export interface RoleData {
  slug: string;
  title: string;
  shortDesc: string;
  subtitle: string;
  tagline?: Tagline; // OPTIONAL — CV has no tagline
  intro: string[];
  variant?: 'vibes' | 'cv';
  icons?: TechIconId[]; // OPTIONAL — CV has no icons
  skills: string[];
  experienceIds: string[]; // REPLACES timeline: TimelineEntry[]
  contentSection?: ContentSection; // REPLACES caseStudies: CaseStudy[]
}

export const experiences: Experience[] = [
  {
    id: 'everest',
    date: '2025 - 2026',
    role: 'Software Engineer',
    company: 'Everest Engineering',
    type: 'contract',
    description:
      'React & TypeScript feature development for Splose, a healthcare management platform. Component architecture, API integration, and collaborative agile workflow.',
  },
  {
    id: 'mira',
    date: '2024 - 2025',
    role: 'Frontend Developer',
    company: 'Mira | Business Software',
    type: 'redundancy',
    description:
      'Frontend development, new feature builds and code upkeep for a SaaS desktop, mobile and web app built in Quasar, Vue JS and Laravel.',
  },
  {
    id: 'world-vision',
    date: '2023',
    role: 'eDM Developer',
    company: 'World Vision Australia',
    type: 'contract',
    description:
      'Email campaign development and template management for digital fundraising initiatives.',
  },
  {
    id: 'adtorque',
    date: '2023',
    role: 'VueJS Developer',
    company: 'AdTorque Edge',
    type: 'redundancy',
    description:
      'Sole Vue JS developer tasked with creating and building a business-critical internal SPA in VueJS, TypeScript & Tailwind from the ground up.',
  },
  {
    id: 'honest-fox',
    date: '2022',
    role: [
      { id: 'default', value: 'Frontend Developer' },
      { id: 'chief-vibes-officer', value: 'Frontend Developer & Culture Contributor' },
    ],
    company: 'Honest Fox',
    type: 'redundancy',
    description: [
      {
        id: 'default',
        value:
          'Frontend Vue JS development across a range of projects. Complete rebuild of the agency website using Vue JS, Nuxt, Tailwind & Storyblok. Various site builds integrating Craft CMS, Hubspot, and Strapi.',
      },
      {
        id: 'chief-vibes-officer',
        value:
          'Culture contributions alongside frontend development work. Specific examples coming soon.',
      },
    ],
  },
  {
    id: 'bower-house',
    date: '2021 - 2022',
    role: 'Technical Producer',
    company: 'Bower House Digital',
    type: 'contract',
    description:
      'Brought over from Clemenger to run Salesforce EDM development for Target and Aesop, plus a complete process overhaul of the EDM development workflow.',
  },
  {
    id: 'clemenger',
    date: '2019 - 2021',
    role: [
      { id: 'default', value: 'Frontend Developer' },
      { id: 'digital-marketing', value: 'eDM & Banner Developer' },
      { id: 'chief-vibes-officer', value: 'Frontend Developer & Culture Contributor' },
    ],
    company: 'Clemenger BBDO',
    type: 'permanent',
    description: [
      {
        id: 'default',
        value:
          'Part of a wider frontend development team. Vue.js applications for BMW & Myer, static and dynamic HTML banners, and Salesforce EDM development and deployment.',
      },
      {
        id: 'digital-marketing',
        value:
          'Developed, targeted and deployed Salesforce EDMs for Myer. Static and dynamic HTML banners for BMW, Belong, NAB, TAC.',
      },
      {
        id: 'chief-vibes-officer',
        value:
          'Culture contributions alongside frontend development work. Specific examples coming soon.',
      },
    ],
  },
  {
    id: 'freelance-contract',
    date: '2018 - 2019',
    role: [
      { id: 'default', value: 'Frontend Developer' },
      { id: 'digital-marketing', value: 'eDM & Banner Developer' },
    ],
    company: 'Freelance & Contract (The Royals, Trout, Cummins & Partners)',
    type: 'contract',
    description: [
      {
        id: 'default',
        value:
          'Dynamic HTML banner suites for AustralianSuper (partnering with Google as a DV360 showcase), Athena Home Loans. eDM development for Mercedes, Spotify Australia and more.',
      },
      {
        id: 'digital-marketing',
        value:
          'Created a fully dynamic HTML banner suite for AustralianSuper, partnering with Google as a showcase for the DV360 dynamic banner rollout. Dynamic banners for Athena Home Loans. eDMs for Mercedes, Spotify Australia and more.',
      },
    ],
  },
  {
    id: 'isobar',
    date: '2009 - 2017',
    role: [
      { id: 'default', value: 'Developer' },
      { id: 'digital-marketing', value: 'eDM & Banner Developer' },
      { id: 'chief-vibes-officer', value: 'Developer & Culture Contributor' },
    ],
    company: 'Isobar Australia',
    type: 'permanent',
    description: [
      {
        id: 'default',
        value:
          'Eight years spanning Flash/ActionScript, HTML banners, eDMs, and frontend development for major Australian brands including Holden, Jetstar, Seek, and more. Managed the Porter Davis website. Created multiple internal social initiatives, clubs and events.',
      },
      {
        id: 'digital-marketing',
        value:
          'Created and managed the Australia Post Salesforce EDM offering for over a year, including a full modular template overhaul. EDMs for Holden, Quest, Garnier, HSBC. HTML banners for Holden, Jetstar, Save The Children, Seek, Jora, and many more.',
      },
      {
        id: 'chief-vibes-officer',
        value:
          'Eight years of culture building alongside development work. Created multiple internal social initiatives, clubs and events. Full details coming soon — this is the big one.',
      },
    ],
  },
  {
    id: 'cre8ive',
    date: '2007 - 2008',
    role: 'Developer',
    company: 'Cre8ive',
    type: 'permanent',
    description: 'Early-career web development and digital production.',
  },
  {
    id: 'cvo-off-the-clock',
    date: 'Jul 1984 - Present',
    role: 'Chief Vibes Officer (Self-Appointed)',
    company: 'Off the clock',
    description:
      "Game design enthusiast with multiple prototypes and design documents. Puzzle and ARG designer. Creative writer — member of Unsolicited Musings, a writing collective with two issues written and a third in progress. This stuff isn't a side hustle — it's who I am.",
  },
];

export const roles: RoleData[] = [
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    shortDesc:
      'React, TypeScript, Vue.js — 15+ years building for the web, from Flash to frameworks.',
    subtitle: 'Modern frontend engineering with a UX-first mindset',
    tagline: {
      mono: 'A developer',
      serif: 'who thinks like a designer',
      hand: 'and communicates like a human.',
    },
    icons: ['react', 'typescript', 'vue', 'nextjs'],
    intro: [
      "I've been building for the web since Flash was king. That journey — through ActionScript, JavaScript, Vue, and now React and TypeScript — means I don't just know frameworks, I understand the web platform itself. I write semantic HTML, modern CSS, and accessible interfaces because I've seen enough trends come and go to know what actually matters: does it work, is it fast, can everyone use it?",
      "My most recent work was React and TypeScript at Everest Engineering, building features for Splose — a healthcare management platform. Before that I spent years deep in Vue.js across multiple agencies and product teams. I'm framework-flexible because my fundamentals are strong.",
      "What makes me different from other frontend developers is that I don't just implement designs — I interrogate them. I'll flag accessibility issues, question interaction patterns that don't serve users, and fill in the gaps the brief left out. I've been told this is both my greatest strength and occasionally annoying. I'm fine with that.",
    ],
    skills: [
      'React',
      'TypeScript',
      'Vue.js',
      'JavaScript (ES6+)',
      'HTML5 / Semantic HTML',
      'CSS3 / SCSS / Tailwind',
      'Next.js',
      'Nuxt',
      'REST APIs',
      'GraphQL',
      'Git',
      'Agile / Scrum',
      'Figma → Code',
      'Responsive Design',
      'WCAG Accessibility',
      'Quasar',
      'Laravel',
      'GSAP',
      'Headless CMS (Storyblok, DatoCMS, Craft CMS)',
      'AI-Assisted Development (Claude, Copilot, Cursor)',
    ],
    experienceIds: [
      'everest',
      'mira',
      'adtorque',
      'honest-fox',
      'clemenger',
      'freelance-contract',
      'isobar',
      'cre8ive',
    ],
    contentSection: {
      heading: 'How I work',
      items: [
        {
          title: 'Coming soon — a real story about questioning the brief.',
          description:
            'This section will feature a real example from my career where I pushed back on a spec and the outcome was better for it. Check back soon.',
        },
        {
          title: 'Coming soon — a real story about building things right.',
          description:
            'This section will feature a real example of technical problem-solving from my career. Check back soon.',
        },
      ],
    },
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing Specialist',
    shortDesc:
      'eDMs, HTML banners, Salesforce Marketing Cloud — the full digital campaign toolkit.',
    subtitle: 'Email campaigns, dynamic banners, and marketing production at scale',
    tagline: {
      mono: 'A developer',
      serif: 'who speaks marketing',
      hand: 'and builds campaigns that actually work.',
    },
    icons: ['salesforce', 'html', 'css', 'javascript'],
    intro: [
      'Before I became a "frontend developer" I spent years deep in the trenches of digital marketing production — building eDM templates and campaigns in Salesforce Marketing Cloud (ExactTarget), creating dynamic HTML banners for Google DV360 and DoubleClick, and managing campaign deployments for some of Australia\'s biggest brands.',
      "I ran the Myer eDM account at Clemenger and the Australia Post Salesforce offering at Isobar — including a full modular template overhaul. That means I know the pain of Outlook rendering (120 DPI scaling, anyone?), the art of responsive email design, and the operational reality of deploying to millions of inboxes. I've built template systems and debugged more rendering issues across more email clients than I'd like to admit.",
      "This background gives me something most frontend developers don't have: a deep understanding of how marketing teams work, what they need from technology, and how to bridge the gap between creative intent and technical delivery.",
    ],
    skills: [
      'Salesforce Marketing Cloud / ExactTarget',
      'eDM Design & Development',
      'HTML Email (Responsive, Cross-client)',
      'Google DV360 / DoubleClick Studio',
      'Dynamic HTML Banners (DCO)',
      'Campaign Deployment & QA',
      'A/B Testing',
      'Google Web Designer',
      'Litmus',
      'Browserstack',
      'Campaign Monitor',
      'Mailchimp',
      'HTML / CSS / JavaScript',
      'Photoshop / Sketch / Figma',
    ],
    experienceIds: ['world-vision', 'bower-house', 'clemenger', 'freelance-contract', 'isobar'],
    contentSection: {
      heading: 'How I work',
      items: [
        {
          title: "Overhauling Australia Post's Salesforce email system.",
          description:
            'Placeholder — Dan will provide the real story of the full modular template overhaul he led for the Australia Post Salesforce eDM offering at Isobar. This was a major, hands-on contribution.',
        },
        {
          title: 'Scaling email production for Myer and NAB.',
          description:
            'Placeholder — Dan will provide the real story of template and campaign work at Clemenger. The current version has fabricated metrics that need replacing with real details.',
        },
        {
          title: 'Partnering with Google on the DV360 dynamic banner rollout.',
          description:
            'Placeholder — Dan will provide the real story of creating the AustralianSuper dynamic banner suite that was used as a Google showcase example for DV360.',
        },
      ],
    },
  },
  {
    slug: 'ux-engineer',
    title: 'UX Engineer',
    shortDesc:
      "I don't just build what's in the brief — I question it, improve it, and fill in the gaps.",
    subtitle: 'Frontend development with deep user experience advocacy',
    tagline: {
      mono: 'A developer',
      serif: 'who asks why before asking how',
      hand: 'and fights for the user.',
    },
    icons: ['accessibility', 'figma', 'react', 'css'],
    intro: [
      "I'm not a UX designer by title, but I think like one. Every ticket I pick up, I'm asking: who's using this? What are they trying to do? What happens when it goes wrong? What did we forget?",
      "This isn't theoretical — it comes from 15+ years of building things that real people use, watching what breaks, and learning that the spec is never the whole story. I've worked in agencies where speed matters and in product teams where getting the details right matters. Both taught me that the developer is often the last line of defence before something reaches the user, and I take that seriously.",
      'I bring a perspective that sits between design and engineering. I can read a Figma file and implement it faithfully, but I\'ll also flag when a hover state is missing, when a loading state hasn\'t been considered, when the empty state is blank, or when the error message says "An error occurred" instead of something actually helpful.',
      'Some people find this annoying. Most come to appreciate it.',
    ],
    skills: [
      'UX Advocacy & Review',
      'Interaction Design Implementation',
      'Accessibility (WCAG AA/AAA)',
      'Edge Case Identification',
      'Responsive & Adaptive Design',
      'Design System Contribution',
      'Error State & Empty State Design',
      'User Flow Analysis',
      'Cross-browser / Cross-device QA',
      'Figma Collaboration',
    ],
    experienceIds: ['everest', 'mira', 'clemenger', 'isobar'],
    contentSection: {
      heading: 'How I work',
      items: [
        {
          title: 'Coming soon — a real story about fighting for the user.',
          description:
            "This section will feature a real example where I identified UX gaps that weren't in the brief and made the product better. Check back soon.",
        },
        {
          title: 'Coming soon — a real story about bridging design and engineering.',
          description:
            'This section will feature a real example of how I brought a UX perspective to a technical implementation. Check back soon.',
        },
      ],
    },
  },
  {
    slug: 'chief-vibes-officer',
    title: 'Chief Vibes Officer',
    shortDesc:
      'Social clubs, events, culture — I turn workmates into friends and teams into communities.',
    subtitle: 'Culture engineering, social programming, and workplace joy',
    tagline: {
      mono: 'A developer',
      serif: 'who builds culture',
      hand: 'as carefully as code.',
    },
    variant: 'vibes',
    icons: ['sparkles', 'puzzle', 'users'],
    intro: [
      "This is the part of my CV that doesn't fit on a normal CV, but it's honestly some of the work I'm most proud of.",
      'At every workplace I\'ve been part of, I\'ve ended up being the person who makes it fun to be there. Not in a "mandatory fun" corporate way — in a genuine, grassroots, "people actually look forward to this" way. I\'ve run social clubs, created alternate reality games for the office, designed and hosted events, built Slack bots for fun, organised creative challenges, and generally been the person who turns a group of colleagues into an actual community.',
      "I take this seriously because I've seen what it does. Teams that enjoy being together do better work. People who feel connected to their workplace stay longer. Culture isn't a ping pong table — it's the feeling that someone gives a damn about making this place good.",
      "If your company has an Employee Experience, Culture, Internal Comms, or Engagement role — or if you're an agency that knows the value of good vibes — I'm your guy.",
    ],
    skills: [
      'Social Club Design & Management',
      'Event Planning & Hosting',
      'ARG (Alternate Reality Game) Design',
      'Interactive Experience Creation',
      'Trivia & Game Design',
      'Creative Challenge Curation',
      'Internal Communications',
      'Community Building',
      'Puzzle Design',
      'Creative Writing',
    ],
    experienceIds: ['isobar', 'clemenger', 'honest-fox', 'cvo-off-the-clock'],
    contentSection: {
      heading: 'The vibes archive',
      items: [
        {
          title: 'Coming soon — real stories from the vibes archive.',
          description:
            "Specific examples of ARGs, social clubs, events, and culture initiatives I've created across my career are on their way. This is the work I'm most proud of — it deserves proper telling.",
        },
      ],
    },
  },
  {
    slug: 'cv',
    title: 'Curriculum Vitae',
    shortDesc: '',
    subtitle: 'Dan Napoleoni · Frontend Developer · Melbourne, Australia',
    variant: 'cv',
    intro: [
      'Frontend developer with 15+ years of experience across the full evolution of web development — from Flash and interactive media through to modern React, TypeScript, and Vue.js applications. Strong UX instincts, clear communicator, and genuine collaborator. Experienced across agency and product environments with deep expertise in digital marketing production alongside modern frontend engineering.',
      'A developer who thinks like a designer and communicates like a human.',
    ],
    skills: [
      'React',
      'TypeScript',
      'Vue.js',
      'JavaScript (ES6+)',
      'HTML5 / Semantic HTML',
      'CSS3 / SCSS / Tailwind',
      'Next.js',
      'Nuxt',
      'Quasar',
      'Laravel',
      'GSAP',
      'REST APIs',
      'GraphQL',
      'Git',
      'Agile / Scrum',
      'Figma → Code',
      'Responsive Design',
      'WCAG Accessibility',
      'Headless CMS (Storyblok, DatoCMS, Craft CMS)',
      'AI-Assisted Development (Claude, Copilot, Cursor)',
      'Salesforce Marketing Cloud',
      'eDM Design & Development',
      'HTML Email (Responsive, Cross-client)',
      'Google DV360 / DoubleClick Studio',
      'Dynamic HTML Banners (DCO)',
      'Photoshop / Sketch / Figma',
    ],
    experienceIds: [
      'everest',
      'mira',
      'world-vision',
      'adtorque',
      'honest-fox',
      'bower-house',
      'clemenger',
      'freelance-contract',
      'isobar',
      'cre8ive',
    ],
    contentSection: {
      heading: 'Also',
      items: [
        {
          description:
            "Beyond the day job: game design enthusiast with multiple prototypes and design documents, puzzle creator, ARG designer, social club organiser, and creative writer — currently a member of Unsolicited Musings, a writing collective with two issues written and a third in progress. Self-appointed Chief Vibes Officer at every workplace I've been part of. I believe culture isn't a perk — it's infrastructure.",
        },
      ],
    },
  },
];

/** Resolve a single experience for a given role */
function resolveExperience(id: string, roleId: string): ResolvedTimelineEntry | null {
  const exp = experiences.find((e) => e.id === id);
  if (!exp) return null;
  return {
    date: resolveVariant(exp.date, roleId),
    role: resolveVariant(exp.role, roleId),
    company: exp.company,
    type: exp.type,
    description: resolveVariant(exp.description, roleId),
  };
}

/** Get resolved timeline entries for any role (including CV) */
export function getTimelineForRole(roleSlug: string): ResolvedTimelineEntry[] {
  const role = getRoleBySlug(roleSlug);
  if (!role) return [];
  return role.experienceIds
    .map((id) => resolveExperience(id, roleSlug))
    .filter((e): e is ResolvedTimelineEntry => e !== null);
}

export function getRoleBySlug(slug: string): RoleData | undefined {
  return roles.find((r) => r.slug === slug);
}

export function getOtherRoles(currentSlug: string): RoleData[] {
  return roles.filter((r) => r.slug !== currentSlug && r.variant !== 'cv');
}

export function getDisplayRoles(): RoleData[] {
  return roles.filter((r) => r.variant !== 'cv');
}

export function getPdfForSlug(slug?: string): { href: string; label: string } {
  if (!slug || slug === 'cv') {
    return { href: '/Dan-Napoleoni-CV.pdf', label: 'Download CV' };
  }
  const role = getRoleBySlug(slug);
  if (role) {
    return { href: `/Dan-Napoleoni-CV-${slug}.pdf`, label: `Download CV - ${role.title}` };
  }
  return { href: '/Dan-Napoleoni-CV.pdf', label: 'Download PDF' };
}
