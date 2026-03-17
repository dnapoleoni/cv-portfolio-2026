# PDF Generation — Role-Specific Variants

> Adding the 4 role-specific PDFs alongside the existing Full Picture CV. Stay on the current branch — do not create a new branch.
>
> **Scope:** Update `scripts/pdf/CVTemplate.tsx` and `scripts/generate-pdfs.tsx`. No other files need changes.

## Context

The Full Picture CV PDF (`Dan-Napoleoni-CV.pdf`) is working and styled. Now we need 4 role-specific variants:

- `Dan-Napoleoni-CV-frontend-developer.pdf`
- `Dan-Napoleoni-CV-digital-marketing.pdf`
- `Dan-Napoleoni-CV-ux-engineer.pdf`
- `Dan-Napoleoni-CV-chief-vibes-officer.pdf`

These use the same template but with role-specific data: different title, summary, experiences, and skills. The key difference is that role-specific PDFs have **flat skills lists** (no categories), matching their online counterparts.

## Instructions

### Step 1: Read first

1. Read `scripts/pdf/CVTemplate.tsx` — the current template
2. Read `scripts/generate-pdfs.tsx` — the current generation script
3. Read `data/roles.ts` — all 5 role definitions (pay attention to `skills`, `experienceIds`, `intro`, `title`, `subtitle`)
4. Read `lib/experiences.ts` — `getTimelineForRole(experienceIds, roleSlug)` signature
5. Read `lib/roles.ts` — `getRoleBySlug` and `getPdfForSlug`

### Step 2: Update CVTemplate to support flat skills

The template currently accepts `skills: SkillCategory[]` where each category has a `category` label and `items` array. For role-specific PDFs, skills should render as a flat comma-separated (or mid-dot-separated) list without category labels.

**Approach:** Update the `skills` prop to accept both formats. When a category has an empty string as its `category` name, render just the items without a label.

Change the `CVTemplateProps` interface:
```tsx
// Keep SkillCategory as-is, but update the template rendering:
```

In the skills rendering section, update to handle empty category names:

```tsx
{skills.map((group, i) => (
  <View key={i} style={styles.skillRow}>
    {group.category ? (
      <Text style={styles.skillCategory}>{group.category}</Text>
    ) : null}
    <Text style={group.category ? styles.skillItems : styles.skillItemsFlat}>
      {group.items.join('  ·  ')}
    </Text>
  </View>
))}
```

