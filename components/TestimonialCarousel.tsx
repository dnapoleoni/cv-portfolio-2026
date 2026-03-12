'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Testimonial } from '@/data/testimonials';

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
            className="carousel-btn carousel-btn--prev"
            onClick={handlePrev}
            aria-label="Previous testimonial"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
            className="carousel-btn carousel-btn--next"
            onClick={handleNext}
            aria-label="Next testimonial"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {testimonials.length > 1 && (
        <ul
          className="testimonial-dots"
          role="tablist"
          aria-label="Non-clickable testimonial index indicator"
        >
          {testimonials.map((_, i) => (
            <li
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Testimonial ${i + 1}`}
              className={`testimonial-dot${i === current ? ' testimonial-dot--active' : ''}`}
            />
          ))}
        </ul>
      )}
    </section>
  );
}
