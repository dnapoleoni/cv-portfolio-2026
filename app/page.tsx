import { Hero } from '@/components/Hero'
import { RoleGrid } from '@/components/RoleGrid'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { ContactSection } from '@/components/ContactSection'
import { getFeaturedTestimonials } from '@/data/testimonials'

export default function Home() {
  const testimonials = getFeaturedTestimonials(5)

  return (
    <>
      <Hero />
      <RoleGrid />
      <ContactSection />
      <TestimonialCarousel testimonials={testimonials} />
    </>
  )
}
