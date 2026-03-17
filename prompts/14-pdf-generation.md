# PDF Generation — The Full Picture CV

> First pass of PDF generation. We're building the template and script for one PDF ("The Full Picture" / general CV), then iterating on design before generating role-specific variants.
>
> **Branch:** `claude/pdf-generation`
> **Scope:** New dependency, generation script, PDF template component, env setup, gitignore updates.

## Git Setup

1. Confirm you are on the `main` branch
2. Create a branch: `git checkout -b claude/pdf-generation`
3. Make all changes on this branch
4. **Do not commit.** Dan will review the generated PDF, then commit manually.

## Context

The site has "Download CV" buttons on every page, mapped by `getPdfForSlug` in `lib/roles.ts`, but no actual PDF files exist yet. This prompt creates a build script that generates a PDF from the site's data layer — same source of truth, no manual content duplication.

We're starting with just the "Full Picture" PDF (`Dan-Napoleoni-CV.pdf`) to get the template right. Role-specific variants will follow in a separate prompt once we're happy with the design.

## Architecture Decisions

- **`@react-pdf/renderer`** for PDF generation — produces proper text layers (ATS-friendly), supports React component templating, and embeds fonts correctly.
- **`tsx`** as dev dependency to run TypeScript scripts with tsconfig path aliases.
- **`dotenv`** to load `.env` for contact details.
- **Offline generation** via `npm run generate-pdfs` — outputs static files to `public/`. No runtime PDF generation.
- **`.env`** for personal contact details (gitignored). PDFs are also gitignored and generated at Netlify build time.
- **Single-column layout** — ATS parsers can't handle multi-column, tables-for-layout, or visual elements. Clean, linear document flow.

## Instructions

### Step 1: Read first

1. Read `CLAUDE.md`
2. Read `data/roles.ts` — specifically the `the-full-picture` role definition
3. Read `data/experiences.ts` — all experience entries
4. Read `lib/experiences.ts` — the resolver functions
5. Read `types/index.ts` — the type definitions
6. Read `lib/roles.ts` — specifically `getPdfForSlug` to understand expected filenames

### Step 2: Install dependencies

```bash
npm install @react-pdf/renderer
npm install --save-dev tsx dotenv
```

### Step 3: Set up environment and gitignore

