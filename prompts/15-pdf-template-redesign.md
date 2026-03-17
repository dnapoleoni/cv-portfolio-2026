# PDF Generation — Redesigned Template

> Updating the existing PDF generation on the current branch. Do NOT create a new branch — stay on whatever branch is currently checked out.
>
> **Scope:** Replace the PDF template and update the generation script. Update PDF paths. Do not touch .env setup (already done).

## Context

The PDF generation infrastructure is already set up on this branch:
- `@react-pdf/renderer`, `tsx`, and `dotenv` are installed
- `.env` exists with `CONTACT_EMAIL`
- `.gitignore` has PDF entries
- `package.json` has the `generate-pdfs` script
- A basic template and script exist but the output is too plain

This prompt replaces the template with a properly designed version that matches the portfolio site's visual identity, and updates the generation script with categorised skills.

## Instructions

### Step 1: Read first

1. Read `CLAUDE.md`
2. Read `data/roles.ts` — the `the-full-picture` role definition
3. Read `data/experiences.ts` — all experience entries
4. Read `lib/experiences.ts` — the resolver functions and `getTimelineForRole` signature (it takes `experienceIds` and `roleSlug`)
5. Read `lib/roles.ts` — `getRoleBySlug` and `getPdfForSlug`
6. Read `types/index.ts` — `ResolvedTimelineEntry`
7. Read whatever currently exists in `scripts/` to understand what's already there

### Step 2: Update PDF paths

In `lib/roles.ts`, update `getPdfForSlug` so all PDFs are served from `/pdfs/`:

```ts
// All three return statements should use /pdfs/ prefix:
{ href: '/pdfs/Dan-Napoleoni-CV.pdf', label: 'Download CV' }
{ href: `/pdfs/Dan-Napoleoni-CV-${slug}.pdf`, label: `Download CV - ${role.title}` }
{ href: '/pdfs/Dan-Napoleoni-CV.pdf', label: 'Download CV' }
```

Ensure `public/pdfs/` directory exists (create it if not).

### Step 3: Replace the PDF template

Replace (or create) `scripts/pdf/CVTemplate.tsx` with the design below.

