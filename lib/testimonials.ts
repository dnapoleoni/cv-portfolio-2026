import type { Testimonial } from '@/types';
import { testimonials } from '@/data/testimonials';

export function getTestimonialsForRole(slug: string): Testimonial[] {
  return testimonials.filter((t) => t.relevantRoles.includes(slug));
}

export function getFeaturedTestimonials(count = 3): Testimonial[] {
  return testimonials.slice(0, count);
}