**Create `.env.example`** (committed — shows others what's needed):

```
# Contact details for PDF generation — copy to .env and fill in
CONTACT_EMAIL=your@email.com
```

**Confirm `.env`** (gitignored — real values):
Confirm the user has created the actual .env file already

**Update `.gitignore`** — add these entries:

```
# Generated PDFs (built at deploy time)
public/*.pdf
```

Note: `.env*.local` is already gitignored.

### Step 4: Create the PDF template

Create `scripts/pdf/CVTemplate.tsx` — a React component using `@react-pdf/renderer` primitives.

**Design principles:**

- Single column, top to bottom. No sidebars, no tables for layout.
- A4 page size (Dan is in Australia).
- Clean hierarchy via font size and weight. Minimal colour — use a single accent colour for name and section headings only.
- Body font: Helvetica (PDF standard font, no embedding needed, clean and professional). Don't use the site's custom fonts — they'd need embedding and may render inconsistently.
- Skills as a comma-separated paragraph, not visual tags. ATS parsers read text, not layout.
- Experience type labels (Contract, Role made redundant) included — they provide context for short stints.
- No icons, no images, no decorative elements.

**Layout structure (top to bottom):**

```
DAN NAPOLEONI                          (large, accent colour, bold)
Frontend Developer · Melbourne, Australia

email@address.com · danielnapoleoni.dev · linkedin.com/in/daniel-napoleoni
────────────────────────────────────────────────────────────────

SUMMARY
[First intro paragraph — the substantive one, not the tagline]

SKILLS & TOOLS
React, TypeScript, Vue.js, JavaScript (ES6+), HTML5 / Semantic HTML,
CSS3 / SCSS / Tailwind, Next.js, Nuxt, ... (comma-separated flowing text)

EXPERIENCE

2025 – 2026 · Software Engineer · Everest Engineering (Contract)
[description]

2024 – 2025 · Frontend Developer · Mira | Business Software (Role made redundant)
[description]

... (all experiences)

────────────────────────────────────────────────────────────────
Full portfolio and references at danielnapoleoni.dev
```

**Specific content decisions for the Full Picture PDF:**

- **Name:** "Dan Napoleoni" (not "Daniel" — matches the site's voice)
- **Title line:** "Frontend Developer · Melbourne, Australia" (from subtitle, simplified)
- **Contact line:** email (from .env), danielnapoleoni.dev, LinkedIn URL. No phone number.
- **Summary:** Use only the first intro paragraph (the substantive one). The second paragraph ("A developer who thinks like a designer...") is a tagline, not a summary — skip it.
- **Skills:** The full `skills` array from the role, comma-separated.
- **Experience:** All 10 experience entries, resolved with `the-full-picture` as the role slug (which will use `default` variants). Include date, role title, company, and description. Include type label where applicable (Contract, Role made redundant). Omit `permanent` — that's the assumed default.
- **No case studies, no testimonials, no "Also" section.** The PDF is for ATS scanning and quick human review. The site handles storytelling.

**Accent colour:** Use `#b05a30` (the default Claude theme terracotta). Only for the name and section headings.

**Template component structure:**

```tsx
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import type { ResolvedTimelineEntry } from '@/types';

interface CVTemplateProps {
  name: string;
  title: string;
  email: string;
  siteUrl: string;
  linkedIn: string;
  summary: string;
  skills: string[];
  experiences: ResolvedTimelineEntry[];
  footer: string;
}

export function CVTemplate({ ... }: CVTemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        {/* Summary */}
        {/* Skills */}
        {/* Experience */}
        {/* Footer */}
      </Page>
    </Document>
  );
}
```

The component should handle page breaks gracefully — if experience entries flow onto a second page, that's fine. Use `@react-pdf/renderer`'s `wrap={false}` on individual experience entries where possible to avoid breaking mid-entry (but allow it if an entry is longer than a page).

### Step 5: Create the generation script

Create `scripts/generate-pdfs.ts`:

```ts
import { renderToFile } from '@react-pdf/renderer';
import { CVTemplate } from './pdf/CVTemplate';
import { roles } from '@/data/roles';
import { getTimelineForRole } from '@/lib/experiences';
import { getRoleBySlug } from '@/lib/roles';
import 'dotenv/config';
import path from 'path';

const OUTPUT_DIR = path.join(process.cwd(), 'public');

async function generateFullPictureCV() {
  const role = getRoleBySlug('the-full-picture');
  if (!role) throw new Error('Role not found: the-full-picture');

  const email = process.env.CONTACT_EMAIL;
  if (!email) throw new Error('CONTACT_EMAIL not set in .env');

  const timeline = getTimelineForRole(role.experienceIds, role.slug);

  const element = CVTemplate({
    name: 'Dan Napoleoni',
    title: 'Frontend Developer · Melbourne, Australia',
    email,
    siteUrl: 'danielnapoleoni.dev',
    linkedIn: 'linkedin.com/in/daniel-napoleoni',
    summary: role.intro[0], // First paragraph only
    skills: role.skills,
    experiences: timeline,
    footer: 'Full portfolio and references at danielnapoleoni.dev',
  });

  const outputPath = path.join(OUTPUT_DIR, 'Dan-Napoleoni-CV.pdf');
  await renderToFile(element, outputPath);
  console.log(`✓ Generated: ${outputPath}`);
}

async function main() {
  console.log('Generating PDFs...');
  await generateFullPictureCV();
  // Role-specific PDFs will be added here later
  console.log('Done.');
}

main().catch((err) => {
  console.error('PDF generation failed:', err);
  process.exit(1);
});
```

Note: `renderToFile` may need to be called differently depending on the `@react-pdf/renderer` version. Check the API — it might be `renderToFile(<CVTemplate {...} />, path)` with JSX, or it might need `React.createElement`. Since we're running outside Next.js with tsx, JSX should work if the file extension is `.tsx`. If not, adjust accordingly.

Actually — the script file should be `.tsx` since it uses JSX for the component rendering:

```ts
await renderToFile(<CVTemplate {...props} />, outputPath);
```

Rename the script to `scripts/generate-pdfs.tsx`.

### Step 6: Add npm script

Update `package.json` scripts:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "generate-pdfs": "tsx scripts/generate-pdfs.tsx"
}
```

### Step 7: Update Netlify build

If a `netlify.toml` doesn't exist, create one. If it does, update the build command:

```toml
[build]
  command = "npm run generate-pdfs && npm run build"
  publish = ".next"

[build.environment]
  # CONTACT_EMAIL should be set in Netlify dashboard, not here
```

If there's no `netlify.toml` yet and Dan prefers to configure via the Netlify dashboard, skip this file and just note that the build command needs to be `npm run generate-pdfs && npm run build` with the `CONTACT_EMAIL` env var set.

### Step 8: Test

After writing all files:

1. Run `npm run generate-pdfs` and confirm it produces `public/Dan-Napoleoni-CV.pdf`
2. Open the PDF and verify:
   - Text is selectable (not rendered as image)
   - Content flows in a single column
   - All 10 experience entries are present with correct descriptions
   - Skills are listed as comma-separated text
   - Type labels appear for contract and redundancy entries
   - No phone number appears anywhere
   - Email, site URL, and LinkedIn URL are present
   - The document is 1–2 pages (ideally 2 given 10 experience entries with descriptions)
3. Test ATS readability: copy all text from the PDF and paste into a plain text editor — it should produce readable, structured text in the correct order

### Step 9: Clean up the old PDF

The file `docs/daniel-napoleoni-cv-2026.pdf` is Dan's old manually-created CV, used as a reference during development. It can stay for now (it's not in `public/`), but note it for Dan to review — it may be worth keeping as a reference or removing in a future cleanup.

## What NOT to do

- Do not modify any site components, CSS, or data files
- Do not use the site's custom fonts in the PDF (embedding issues, ATS concerns)
- Do not use multi-column layouts, tables for layout, or sidebars
- Do not include phone number, case studies, testimonials, or tagline
- Do not hardcode the email — it must come from the .env file
- Do not include any other personal details from .env — for this PDF, only CONTACT_EMAIL is used

## Output

After completing all steps, provide:

- List of files created/modified
- Confirmation the PDF was generated successfully
- The approximate page count of the generated PDF
- Any issues encountered with `@react-pdf/renderer` (font rendering, page breaks, etc.)

## Verification checklist for Dan

- [ ] `npm run generate-pdfs` runs without errors
- [ ] `public/Dan-Napoleoni-CV.pdf` exists and opens correctly
- [ ] Text is selectable and copy-pasteable in correct reading order
- [ ] Content: name, title, email, site URL, LinkedIn — no phone number
- [ ] Summary is the first intro paragraph only
- [ ] All 10 experience entries present with descriptions
- [ ] Contract/redundancy labels present where appropriate
- [ ] Skills listed as comma-separated text
- [ ] Looks clean and professional — not over-designed, not ugly
- [ ] PDF is 1–2 pages
- [ ] `.env` is gitignored
- [ ] `public/*.pdf` is gitignored
- [ ] On `npm run dev`, the "Download CV" button on the site serves this PDF
