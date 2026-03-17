import { Hero } from '@/components/sections/Hero';
import { RoleGrid } from '@/components/sections/RoleGrid';
import { TestimonialCarousel } from '@/components/sections/TestimonialCarousel';
import { ContactCTA } from '@/components/sections/ContactCTA';
import { getFeaturedTestimonials } from '@/lib/testimonials';

export const metadata = {
  title: 'Dan Napoleoni — Frontend Developer, Melbourne',
  description:
    'A developer who thinks like a designer and communicates like a human. 15+ years building for the web. Currently available.',
};

export default function Home() {
  const testimonials = getFeaturedTestimonials(5);

  return (
    <>
      <Hero />
      <RoleGrid />
      <TestimonialCarousel testimonials={testimonials} />
      <ContactCTA />
    </>
  );
}
