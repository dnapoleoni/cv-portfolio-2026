# Data Restructure + CV as Role + Copy Fixes

Work directly on main. Do NOT commit — Dan will review on localhost first.

Read CLAUDE.md before starting for project rules.

This is a significant restructure. Read the ENTIRE prompt before making changes.

---

## Part A: Small copy fixes

Apply these to the source content that will end up in the new data structure.

### 1. Digital Marketing intro paragraph 2

Find the second paragraph that contains "That means I know the pain of Outlook rendering,". Change it so:
- Insert "(120 DPI scaling, anyone?)" after "Outlook rendering" and before the comma
- Remove the phrase "automated campaign workflows" from the paragraph
- Ensure the surrounding text still reads naturally

### 2. CVO intro paragraph 2

Find the paragraph that contains "run trivia nights" and remove that phrase. Fix any double commas or awkward joins so it reads naturally.

---

## Part B: New type system

### RoleVariant type

```typescript
/** A field that's either universal (string) or has role-specific variants */
type RoleVariant = string | { id: string; value: string }[];
```

When it's an array, `id` is either a role slug (`'frontend-developer'`, `'digital-marketing'`, etc.) or `'default'` for the fallback.

### Resolver function

```typescript
/**
 * Resolve a RoleVariant field for a given role.
 * - If string, return it directly.
 * - If array, try: exact role match → 'default' → first entry.
 */
export function resolveVariant(field: RoleVariant, roleId: string): string {
  if (typeof field === 'string') return field;
  const match = field.find(v => v.id === roleId);
  if (match) return match.value;
  const defaultMatch = field.find(v => v.id === 'default');
  if (defaultMatch) return defaultMatch.value;
  return field[0].value;
}
```

### Experience type

```typescript
interface Experience {
  id: string;
  date: RoleVariant;
  role: RoleVariant;
  company: string;
  type?: 'contract' | 'redundancy' | 'permanent';
  description: RoleVariant;
}
```

### ResolvedTimelineEntry (what components receive)

```typescript
export interface ResolvedTimelineEntry {
  date: string;
  role: string;
  company: string;
  type?: 'contract' | 'redundancy' | 'permanent';
  description: string;
}
```

### ContentSection — replaces CaseStudy

This is a generic section that sits between Skills and Testimonials. It replaces `caseStudies` entirely. Each role can use it for whatever purpose: "How I work", "Also", case studies, achievements, or a mix of all of them.

```typescript
export interface ContentSection {
  heading: string;
  items: { title?: string; description: string }[];
}
```

When items have a `title`, they render as titled blocks (like the current case studies). When items have no `title`, they render as plain paragraphs.

### Updated RoleData

```typescript
export interface RoleData {
  slug: string;
  title: string;
  shortDesc: string;
  subtitle: string;
  tagline?: Tagline;           // OPTIONAL — CV has no tagline
  intro: string[];
  variant?: 'vibes' | 'cv';
  icons?: TechIconId[];        // OPTIONAL — CV has no icons
  skills: string[];
  experienceIds: string[];     // REPLACES timeline: TimelineEntry[]
  contentSection?: ContentSection;  // REPLACES caseStudies: CaseStudy[]
}
```

Remove the old `TimelineEntry` interface and `CaseStudy` interface entirely.

---

## Part C: Centralised experience data

Create a single exported `experiences` array. Use `'default'` for the common variant and only add specific role IDs where they differ.

```typescript
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
      { id: 'default', value: 'Frontend Vue JS development across a range of projects. Complete rebuild of the agency website using Vue JS, Nuxt, Tailwind & Storyblok. Various site builds integrating Craft CMS, Hubspot, and Strapi.' },
      { id: 'chief-vibes-officer', value: 'Culture contributions alongside frontend development work. Specific examples coming soon.' },
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
      { id: 'default', value: 'Part of a wider frontend development team. Vue.js applications for BMW & Myer, static and dynamic HTML banners, and Salesforce EDM development and deployment.' },
      { id: 'digital-marketing', value: 'Developed, targeted and deployed Salesforce EDMs for Myer. Static and dynamic HTML banners for BMW, Belong, NAB, TAC.' },
      { id: 'chief-vibes-officer', value: 'Culture contributions alongside frontend development work. Specific examples coming soon.' },
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
      { id: 'default', value: 'Dynamic HTML banner suites for AustralianSuper (partnering with Google as a DV360 showcase), Athena Home Loans. eDM development for Mercedes, Spotify Australia and more.' },
      { id: 'digital-marketing', value: 'Created a fully dynamic HTML banner suite for AustralianSuper, partnering with Google as a showcase for the DV360 dynamic banner rollout. Dynamic banners for Athena Home Loans. eDMs for Mercedes, Spotify Australia and more.' },
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
      { id: 'default', value: 'Eight years spanning Flash/ActionScript, HTML banners, eDMs, and frontend development for major Australian brands including Holden, Jetstar, Seek, and more. Managed the Porter Davis website. Created multiple internal social initiatives, clubs and events.' },
      { id: 'digital-marketing', value: 'Created and managed the Australia Post Salesforce EDM offering for over a year, including a full modular template overhaul. EDMs for Holden, Quest, Garnier, HSBC. HTML banners for Holden, Jetstar, Save The Children, Seek, Jora, and many more.' },
      { id: 'chief-vibes-officer', value: 'Eight years of culture building alongside development work. Created multiple internal social initiatives, clubs and events. Full details coming soon — this is the big one.' },
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
      'Game design enthusiast with multiple prototypes and design documents. Puzzle and ARG designer. Creative writer — member of Unsolicited Musings, a writing collective with two issues written and a third in progress. This stuff isn\'t a side hustle — it\'s who I am.',
  },
];
```

