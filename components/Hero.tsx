export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <p className="hero-greeting">Hi, I'm Dan.</p>
      <h1 id="hero-heading" className="hero-tagline">
        <span className="tagline-developer">A developer</span>{' '}
        <span className="tagline-designer">who thinks like a designer</span>{' '}
        <span className="tagline-human">and communicates like a human.</span>
      </h1>
      <p className="hero-sub">
        15+ years building for the web across Australia's best agencies and product teams.
        React, TypeScript, Vue.js — and a whole lot more.
      </p>
    </section>
  )
}
