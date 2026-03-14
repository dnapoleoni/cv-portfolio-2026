import { Hero } from '@/components/Hero';
import { RoleGrid } from '@/components/RoleGrid';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { ContactSection } from '@/components/ContactSection';
import { getFeaturedTestimonials } from '@/data/testimonials';

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
      <ContactSection />
    </>
  );
}