---

## Part D: Role definitions

Update each role object. Remove inline `timeline` arrays — replace with `experienceIds`. Remove inline `caseStudies` arrays — replace with `contentSection`. All other fields (intro, skills, tagline, etc.) stay as they are from the previous round of changes.

### frontend-developer

```typescript
experienceIds: ['everest', 'mira', 'adtorque', 'honest-fox', 'clemenger', 'freelance-contract', 'isobar', 'cre8ive'],
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
```

### digital-marketing

```typescript
experienceIds: ['world-vision', 'bower-house', 'clemenger', 'freelance-contract', 'isobar'],
contentSection: {
  heading: 'How I work',
  items: [
    {
      title: 'Overhauling Australia Post\'s Salesforce email system.',
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
```

### ux-engineer

```typescript
experienceIds: ['everest', 'mira', 'clemenger', 'isobar'],
contentSection: {
  heading: 'How I work',
  items: [
    {
      title: 'Coming soon — a real story about fighting for the user.',
      description:
        'This section will feature a real example where I identified UX gaps that weren\'t in the brief and made the product better. Check back soon.',
    },
    {
      title: 'Coming soon — a real story about bridging design and engineering.',
      description:
        'This section will feature a real example of how I brought a UX perspective to a technical implementation. Check back soon.',
    },
  ],
},
```

### chief-vibes-officer

```typescript
experienceIds: ['isobar', 'clemenger', 'honest-fox', 'cvo-off-the-clock'],
contentSection: {
  heading: 'The vibes archive',
  items: [
    {
      title: 'Coming soon — real stories from the vibes archive.',
      description:
        'Specific examples of ARGs, social clubs, events, and culture initiatives I\'ve created across my career are on their way. This is the work I\'m most proud of — it deserves proper telling.',
    },
  ],
},
```

### NEW: cv

Add as a new entry in the `roles` array:

```typescript
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
    'everest', 'mira', 'world-vision', 'adtorque', 'honest-fox',
    'bower-house', 'clemenger', 'freelance-contract', 'isobar', 'cre8ive',
  ],
  contentSection: {
    heading: 'Also',
    items: [
      {
        description:
          'Beyond the day job: game design enthusiast with multiple prototypes and design documents, puzzle creator, ARG designer, social club organiser, and creative writer — currently a member of Unsolicited Musings, a writing collective with two issues written and a third in progress. Self-appointed Chief Vibes Officer at every workplace I\'ve been part of. I believe culture isn\'t a perk — it\'s infrastructure.',
      },
    ],
  },
},
```

---

## Part E: Helper functions

Add/update these in `data/roles.ts`:

```typescript
/** Resolve a single experience for a given role */
function resolveExperience(id: string, roleId: string): ResolvedTimelineEntry | null {
  const exp = experiences.find(e => e.id === id);
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
    .map(id => resolveExperience(id, roleSlug))
    .filter((e): e is ResolvedTimelineEntry => e !== null);
}
```

### Update existing helpers

`getRoleBySlug` — no changes needed.

`getOtherRoles` — update to exclude CV:
```typescript
export function getOtherRoles(currentSlug: string): RoleData[] {
  return roles.filter((r) => r.slug !== currentSlug && r.variant !== 'cv');
}
```

Add a new helper for the home page role grid:
```typescript
export function getDisplayRoles(): RoleData[] {
  return roles.filter((r) => r.variant !== 'cv');
}
```

---

## Part F: Component updates

### `components/Timeline.tsx`
Update to accept `ResolvedTimelineEntry[]` instead of the old `TimelineEntry[]`. The rendered output stays the same — just the type import changes.

### `components/RolePageView.tsx`

1. Import `getTimelineForRole` from roles.ts. Replace `role.timeline` usage with `getTimelineForRole(slug)`.

2. Make tagline hero conditional:
```tsx
{role.tagline && <RoleHero tagline={role.tagline} />}
```

3. Make icons conditional:
```tsx
<h2 className="role-page-title">
  {role.title}
  {role.icons && <TechIconRow icons={role.icons} size={22} />}
</h2>
```

4. CV download variant:
```tsx
{role.variant === 'cv' ? (
  <a href="/Dan-Napoleoni-CV.pdf" download className="btn-outline">
    <span aria-hidden="true">↓</span> Download CV - Complete (PDF)
  </a>
) : (
  <a href={`/Dan-Napoleoni-CV-${role.slug}.pdf`} download className="btn-outline">
    <span aria-hidden="true">↓</span> Download CV - {role.title} (PDF)
  </a>
)}
```

