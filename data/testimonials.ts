export interface Testimonial {
  quote: string
  name: string
  role: string
  company: string
  /** Which role pages this testimonial is relevant to */
  relevantRoles: string[]
  /** Whether this person has consented to being contacted */
  contactable?: boolean
}

/**
 * PLACEHOLDER TESTIMONIALS
 * Replace these with real quotes once you've gotten consent from your references.
 * The structure supports both the homepage carousel and role-specific filtering.
 */
export const testimonials: Testimonial[] = [
  {
    quote: "Dan is one of those rare developers who genuinely cares about the end user. He doesn't just build what's asked — he makes it better.",
    name: 'Placeholder Name',
    role: 'Product Manager',
    company: 'Previous Company',
    relevantRoles: ['frontend-developer', 'ux-engineer'],
    contactable: false,
  },
  {
    quote: "Working with Dan felt like having a designer and developer in one seat. His UX instincts saved us from shipping things we'd have had to fix later.",
    name: 'Placeholder Name',
    role: 'Design Lead',
    company: 'Previous Agency',
    relevantRoles: ['ux-engineer', 'frontend-developer'],
    contactable: false,
  },
  {
    quote: "He literally started a social club in his first week. Within a month the whole floor was involved. That's not something you can put in a job description but it changed the team.",
    name: 'Placeholder Name',
    role: 'People & Culture',
    company: 'Previous Company',
    relevantRoles: ['chief-vibes-officer'],
    contactable: false,
  },
  {
    quote: "Dan's email templates were bulletproof. We'd send to millions of inboxes and the renders were consistent every time. He understood the platform better than most.",
    name: 'Placeholder Name',
    role: 'Marketing Manager',
    company: 'Previous Client',
    relevantRoles: ['digital-marketing-specialist'],
    contactable: false,
  },
  {
    quote: "The best thing about Dan is you can give him a problem and he'll come back with a solution you didn't think of. He thinks laterally in a way that makes everything better.",
    name: 'Placeholder Name',
    role: 'Tech Lead',
    company: 'Previous Company',
    relevantRoles: ['frontend-developer', 'ux-engineer'],
    contactable: false,
  },
]

export function getTestimonialsForRole(slug: string): Testimonial[] {
  return testimonials.filter(t => t.relevantRoles.includes(slug))
}

export function getFeaturedTestimonials(count = 3): Testimonial[] {
  return testimonials.slice(0, count)
}
