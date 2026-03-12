'use client';
import { DarkModeToggle } from './DarkModeToggle';
import { ThemePicker } from './ThemePicker';

export function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-content">
        <p className="footer-text">
          © {new Date().getFullYear()} Dan Napoleoni · Melbourne, Australia
        </p>
        {/* Theme & Mode controls */}
        <div className="control-group">
          <ThemePicker />
          <DarkModeToggle />
        </div>
      </div>
    </footer>
  );
}
