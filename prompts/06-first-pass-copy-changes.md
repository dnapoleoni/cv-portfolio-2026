# First Pass Copy Changes — Implement All

Work directly on the current branch (should be main). Make all changes described below. Do NOT commit — Dan will review on localhost first.

Read CLAUDE.md before starting for project rules.

---

## 1. `data/roles.ts` — Frontend Developer

### Intro paragraph 1
Replace the current first intro paragraph with:
```
"I've been building for the web since Flash was king. That journey — through ActionScript, JavaScript, Vue, and now React and TypeScript — means I don't just know frameworks, I understand the web platform itself. I write semantic HTML, modern CSS, and accessible interfaces because I've seen enough trends come and go to know what actually matters: does it work, is it fast, can everyone use it?"
```

### Skills list
Replace the entire skills array for frontend-developer with:
```typescript
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
```
Changes from current: removed Astro, removed Performance Optimisation, changed "JavaScript (ES2024)" to "JavaScript (ES6+)".

### Case studies
Replace both case studies with placeholders that clearly indicate they need real stories:
```typescript
caseStudies: [
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
```

---

## 2. `data/roles.ts` — Digital Marketing Specialist

### Subtitle
Change from:
```
'Email campaigns, dynamic banners, and marketing automation at scale'
```
To:
```
'Email campaigns, dynamic banners, and marketing production at scale'
```

### Skills list
Replace the entire skills array for digital-marketing with:
```typescript
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
```
Changes from current: removed Marketing Automation, changed "Photoshop / Figma" to "Photoshop / Sketch / Figma".

### Case studies
Replace the single case study with three placeholders:
```typescript
caseStudies: [
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
```

---

## 3. `data/roles.ts` — UX Engineer

### Title
Change from `'UX-Minded Engineer'` to `'UX Engineer'`.

### Tagline, subtitle, intro, shortDesc
Leave all as-is.

### Timeline
Replace the single generic entry with these four entries (using frontend descriptions as temporary placeholders — Dan will rewrite with UX-angled descriptions later):
```typescript
timeline: [
  {
    date: '2025 - 2026',
    role: 'Software Engineer',
    company: 'Everest Engineering',
    type: 'contract',
    description:
      'React & TypeScript feature development for Splose, a healthcare management platform. Component architecture, API integration, and collaborative agile workflow.',
  },
  {
    date: '2024 - 2025',
    role: 'Frontend Developer',
    company: 'Mira | Business Software',
    type: 'redundancy',
    description:
      'Frontend development, new feature builds and code upkeep for a SaaS desktop, mobile and web app built in Quasar, Vue JS and Laravel.',
  },
  {
    date: '2019 - 2021',
    role: 'Frontend Developer',
    company: 'Clemenger BBDO',
    type: 'permanent',
    description:
      'Part of a wider frontend development team. Vue.js applications for BMW & Myer, static and dynamic HTML banners, and Salesforce EDM development and deployment.',
  },
  {
    date: '2009 - 2017',
    role: 'Developer',
    company: 'Isobar Australia',
    type: 'permanent',
    description:
      'Eight years spanning Flash/ActionScript, HTML banners, eDMs, and frontend development for major Australian brands including Holden, Jetstar, Seek, and more. Managed the Porter Davis website. Created multiple internal social initiatives, clubs and events.',
  },
],
```

### Case studies
Replace both with:
```typescript
caseStudies: [
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
```

---

## 4. `data/roles.ts` — Chief Vibes Officer

### shortDesc
Change from:
```
'Social clubs, ARGs, events, culture — I make workplaces places people actually want to be.'
```
To:
```
'Social clubs, events, culture — I turn workmates into friends and teams into communities.'
```

### Skills list
Replace the entire skills array with exactly this list:
```typescript
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
```
This removes: Slack Culture & Bot Creation, Team Building (the actually fun kind), Award Submission Writing.

### Timeline
Replace the single generic entry with these four entries:
```typescript
timeline: [
  {
    date: '2009 - 2017',
    role: 'Developer & Culture Contributor',
    company: 'Isobar Australia',
    type: 'permanent',
    description:
      'Eight years of culture building alongside development work. Created multiple internal social initiatives, clubs and events. Full details coming soon — this is the big one.',
  },
  {
    date: '2019 - 2021',
    role: 'Frontend Developer & Culture Contributor',
    company: 'Clemenger BBDO',
    type: 'permanent',
    description:
      'Culture contributions alongside frontend development work. Specific examples coming soon.',
  },
  {
    date: '2022',
    role: 'Frontend Developer & Culture Contributor',
    company: 'Honest Fox',
    type: 'redundancy',
    description:
      'Culture contributions alongside frontend development work. Specific examples coming soon.',
  },
  {
    date: 'Jul 1984 - Present',
    role: 'Chief Vibes Officer (Self-Appointed)',
    company: 'Off the clock',
    description:
      'Game design enthusiast with multiple prototypes and design documents. Puzzle and ARG designer. Creative writer — member of Unsolicited Musings, a writing collective with two issues written and a third in progress. This stuff isn\'t a side hustle — it\'s who I am.',
  },
],
```

