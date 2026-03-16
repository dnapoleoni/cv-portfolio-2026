'use client';
import { DarkModeToggle } from '@/components/theme/DarkModeToggle';
import { ThemePicker } from '@/components/theme/ThemePicker';

export function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-content">
        <p className="footer-text">© {new Date().getFullYear()} · Dan Napoleoni</p>
        {/* Theme & Mode controls */}
        <div className="control-group">
          <ThemePicker />
          <DarkModeToggle />
        </div>
      </div>
    </footer>
  );
}
