'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Testimonial } from '@/types';
import { Icon } from '@/components/ui/Icon';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  heading?: string;
}

export function TestimonialCarousel({
  testimonials,
  heading = 'What people say',
}: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Reset auto-rotate timer when user manually navigates
  const [manualNav, setManualNav] = useState(0);

  function handleNext() {
    next();
    setManualNav((n) => n + 1);
  }

  function handlePrev() {
    prev();
    setManualNav((n) => n + 1);
  }

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next, testimonials.length, manualNav]);

  if (testimonials.length === 0) return null;

  const t = testimonials[current];

  return (
    <section
      className="testimonial-section"
      aria-labelledby="testimonial-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 id="testimonial-heading" className="section-heading">
        {heading}
      </h2>
      <div className="testimonial-carousel">
        {testimonials.length > 1 && (
          <button
            type="button"
            className="carousel-btn carousel-btn--prev"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <Icon name="chevron-left" size={24} />
          </button>
        )}

        <blockquote className="testimonial-quote" aria-live="polite">
          <p className="testimonial-text">&ldquo;{t.quote}&rdquo;</p>
          <footer className="testimonial-attribution">
            <cite>
              <span className="testimonial-name">{t.name}</span>
              <span className="testimonial-role">
                {t.role}, {t.company}
              </span>
            </cite>
          </footer>
        </blockquote>

        {testimonials.length > 1 && (
          <button
            type="button"
            className="carousel-btn carousel-btn--next"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <Icon name="chevron-right" size={24} />
          </button>
        )}
      </div>

      {testimonials.length > 1 && (
        <ul className="testimonial-dots" aria-label="Non-clickable testimonial index indicators">
          {testimonials.map((_, i) => (
            <li
              key={i}
              className={`testimonial-dot${i === current ? ' testimonial-dot--active' : ''}`}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