### Case studies
Replace the single placeholder with:
```typescript
caseStudies: [
  {
    title: 'Coming soon — real stories from the vibes archive.',
    description:
      'Specific examples of ARGs, social clubs, events, and culture initiatives I\'ve created across my career are on their way. This is the work I\'m most proud of — it deserves proper telling.',
  },
],
```

### Intro paragraphs, subtitle, tagline
Leave all as-is.

---

## 5. `components/ContactSection.tsx` — Add relocation line

Change the default description prop from:
```
"I'm currently looking for my next role — whether that's frontend development, digital marketing, UX engineering, or something I haven't thought of yet. Based in Melbourne, open to hybrid and remote."
```
To:
```
"I'm currently looking for my next role — whether that's frontend development, digital marketing, UX engineering, or something I haven't thought of yet. Based in Melbourne, open to hybrid, remote, and willing to relocate for the right role."
```

---

## 6. `app/cv/page.tsx` — Update "Also" section

Replace the "Also" section paragraph with:
```tsx
<p>
  Beyond the day job: game design enthusiast with multiple prototypes and design documents,
  puzzle creator, ARG designer, social club organiser, and creative writer — currently a
  member of <em>Unsolicited Musings</em>, a writing collective with two issues written and a
  third in progress. Self-appointed Chief Vibes Officer at every workplace I've been part of.
  I believe culture isn't a perk — it's infrastructure.
</p>
```

---

## 7. Role page metadata — Add to each page file

Add metadata exports to each page file. Place after imports, before the default export function.

### `app/frontend-developer/page.tsx`
```typescript
export const metadata = {
  title: 'Frontend Developer — Dan Napoleoni',
  description:
    'React, TypeScript, Vue.js — 15+ years of frontend development across agencies and product teams in Melbourne.',
};
```

### `app/digital-marketing/page.tsx`
```typescript
export const metadata = {
  title: 'Digital Marketing Specialist — Dan Napoleoni',
  description:
    'eDMs, HTML banners, Salesforce Marketing Cloud — a decade of digital marketing production for Australia\'s biggest brands.',
};
```

### `app/ux-engineer/page.tsx`
```typescript
export const metadata = {
  title: 'UX Engineer — Dan Napoleoni',
  description:
    'Frontend developer with deep UX instincts — 15+ years of asking "but does this actually work for the user?"',
};
```

### `app/chief-vibes-officer/page.tsx`
```typescript
export const metadata = {
  title: 'Chief Vibes Officer — Dan Napoleoni',
  description:
    'Social clubs, events, ARGs, culture initiatives — building workplaces people actually want to be part of.',
};
```

### `app/contact/page.tsx`
This file is a server component (wraps ContactPageContent in Suspense), so metadata can go here:
```typescript
export const metadata = {
  title: 'Get in Touch — Dan Napoleoni',
  description:
    'Contact Dan Napoleoni about frontend development, digital marketing, or UX engineering roles in Melbourne.',
};
```

### `app/page.tsx` (home)
```typescript
export const metadata = {
  title: 'Dan Napoleoni — Frontend Developer, Melbourne',
  description:
    'A developer who thinks like a designer and communicates like a human. 15+ years building for the web. Currently available.',
};
```

---

## 8. Hardcoded title references

The UX role title changed from "UX-Minded Engineer" to "UX Engineer". The role data in `roles.ts` drives most references, but search the entire codebase for any hardcoded instances of "UX-Minded" and update them to "UX". The slug remains `ux-engineer` — no URL changes needed.

---

## Summary of files to change:
- `data/roles.ts` — bulk of changes (all four roles: intro, skills, timelines, case studies, shortDesc, title)
- `components/ContactSection.tsx` — relocation line in default description
- `app/cv/page.tsx` — Also section paragraph
- `app/frontend-developer/page.tsx` — add metadata
- `app/digital-marketing/page.tsx` — add metadata
- `app/ux-engineer/page.tsx` — add metadata
- `app/chief-vibes-officer/page.tsx` — add metadata
- `app/contact/page.tsx` — add metadata
- `app/page.tsx` — add metadata

No new components. No new types. No CSS changes. No new dependencies.

Do NOT commit. Dan will review all changes on localhost first.
