'use client';

import { useState, useRef } from 'react';
import { useTheme } from '@/components/theme/ThemeProvider';
import { themes } from '@/data/themes';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useEscapeKey } from '@/hooks/useEscapeKey';

export function ThemePicker() {
  const { theme, mode, setThemeId } = useTheme();
  const [open, setOpen] = useState(false);
  const [hoveredName, setHoveredName] = useState<string | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  useClickOutside(pickerRef, () => setOpen(false), open);
  useEscapeKey(() => setOpen(false), open);

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
