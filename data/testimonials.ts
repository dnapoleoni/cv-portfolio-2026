import type { Testimonial } from '@/types';

/**
 * PLACEHOLDER TESTIMONIALS
 * Replace these with real quotes once you've gotten consent from your references.
 * The structure supports both the homepage carousel and role-specific filtering.
 */
export const testimonials: Testimonial[] = [
  {
    name: 'Nick Zuccarelli',
    role: 'Fullstack Software Engineer',
    company: 'Mira',
    contactable: false,
    quotes: [
      {
        text: 'Dan is great, has a go-get-em attitude to all his work and great to collaborate with. Highly recommend.',
        relevantRoles: [],
      },
      {
        text: 'Great VueJS skills 👍',
        relevantRoles: ['frontend-developer'],
      },
      {
        text: 'Great UX skills. Did a great deep dive of the Mira application and help assisted with usability issues.',
        relevantRoles: ['ux-engineer'],
      },
      {
        text: 'Awesome culture fit and a really positive attitude.',
        relevantRoles: ['chief-vibes-officer'],
      },
    ],
  },
  {
    name: 'Juan Ojeda',
    role: 'Consultant',
    company: 'Everest Engineering',
    contactable: false,
    quotes: [
      {
        text: "Dan brings an energy to a team that is hard to quantify, but very easy to love. He's a systems thinker, and has a deep conviction for great user experience backed by a strong attention to detail. He also has a strong sense of culture building, and knows how to bring the vibes.",
        relevantRoles: ['ux-engineer', 'chief-vibes-officer'],
      },
    ],
  },
];
