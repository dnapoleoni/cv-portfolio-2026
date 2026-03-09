'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Testimonial } from '@/data/testimonials'

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  heading?: string
}

export function TestimonialCarousel({ testimonials, heading = 'What people say' }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    if (paused || testimonials.length <= 1) return
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [paused, next, testimonials.length])

  if (testimonials.length === 0) return null

  const t = testimonials[current]

  return (
    <section
      className="testimonial-section"
      aria-labelledby="testimonial-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 id="testimonial-heading" className="section-heading">{heading}</h2>
      <blockquote className="testimonial-quote" aria-live="polite">
        <p className="testimonial-text">&ldquo;{t.quote}&rdquo;</p>
        <footer className="testimonial-attribution">
          <cite>
            <span className="testimonial-name">{t.name}</span>
            <span className="testimonial-role">{t.role}, {t.company}</span>
          </cite>
        </footer>
      </blockquote>
      {testimonials.length > 1 && (
        <div className="testimonial-dots" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Testimonial ${i + 1}`}
              className={`testimonial-dot${i === current ? ' testimonial-dot--active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
