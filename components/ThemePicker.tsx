'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { themes } from '@/data/themes';

export function ThemePicker() {
  const { theme, mode, setThemeId } = useTheme();
  const [open, setOpen] = useState(false);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Close on escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  const currentAccent = mode === 'dark' ? theme.dark.accent : theme.light.accent;
  const displayName = hoveredName ?? theme.name;

  return (
    <div className="theme-picker" ref={pickerRef}>
      {open && <span className="theme-picker-label">{displayName}</span>}
      <button
        onClick={() => setOpen(!open)}
        className="theme-picker-btn"
        aria-label="Choose color theme"
        aria-expanded={open}
      >
        <span className="theme-picker-swatch" style={{ backgroundColor: currentAccent }} />
      </button>

      {open && (
        <div
          className="theme-picker-grid"
          role="listbox"
          aria-label="Color themes"
          onMouseLeave={() => setHoveredName(null)}
        >
          {themes.map((t) => {
            const swatchColor = mode === 'dark' ? t.dark.accent : t.light.accent;
            const isActive = t.id === theme.id;
            return (
              <button
                key={t.id}
                role="option"
                aria-selected={isActive}
                aria-label={t.name}
                className={`theme-picker-option${isActive ? ' theme-picker-option--active' : ''}`}
                style={{ backgroundColor: swatchColor }}
                onMouseEnter={() => setHoveredName(t.name)}
                onClick={() => {
                  setThemeId(t.id);
                  setHoveredName(null);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
