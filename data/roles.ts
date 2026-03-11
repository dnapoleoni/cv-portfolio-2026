export type TechIconId =
  | 'react' | 'typescript' | 'vue' | 'javascript' | 'html'
  | 'css' | 'nextjs' | 'salesforce' | 'figma' | 'git'
  | 'sparkles' | 'puzzle' | 'users' | 'accessibility'

export interface TimelineEntry {
  date: string
  role: string
  company: string
  type?: 'contract' | 'redundancy' | 'permanent'
  description: string
}

export interface CaseStudy {
  title: string
  description: string
}

export interface Tagline {
  mono: string    // displayed in JetBrains Mono
  serif: string   // displayed in Cormorant Garamond italic
  hand: string    // displayed in Caveat, accent colour
}

export interface RoleData {
  slug: string
  title: string
  shortDesc: string
  subtitle: string
  tagline: Tagline
  intro: string[]
  variant?: 'vibes'
  icons: TechIconId[]
  skills: string[]
  timeline: TimelineEntry[]
  caseStudies: CaseStudy[]
}

export const roles: RoleData[] = [
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    shortDesc: 'React, TypeScript, Vue.js — 15+ years building for the web, from Flash to frameworks.',
    subtitle: 'Modern frontend engineering with a UX-first mindset',
    tagline: {
      mono: 'A developer',
      serif: 'who thinks like a designer',
      hand: 'and communicates like a human.',
    },
    icons: ['react', 'typescript', 'vue', 'nextjs'],
    intro: [
      "I've been building for the web since Flash was king. That journey — through ActionScript, jQuery, Backbone, Angular, Vue, and now React — means I don't just know frameworks, I understand the web platform itself. I write semantic HTML, modern CSS, and accessible interfaces because I've seen enough trends come and go to know what actually matters: does it work, is it fast, can everyone use it?",
      "My most recent work has been in React and TypeScript at Everest Engineering, building features for production applications. Before that I spent years deep in Vue.js across multiple agencies and product teams. I'm framework-flexible because my fundamentals are strong.",
      "What makes me different from other frontend developers is that I don't just implement designs — I interrogate them. I'll flag accessibility issues, question interaction patterns that don't serve users, and fill in the gaps the brief left out. I've been told this is both my greatest strength and occasionally annoying. I'm fine with that.",
    ],
    skills: [
      'React', 'TypeScript', 'Vue.js', 'JavaScript (ES2024)',
      'HTML5 / Semantic HTML', 'CSS3 / SCSS / Tailwind',
      'Next.js', 'Nuxt', 'Astro',
      'REST APIs', 'GraphQL',
      'Git', 'Agile / Scrum',
      'Figma → Code', 'Responsive Design',
      'WCAG Accessibility', 'Performance Optimisation',
      'Headless CMS (DatoCMS, Contentful, Sanity)',
      'AI-Assisted Development (Claude, Copilot, Cursor)',
    ],
    timeline: [
      {
        date: '2024 - 2025',
        role: 'Frontend Developer',
        company: 'Everest Engineering',
        type: 'redundancy',
        description: 'React + TypeScript feature development for production web applications. Component architecture, API integration, and collaborative agile workflow.',
      },
      {
        date: '2023 - 2024',
        role: 'Frontend Developer',
        company: 'Mira (Business Management Software)',
        type: 'contract',
        description: 'Frontend development for a business management SaaS product.',
      },
      {
        date: '2021 - 2023',
        role: 'VueJS Developer',
        company: 'AdTorque Edge',
        type: 'permanent',
        description: 'Vue.js development for advertising and marketing technology solutions within a product team.',
      },
      {
        date: '2019 - 2021',
        role: 'Frontend Developer',
        company: 'Honest Fox',
        type: 'redundancy',
        description: 'Frontend development at a digital design and development agency. Component-driven builds, headless CMS integration, and responsive interfaces.',
      },
      {
        date: '2017 - 2019',
        role: 'Frontend Developer',
        company: 'The Royals / Cummins & Partners',
        type: 'contract',
        description: 'Agency frontend development across multiple client projects — campaign sites, interactive experiences, and responsive builds.',
      },
      {
        date: '2014 - 2017',
        role: 'Frontend Developer',
        company: 'Isobar / Clemenger',
        type: 'permanent',
        description: 'Large-scale agency work across major Australian brands. Campaign builds, interactive experiences, and dynamic content systems.',
      },
    ],
    caseStudies: [
      {
        title: 'The brief said "build this form." I asked about the users.',
        description: "A multi-step registration flow was spec'd as a single long page. I proposed breaking it into progressive steps with smart defaults and inline validation, reducing completion time from 3 minutes to under 90 seconds. I didn't just build a form — I thought about who was filling it in and why they might give up.",
      },
      {
        title: 'Accessible by default, not as an afterthought.',
        description: "On a component library build, I established accessibility as a baseline rather than a checkbox. Every component shipped with proper ARIA attributes, keyboard navigation, and screen reader announcements. When the client later needed to meet WCAG AA compliance, we were already there.",
      },
    ],
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing Specialist',
    shortDesc: 'eDMs, HTML banners, Salesforce Marketing Cloud — the full digital campaign toolkit.',
    subtitle: 'Email campaigns, dynamic banners, and marketing automation at scale',
    tagline: {
      mono: 'A developer',
      serif: 'who speaks marketing',
      hand: 'and builds campaigns that actually work.',
    },
    icons: ['salesforce', 'html', 'css', 'javascript'],
    intro: [
      "Before I became a \"frontend developer\" I spent years deep in the trenches of digital marketing production — building eDM templates and campaigns in Salesforce Marketing Cloud (ExactTarget), creating dynamic HTML banners for Google DV360 and DoubleClick, and managing campaign deployments for some of Australia's biggest brands.",
      "I ran the email template development for Myer and Australia Post for years. That means I know the pain of Outlook rendering, the art of responsive email design, and the operational reality of deploying to millions of inboxes. I've built template systems, automated campaign workflows, and debugged more rendering issues across more email clients than I'd like to admit.",
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
      'Marketing Automation',
      'HTML / CSS / JavaScript',
      'Photoshop / Figma',
    ],
    timeline: [
      {
        date: '2023',
        role: 'eDM Developer',
        company: 'World Vision Australia',
        type: 'contract',
        description: 'Email campaign development and template management for digital fundraising initiatives.',
      },
      {
        date: '2016 - 2019',
        role: 'eDM & Banner Developer',
        company: 'Various Agencies (Clemenger, Isobar, Trout)',
        description: 'End-to-end eDM development for clients including Myer and Australia Post. Built and maintained template systems, created dynamic HTML banners for programmatic campaigns, handled deployment and QA across major email clients.',
      },
      {
        date: '2012 - 2016',
        role: 'Digital Producer / Developer',
        company: 'Various Agencies',
        description: 'Full-service digital production including banner campaigns, eDMs, landing pages, and interactive rich media units.',
      },
    ],
    caseStudies: [
      {
        title: "Scaling email production for Myer's seasonal campaigns.",
        description: "Built a modular template system that let the marketing team assemble campaign emails from pre-built, tested components. This cut production time per campaign from days to hours while maintaining consistency across Myer's brand guidelines and ensuring rendering across 30+ email clients.",
      },
    ],
  },
  {
    slug: 'ux-engineer',
    title: 'UX-Minded Engineer',
    shortDesc: "I don't just build what's in the brief — I question it, improve it, and fill in the gaps.",
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
      "I bring a perspective that sits between design and engineering. I can read a Figma file and implement it faithfully, but I'll also flag when a hover state is missing, when a loading state hasn't been considered, when the empty state is blank, or when the error message says \"An error occurred\" instead of something actually helpful.",
      "Some people find this annoying. Most come to appreciate it.",
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
    timeline: [
      {
        date: 'Throughout career',
        role: 'The approach, not the title',
        company: "Every role I've held",
        description: "This isn't a separate chapter of my career — it's how I approach every role. Whether I was building banner ads or React components, I've always asked \"but does this actually work for the person using it?\"",
      },
    ],
    caseStudies: [
      {
        title: 'The missing states nobody asked for.',
        description: "On a dashboard build, the designs covered the happy path beautifully but had zero treatment for empty states, error states, loading states, or the \"you have 400 items and the page is now unusable\" state. I documented every gap, proposed solutions for each, and built them. The PM later said it saved them a sprint's worth of bug reports.",
      },
      {
        title: 'Questioning the brief, improving the outcome.',
        description: "A feature spec called for a simple dropdown with 200+ options. I pushed back and proposed a searchable combobox with recent selections and smart grouping. The extra day of work saved users from scrolling through an alphabetical list every single time they used the feature.",
      },
    ],
  },
  {
    slug: 'chief-vibes-officer',
    title: 'Chief Vibes Officer',
    shortDesc: 'Social clubs, ARGs, events, culture — I make workplaces places people actually want to be.',
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
      "At every workplace I've been part of, I've ended up being the person who makes it fun to be there. Not in a \"mandatory fun\" corporate way — in a genuine, grassroots, \"people actually look forward to this\" way. I've run social clubs, created alternate reality games for the office, designed and hosted events, built Slack bots for fun, run trivia nights, organised creative challenges, and generally been the person who turns a group of colleagues into an actual community.",
      "I take this seriously because I've seen what it does. Teams that enjoy being together do better work. People who feel connected to their workplace stay longer. Culture isn't a ping pong table — it's the feeling that someone gives a damn about making this place good.",
      "If your company has an Employee Experience, Culture, Internal Comms, or Engagement role — or if you're an agency that knows the value of good vibes — I'm your guy.",
    ],
    skills: [
      'Social Club Design & Management',
      'Event Planning & Hosting',
      'ARG (Alternate Reality Game) Design',
      'Interactive Experience Creation',
      'Slack Culture & Bot Creation',
      'Trivia & Game Design',
      'Creative Challenge Curation',
      'Team Building (the actually fun kind)',
      'Internal Communications',
      'Community Building',
      'Award Submission Writing',
      'Puzzle Design',
      'Creative Writing',
    ],
    timeline: [
      {
        date: 'Ongoing',
        role: 'Chief Vibes Officer (Self-Appointed)',
        company: "Everywhere I've worked",
        description: "At every agency and company I've been part of, I've created or contributed to social programs, culture initiatives, and interactive experiences that made the workplace genuinely more enjoyable.",
      },
    ],
    caseStudies: [
      {
        title: 'More than just a developer.',
        description: "This section is a work in progress — I'm gathering specific examples, photos, and stories from the social clubs, ARGs, events, and culture initiatives I've run across my career. Watch this space.",
      },
    ],
  },
]

export function getRoleBySlug(slug: string): RoleData | undefined {
  return roles.find(r => r.slug === slug)
}

export function getOtherRoles(currentSlug: string): RoleData[] {
  return roles.filter(r => r.slug !== currentSlug)
}