5. Replace the old case studies section with the new contentSection:
```tsx
{/* Content section — "How I work" / "Also" / case studies / etc */}
{role.contentSection && role.contentSection.items.length > 0 && (
  <section className="role-section" aria-labelledby="content-section-heading">
    <h2 id="content-section-heading">{role.contentSection.heading}</h2>
    {role.contentSection.items.map((item, i) => (
      <div key={i} className={item.title ? 'case-study' : ''}>
        {item.title && <h3>{item.title}</h3>}
        <p>{item.description}</p>
      </div>
    ))}
  </section>
)}
```

This replaces the old case studies block entirely. Remove the old `{role.caseStudies.length > 0 && ...}` block.

When items have a `title`, they render as titled blocks with the `case-study` class. When items have no `title` (like the CV "Also" paragraph), they render as plain `<p>` tags without any wrapper class.

6. Only render cross-nav for non-CV roles:
```tsx
{role.variant !== 'cv' && <RoleCrossNav otherRoles={otherRoles} />}
```

### `components/RoleGrid.tsx`
Use `getDisplayRoles()` instead of importing `roles` directly:
```tsx
import { getDisplayRoles } from '@/data/roles';

export function RoleGrid() {
  const displayRoles = getDisplayRoles();
  return (
    <section className="role-nav" aria-labelledby="role-nav-label">
      <h2 id="role-nav-label" className="role-nav-label">
        Click below to view a role-specific CV for...
      </h2>
      <ul className="role-grid role-grid--prominent" role="list">
        {displayRoles.map((role) => (
          <RoleCard key={role.slug} role={role} />
        ))}
      </ul>
    </section>
  );
}
```

### `app/cv/page.tsx`
Replace the entire file:
```tsx
import { RolePageView } from '@/components/RolePageView';

export const metadata = {
  title: 'CV — Dan Napoleoni',
  description: 'Full curriculum vitae for Dan Napoleoni, frontend developer in Melbourne.',
};

export default function CVPage() {
  return <RolePageView slug="cv" />;
}
```

Delete the old `getAllTimelineEntries()` and `getAllSkills()` functions entirely.

---

## Part G: Cleanup

- Remove the old `TimelineEntry` interface
- Remove the old `CaseStudy` interface
- Remove all inline `timeline` arrays from each role object
- Remove all inline `caseStudies` arrays from each role object
- Remove `getAllTimelineEntries` and `getAllSkills` functions if they existed
- Ensure `Tagline` interface remains (still used by role pages with taglines)
- Testimonials still work — they reference role slugs which haven't changed. The CV role has slug `'cv'`; testimonials won't match it unless explicitly tagged, which is fine.

---

## Part H: Verification checklist

After all changes, verify:

1. **Frontend Developer page** shows: everest, mira, adtorque, honest-fox, clemenger, freelance-contract, isobar, cre8ive — with default descriptions. Content section heading is "How I work" with two titled items.
2. **Digital Marketing page** shows: world-vision, bower-house, clemenger, freelance-contract, isobar — with digital-marketing descriptions where variants exist, default otherwise. Content section heading is "How I work" with three titled items.
3. **UX Engineer page** shows: everest, mira, clemenger, isobar — with default descriptions. Content section heading is "How I work" with two titled items.
4. **Chief Vibes Officer page** shows: isobar, clemenger, honest-fox, cvo-off-the-clock — with CVO descriptions. "Jul 1984 - Present" entry appears. Content section heading is "The vibes archive" with one titled item.
5. **CV page** shows: all experiences EXCEPT cvo-off-the-clock, using default descriptions. Content section heading is "Also" with one untitled paragraph. No tagline hero. No icons. No cross-nav. Download button says "Download CV - Complete (PDF)".
6. **Home page** role grid shows 4 cards (not CV).
7. **Cross-nav** at bottom of role pages shows other roles but NOT CV.
8. **Digital Marketing intro** contains "(120 DPI scaling, anyone?)" and does NOT contain "automated campaign workflows".
9. **CVO intro** does NOT contain "run trivia nights".
10. **No TypeScript errors** — run `npx tsc --noEmit`
11. **Site builds** — run `npm run build`

---

## Summary of files to change:
- `data/roles.ts` — major restructure: new types (Experience, RoleVariant, ResolvedTimelineEntry, ContentSection), remove old types (TimelineEntry, CaseStudy), centralised experiences array, resolver function, CV as role, updated helpers, all role objects updated
- `components/Timeline.tsx` — update type import to ResolvedTimelineEntry
- `components/RolePageView.tsx` — conditional tagline/icons/cross-nav, use getTimelineForRole(), replace caseStudies rendering with contentSection rendering, CV download variant
- `components/RoleGrid.tsx` — use getDisplayRoles()
- `app/cv/page.tsx` — replace entire file with thin RolePageView wrapper

No new component files. No CSS changes. No new dependencies.

Do NOT commit. Dan will review all changes on localhost first.
