import React from 'react';
import { renderToFile } from '@react-pdf/renderer';
import { CVTemplate } from './pdf/CVTemplate';
import type { SkillCategory } from './pdf/CVTemplate';
import { getRoleBySlug } from '@/lib/roles';
import { getTimelineForRole } from '@/lib/experiences';
import 'dotenv/config';
import path from 'path';
import fs from 'fs';

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'pdfs');

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

async function generateFullPictureCV(email: string) {
  const role = getRoleBySlug('the-full-picture');
  if (!role) throw new Error('Role not found: the-full-picture');

  const timeline = getTimelineForRole(role.experienceIds, role.slug);

  const outputPath = path.join(OUTPUT_DIR, 'Dan-Napoleoni-CV.pdf');
  await renderToFile(
    <CVTemplate
      name="Dan Napoleoni"
      title="Frontend Developer · Melbourne, Australia"
      email={email}
      siteUrl="danielnapoleoni.dev"
      linkedIn="linkedin.com/in/daniel-napoleoni"
      summary={role.intro[0]}
      skills={fullPictureSkills}
      experiences={timeline}
      footer="Full portfolio and references at danielnapoleoni.dev"
    />,
    outputPath
  );
  console.log(`✓ Generated: ${outputPath}`);
}

async function generateRoleCV(slug: string, email: string) {
  const role = getRoleBySlug(slug);
  if (!role) throw new Error(`Role not found: ${slug}`);

  const timeline = getTimelineForRole(role.experienceIds, role.slug);
  const skills: SkillCategory[] = [{ category: '', items: role.skills }];

  const outputPath = path.join(OUTPUT_DIR, `Dan-Napoleoni-CV-${slug}.pdf`);
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

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const email = process.env.CONTACT_EMAIL;
  if (!email) throw new Error('CONTACT_EMAIL not set in .env');

  console.log('Generating PDFs...\n');
  await generateFullPictureCV(email);
  await generateRoleCV('frontend-developer', email);
  await generateRoleCV('digital-marketing', email);
  await generateRoleCV('ux-engineer', email);
  await generateRoleCV('chief-vibes-officer', email);
  console.log('\nDone.');
}

main().catch((err) => {
  console.error('PDF generation failed:', err);
  process.exit(1);
});
