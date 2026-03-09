export function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-content">
        <p className="footer-text">
          © {new Date().getFullYear()} Dan Napoleoni · Melbourne, Australia
        </p>
        <div className="footer-links">
          <a
            href="https://www.linkedin.com/in/daniel-napoleoni"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:hello@danielnapoleoni.dev">Email</a>
          <a
            href="https://github.com/dnapoleoni/cv-portfolio-2026"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