Add a `skillItemsFlat` style — same as `skillItems` but without the `flex: 1` constraint (since there's no category label taking up width):
```tsx
skillItemsFlat: {
  fontFamily: 'Outfit',
  fontWeight: 400,
  fontSize: 9,
  color: COLORS.textSecondary,
  lineHeight: 1.5,
},
```

### Step 3: Make the footer site URL role-aware

Currently the footer always links to `danielnapoleoni.dev`. For role-specific PDFs, it should link to the role page:

Add a `siteUrlPath` prop (optional) to `CVTemplateProps`:
```tsx
interface CVTemplateProps {
  // ...existing props...
  siteUrlPath?: string;  // e.g. '/frontend-developer' — appended to siteUrl in footer link
}
```

Update the footer rendering:
```tsx
<Text style={styles.footer}>
  Full portfolio and references at{' '}
  <Link src={`https://${siteUrl}${siteUrlPath || ''}`} style={styles.footerLink}>
    {siteUrl}{siteUrlPath || ''}
  </Link>
</Text>
```

The Full Picture PDF continues to pass no `siteUrlPath` (links to root). Role PDFs pass their slug path.

### Step 4: Update the generation script

Add a function for each role-specific PDF, then call them all from `main()`.

The pattern for each role PDF:

```tsx
async function generateRoleCV(slug: string) {
  const role = getRoleBySlug(slug);
  if (!role) throw new Error(`Role not found: ${slug}`);

  const email = process.env.CONTACT_EMAIL;
  if (!email) throw new Error('CONTACT_EMAIL not set in .env');

  const timeline = getTimelineForRole(role.experienceIds, role.slug);

  // Wrap flat skills in a single category with empty name
  const skills: SkillCategory[] = [{ category: '', items: role.skills }];

  const filename = `Dan-Napoleoni-CV-${slug}.pdf`;
  const outputPath = path.join(OUTPUT_DIR, filename);

  await renderToFile(
    <CVTemplate
      name="Dan Napoleoni"
      title={`${role.title} · Melbourne, Australia`}
      email={email}
      siteUrl="danielnapoleoni.dev"
      siteUrlPath={`/${slug}`}
      linkedIn="linkedin.com/in/daniel-napoleoni"
      summary={role.intro[0]}
      skills={skills}
      experiences={timeline}
      footer={`Full portfolio and references at danielnapoleoni.dev/${slug}`}
    />,
    outputPath
  );
  console.log(`✓ Generated: ${outputPath}`);
}
```

**Important details per role:**

**Frontend Developer** (`frontend-developer`)
- Title line: "Frontend Developer · Melbourne, Australia"
- Summary: first intro paragraph (starts with "I've been building for the web since Flash was king...")
- Skills: 20 items, flat list
- Experiences: 8 entries (everest, mira, adtorque, honest-fox, clemenger, freelance-contract, isobar, cre8ive)
- Descriptions resolve with `frontend-developer` variant (uses `default` for most)

**Digital Marketer** (`digital-marketing`)
- Title line: "Digital Marketer · Melbourne, Australia"
- Summary: first intro paragraph (starts with 'Before I became a "frontend developer"...')
- Skills: 14 items, flat list
- Experiences: 5 entries (world-vision, bower-house, clemenger, freelance-contract, isobar)
- Descriptions resolve with `digital-marketing` variant

**UX Engineer** (`ux-engineer`)
- Title line: "UX Engineer · Melbourne, Australia"
- Summary: first intro paragraph (starts with "I'm not a UX designer by title, but I think like one...")
- Skills: 10 items, flat list
- Experiences: 4 entries (everest, mira, clemenger, isobar)
- Descriptions resolve with `ux-engineer` variant

**Chief Vibes Officer** (`chief-vibes-officer`)
- Title line: "Chief Vibes Officer · Melbourne, Australia"
- Summary: first intro paragraph (starts with "This is the part of my CV that doesn't fit on a normal CV...")
- Skills: 10 items, flat list
- Experiences: 4 entries (isobar, clemenger, honest-fox, cvo-off-the-clock)
- Descriptions resolve with `chief-vibes-officer` variant

**Update `main()` to generate all 5 PDFs:**

```tsx
async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('Generating PDFs...\n');
  await generateFullPictureCV();
  await generateRoleCV('frontend-developer');
  await generateRoleCV('digital-marketing');
  await generateRoleCV('ux-engineer');
  await generateRoleCV('chief-vibes-officer');
  console.log('\nDone.');
}
```

Keep the existing `generateFullPictureCV` function unchanged — it uses the hardcoded categorised skills. The new `generateRoleCV` function handles all 4 role variants generically.

### Step 5: Education section

Education should appear on ALL PDFs (it's currently hardcoded in the template). No changes needed here — it's part of the template and applies universally.

### Step 6: Test

Run `npm run generate-pdfs` and verify:

1. All 5 PDFs are generated in `public/pdfs/`:
   - `Dan-Napoleoni-CV.pdf`
   - `Dan-Napoleoni-CV-frontend-developer.pdf`
   - `Dan-Napoleoni-CV-digital-marketing.pdf`
   - `Dan-Napoleoni-CV-ux-engineer.pdf`
   - `Dan-Napoleoni-CV-chief-vibes-officer.pdf`

2. For each role PDF check:
   - Title line shows the correct role name
   - Summary is the correct first intro paragraph for that role
   - Skills are a flat list (no category labels)
   - Experience entries match the role's `experienceIds` 
   - Experience descriptions use the role-specific variant (e.g. digital-marketing descriptions focus on eDM/banner work, not frontend)
   - Footer links to the role-specific page (e.g. danielnapoleoni.dev/frontend-developer)
   - Education section is present
   - All links are clickable

3. The Full Picture PDF is unchanged from before.

## What NOT to do

- Do not create a new branch — stay on the current branch
- Do not modify `lib/roles.ts`, `data/roles.ts`, or any other data/lib files
- Do not change the Full Picture CV's content or styling
- Do not change the categorised skills for the Full Picture — that stays as the hardcoded array in the generation script
- Do not add education data to the data layer — it's fine hardcoded in the template for now

## Output

After completing, provide:
- Confirmation all 5 PDFs were generated
- Page count for each PDF
- Any issues with role-specific variant resolution (did descriptions resolve correctly?)