**Design requirements:**
- Uses Outfit (body) and JetBrains Mono (name, dates, section headings, skill categories) — registered from Google Fonts TTF URLs
- Terracotta accent colour (#b05a30) for name and section headings only
- White background (prints cleaner than off-white)
- A4 page size
- Single-column layout (ATS-friendly)
- All links are clickable (`<Link src="...">`)
- Skills grouped by category with mono labels
- Experience entries use `wrap={false}` to avoid mid-entry page breaks where possible

**Colour constants:**
```tsx
const COLORS = {
  accent: '#b05a30',
  text: '#1c1b18',
  textSecondary: '#4a4840',
  textTertiary: '#7a7870',
  border: '#c8c5bc',
  bg: '#ffffff',
};
```

**Font registration:**

Register Outfit (weights 300, 400, 500) and JetBrains Mono (weights 400, 500) from Google Fonts. Use direct .ttf URLs from fonts.gstatic.com. If you're unsure of the exact URLs, fetch the CSS from Google Fonts to find them:
- https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500
- https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500

Look for the `src: url(...)` lines in the response and use those .ttf paths.

If remote font URLs cause issues at render time, download the .ttf files to `scripts/pdf/fonts/` and reference them locally instead.

**Layout (top to bottom):**

```
Dan Napoleoni                              [JetBrains Mono, 22pt, weight 500, terracotta]
Frontend Developer · Melbourne, Australia  [Outfit, 11pt, weight 300, secondary colour]

hello@...  ·  danielnapoleoni.dev  ·  linkedin.com/in/daniel-napoleoni
                                           [JetBrains Mono, 8pt, secondary, all clickable]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  [1.5pt terracotta rule]

[Summary paragraph — Outfit 9.5pt, secondary colour, 1.6 line height]

SKILLS & TOOLS                             [JetBrains Mono, 9pt, terracotta, uppercase, 1px tracking]

Development  React · TypeScript · Vue.js · JavaScript (ES6+) · ...
UX           Figma → Code · Responsive Design · ...
Marketing    Salesforce Marketing Cloud · eDM Design & Development · ...
Tools        Git · Agile / Scrum · ...
             [categories: JetBrains Mono 8pt, tertiary, 72pt wide]
             [items: Outfit 9pt, secondary, mid-dot separated]

EXPERIENCE                                 [JetBrains Mono, 9pt, terracotta, uppercase]

Software Engineer · Everest Engineering    [Outfit, 10.5pt, weight 500, primary colour]
2025 – 2026 · Contract                    [JetBrains Mono, 8pt, tertiary]
[description]                              [Outfit, 9pt, secondary, 1.55 line height]

Frontend Developer · Mira | Business Software
2024 – 2025 · Role made redundant
[description]

...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  [0.5pt border-colour rule]
Full portfolio and references at danielnapoleoni.dev
                                           [JetBrains Mono, 8pt, tertiary, centered]
                                           [danielnapoleoni.dev is a clickable link in accent colour]
```

**Props interface:**

```tsx
interface SkillCategory {
  category: string;
  items: string[];
}

interface CVTemplateProps {
  name: string;
  title: string;
  email: string;
  siteUrl: string;
  linkedIn: string;
  summary: string;
  skills: SkillCategory[];
  experiences: ResolvedTimelineEntry[];
  footer: string;
}
```

Import `ResolvedTimelineEntry` from `@/types` (or use the relative path `../../types` — whatever resolves when running via tsx from the project root).

Export both `CVTemplate`, `SkillCategory`, and `CVTemplateProps`.

**Experience entry rendering:**
- Role title and company on one line: `{exp.role} · {exp.company}`
- Date and type label on next line. Only show type label for `contract` ("Contract") and `redundancy` ("Role made redundant"). Don't show anything for `permanent` — that's the assumed default.
- Description below.
- 12pt bottom margin between entries.
- `wrap={false}` on each entry View to prevent mid-entry page breaks.

**Footer rendering:**
The footer text is passed as a prop but the site URL within it should be a clickable link. Simplest approach: hardcode the footer JSX directly rather than trying to parse the prop:

```tsx
<Text style={styles.footer}>
  Full portfolio and references at{' '}
  <Link src={`https://${siteUrl}`} style={styles.footerLink}>
    {siteUrl}
  </Link>
</Text>
```

### Step 4: Update the generation script

Replace (or update) `scripts/generate-pdfs.tsx`.

**Key requirements:**
- Imports `getRoleBySlug` from `@/lib/roles`
- Imports `getTimelineForRole` from `@/lib/experiences`
- Calls `getTimelineForRole(role.experienceIds, role.slug)` (two arguments — the first is the experienceIds array, the second is the slug for variant resolution)
- Reads `CONTACT_EMAIL` from `process.env` (dotenv already loaded)
- Outputs to `public/pdfs/Dan-Napoleoni-CV.pdf`
- Creates `public/pdfs/` directory if it doesn't exist
- Passes categorised skills (not the flat role.skills array)

**Categorised skills to hardcode in the script:**

```ts
const fullPictureSkills: SkillCategory[] = [
  {
    category: 'Development',
    items: [
      'React', 'TypeScript', 'Vue.js', 'JavaScript (ES6+)',
      'HTML5 / Semantic HTML', 'CSS3 / SCSS / Tailwind', 'Next.js',
      'Nuxt', 'Quasar', 'Laravel', 'GSAP', 'REST APIs', 'GraphQL',
    ],
  },
  {
    category: 'UX',
    items: [
      'Figma → Code', 'Responsive Design', 'WCAG Accessibility',
      'UX Advocacy & Review', 'Interaction Design Implementation',
      'Design System Contribution', 'Edge Case Identification',
      'Error State & Empty State Design', 'User Flow Analysis',
    ],
  },
  {
    category: 'Marketing',
    items: [
      'Salesforce Marketing Cloud', 'eDM Design & Development',
      'HTML Email (Responsive, Cross-client)',
      'Google DV360 / DoubleClick Studio', 'Dynamic HTML Banners (DCO)',
      'Campaign Deployment & QA', 'A/B Testing', 'Google Web Designer',
      'Campaign Monitor', 'Mailchimp',
    ],
  },
  {
    category: 'Tools',
    items: [
      'Git', 'Agile / Scrum',
      'AI-Assisted Development (Claude, Copilot, Cursor)',
      'Headless CMS (Storyblok, DatoCMS, Craft CMS)',
      'Photoshop / Sketch / Figma', 'Litmus', 'Browserstack',
      'Cross-browser / Cross-device QA',
    ],
  },
];
```

**Template data to pass:**
- `name`: `'Dan Napoleoni'`
- `title`: `'Frontend Developer · Melbourne, Australia'`
- `email`: from `process.env.CONTACT_EMAIL`
- `siteUrl`: `'danielnapoleoni.dev'`
- `linkedIn`: `'linkedin.com/in/daniel-napoleoni'`
- `summary`: `role.intro[0]` (first paragraph only — the substantive one, not the tagline)
- `skills`: the `fullPictureSkills` array above
- `experiences`: result of `getTimelineForRole(role.experienceIds, role.slug)`
- `footer`: `'Full portfolio and references at danielnapoleoni.dev'`

**Rendering approach:**
Use `React.createElement(CVTemplate, props)` rather than JSX if there are issues with JSX in the script file. If JSX works fine with tsx, that's also fine. The key thing is that `renderToFile` (or `renderToStream` + `fs.writeFileSync` if `renderToFile` isn't available on the installed version) produces the output file.

Check the installed `@react-pdf/renderer` version's API. Common patterns:
```tsx
// Option A — if renderToFile exists:
import ReactPDF from '@react-pdf/renderer';
await ReactPDF.renderToFile(element, outputPath);

// Option B — if only renderToStream exists:
import { renderToStream } from '@react-pdf/renderer';
const stream = await renderToStream(element);
const writeStream = fs.createWriteStream(outputPath);
stream.pipe(writeStream);
await new Promise((resolve) => writeStream.on('finish', resolve));

// Option C — if renderToBuffer exists:
import { renderToBuffer } from '@react-pdf/renderer';
const buffer = await renderToBuffer(element);
fs.writeFileSync(outputPath, buffer);
```

Try option A first, fall back to B or C if needed.

### Step 5: Test

After writing all files:
1. Run `npm run generate-pdfs`
2. Verify `public/pdfs/Dan-Napoleoni-CV.pdf` is generated
3. Open the PDF and check:
   - Fonts render correctly (Outfit body, JetBrains Mono for name/dates/headings)
   - Name is in terracotta, large, JetBrains Mono
   - Links are clickable (email, site, LinkedIn)
   - Skills are grouped into 4 categories with mono labels
   - All 10 experience entries present
   - Contract/redundancy labels show, permanent entries have no label
   - Document is ~2 pages
   - Text is selectable and copy-pasteable in reading order

If fonts fail to load from remote URLs, download the .ttf files locally and update the Font.register paths.

## What NOT to do

- Do not create a new branch — work on the currently checked-out branch
- Do not modify .env or .env.example (already set up)
- Do not modify any site components or CSS (except `lib/roles.ts` path update)
- Do not include phone numbers anywhere
- Do not hardcode the email — read from process.env.CONTACT_EMAIL
- Do not use multi-column layouts or tables for layout in the PDF
- Do not use the site's custom Google Fonts link tags — use Font.register with .ttf URLs

## Output

After completing, provide:
- Confirmation the PDF was generated
- Whether fonts loaded successfully (remote or fell back to local)
- Approximate page count
- Any issues encountered
