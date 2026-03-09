'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import { themes, defaultThemeId, getThemeById, type Theme } from '@/data/themes'

type Mode = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  mode: Mode
  setThemeId: (id: string) => void
  setMode: (mode: Mode) => void
  toggleMode: () => void
  cycleTheme: () => void
}

const defaultContext: ThemeContextValue = {
  theme: getThemeById(defaultThemeId),
  mode: 'light',
  setThemeId: () => {},
  setMode: () => {},
  toggleMode: () => {},
  cycleTheme: () => {},
}

const ThemeContext = createContext<ThemeContextValue>(defaultContext)

export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext)
}

function applyTheme(theme: Theme, mode: Mode) {
  const colors = mode === 'dark' ? theme.dark : theme.light
  const root = document.documentElement

  root.setAttribute('data-theme', theme.id)
  root.setAttribute('data-mode', mode)

  root.style.setProperty('--color-bg', colors.bg)
  root.style.setProperty('--color-bg-elevated', colors.bgElevated)
  root.style.setProperty('--color-bg-hover', colors.bgHover)
  root.style.setProperty('--color-text', colors.text)
  root.style.setProperty('--color-text-secondary', colors.textSecondary)
  root.style.setProperty('--color-text-tertiary', colors.textTertiary)
  root.style.setProperty('--color-accent', colors.accent)
  root.style.setProperty('--color-accent-hover', colors.accentHover)
  root.style.setProperty('--color-border', colors.border)
  root.style.setProperty('--color-border-subtle', colors.borderSubtle)
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState(defaultThemeId)
  const [mode, setModeState] = useState<Mode>('light')
  const [mounted, setMounted] = useState(false)

  // Initialize from localStorage and system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('dn-theme')
    const storedMode = localStorage.getItem('dn-mode') as Mode | null

    const initialTheme = storedTheme && themes.some(t => t.id === storedTheme)
      ? storedTheme
      : defaultThemeId

    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialMode = storedMode ?? (systemDark ? 'dark' : 'light')

    setThemeIdState(initialTheme)
    setModeState(initialMode)
    applyTheme(getThemeById(initialTheme), initialMode)
    setMounted(true)

    // Listen for system preference changes (only if user hasn't manually set)
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('dn-mode')) {
        const newMode = e.matches ? 'dark' : 'light'
        setModeState(newMode)
        applyTheme(getThemeById(initialTheme), newMode)
      }
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const theme = getThemeById(themeId)

  const setThemeId = useCallback((id: string) => {
    setThemeIdState(id)
    localStorage.setItem('dn-theme', id)
    applyTheme(getThemeById(id), mode)
  }, [mode])

  const setMode = useCallback((m: Mode) => {
    setModeState(m)
    localStorage.setItem('dn-mode', m)
    applyTheme(theme, m)
  }, [theme])

  const toggleMode = useCallback(() => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
  }, [mode, setMode])

  const cycleTheme = useCallback(() => {
    const idx = themes.findIndex(t => t.id === themeId)
    const next = themes[(idx + 1) % themes.length]
    setThemeId(next.id)
  }, [themeId, setThemeId])

  // Prevent flash of wrong theme
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>
  }

  return (
    <ThemeContext.Provider value={{ theme, mode, setThemeId, setMode, toggleMode, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
