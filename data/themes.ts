import type { Theme } from '@/types';

/**
 * 12 themes — AAA target (will be audited with WAVE):
 * - Normal text (< 18pt): 7:1 contrast ratio against bg
 * - Large text (>= 18pt / 14pt bold): 4.5:1 against bg
 * - textTertiary is used ONLY for large text or decorative elements (4.5:1 min)
 * - textSecondary targets 7:1
 * - text (primary) targets 10:1+
 */
export const themes: Theme[] = [
  // =============================================
  // TECH-INSPIRED THEMES
  // =============================================

  {
    id: 'notion',
    name: 'Notion',
    // Warm off-white with brown/sepia accent — the default
    light: {
      bg: '#FFFFFF',
      bgElevated: '#F7F6F3',
      bgHover: '#EDECE9',
      text: '#37352F',
      textSecondary: '#5A5650',
      textTertiary: '#787572',
      accent: '#9B6B47',
      accentHover: '#7D5638',
      border: '#D3D1CB',
      borderSubtle: '#E4E2DC',
    },
    dark: {
      bg: '#191919',
      bgElevated: '#202020',
      bgHover: '#2C2C2C',
      text: '#E8E5E0',
      textSecondary: '#B8B4AE',
      textTertiary: '#9A9690',
      accent: '#C49A78',
      accentHover: '#D4AE90',
      border: '#383633',
      borderSubtle: '#2A2926',
    },
  },

  {
    id: 'figma',
    name: 'Figma',
    // Warm red-coral accent inspired by Figma's brand
    light: {
      bg: '#FFFFFF',
      bgElevated: '#F5F5F5',
      bgHover: '#EBEBEB',
      text: '#1E1E1E',
      textSecondary: '#444444',
      textTertiary: '#666666',
      accent: '#C4382A',
      accentHover: '#A42D22',
      border: '#CFCFCF',
      borderSubtle: '#E0E0E0',
    },
    dark: {
      bg: '#1E1E1E',
      bgElevated: '#2C2C2C',
      bgHover: '#383838',
      text: '#F0F0F0',
      textSecondary: '#B3B3B3',
      textTertiary: '#8C8C8C',
      accent: '#F06B5E',
      accentHover: '#F48A80',
      border: '#444444',
      borderSubtle: '#333333',
    },
  },

  {
    id: 'supabase',
    name: 'Supabase',
    // Deep emerald green on dark, rich green accent
    light: {
      bg: '#F8FAF8',
      bgElevated: '#EFF3EF',
      bgHover: '#E2E8E2',
      text: '#171E17',
      textSecondary: '#3B4A3B',
      textTertiary: '#5C6E5C',
      accent: '#24804E',
      accentHover: '#1C6640',
      border: '#C4D1C4',
      borderSubtle: '#D8E2D8',
    },
    dark: {
      bg: '#111311',
      bgElevated: '#1A1D1A',
      bgHover: '#252A25',
      text: '#E4EBE4',
      textSecondary: '#A6B8A6',
      textTertiary: '#829882',
      accent: '#3ECF8E',
      accentHover: '#5DDBA4',
      border: '#2C342C',
      borderSubtle: '#202620',
    },
  },

  {
    id: 'stripe',
    name: 'Stripe',
    // Deep indigo, blue-purple tints
    light: {
      bg: '#F6F9FC',
      bgElevated: '#ECF0F5',
      bgHover: '#E0E6ED',
      text: '#1A1F36',
      textSecondary: '#3C4257',
      textTertiary: '#516180',
      accent: '#635BFF',
      accentHover: '#5046E4',
      border: '#C8CFD8',
      borderSubtle: '#DCE1E8',
    },
    dark: {
      bg: '#0A0E1A',
      bgElevated: '#141926',
      bgHover: '#1E2538',
      text: '#E3E8F0',
      textSecondary: '#A3ADC2',
      textTertiary: '#8490A8',
      accent: '#7A73FF',
      accentHover: '#9B95FF',
      border: '#283048',
      borderSubtle: '#1C2236',
    },
  },

  {
    id: 'spotify',
    name: 'Spotify',
    // Bright green on dark, muted green on light
    light: {
      bg: '#F8F8F6',
      bgElevated: '#EFEEE8',
      bgHover: '#E4E2DA',
      text: '#191916',
      textSecondary: '#3E3E34',
      textTertiary: '#626256',
      accent: '#1A7A3A',
      accentHover: '#15632F',
      border: '#CAC8BE',
      borderSubtle: '#DCD9D2',
    },
    dark: {
      bg: '#121212',
      bgElevated: '#1A1A1A',
      bgHover: '#282828',
      text: '#F0F0E8',
      textSecondary: '#B3B3A6',
      textTertiary: '#8A8A7E',
      accent: '#1DB954',
      accentHover: '#1ED760',
      border: '#333330',
      borderSubtle: '#242422',
    },
  },

  {
    id: 'arc',
    name: 'Arc',
    // Periwinkle/lavender blue — fresh and modern
    light: {
      bg: '#F8F8FC',
      bgElevated: '#F0F0F8',
      bgHover: '#E4E4F0',
      text: '#1A1A2E',
      textSecondary: '#3D3D5C',
      textTertiary: '#60608A',
      accent: '#5B5FC7',
      accentHover: '#484CB0',
      border: '#CDCDE0',
      borderSubtle: '#DDDDE8',
    },
    dark: {
      bg: '#12121E',
      bgElevated: '#1A1A2A',
      bgHover: '#262638',
      text: '#E8E8F4',
      textSecondary: '#A8A8C8',
      textTertiary: '#8686AA',
      accent: '#8B8FE8',
      accentHover: '#A4A8F0',
      border: '#2E2E48',
      borderSubtle: '#222236',
    },
  },

  // =============================================
  // COLOUR THEMES
  // =============================================

  {
    id: 'rust',
    name: 'Rust',
    // Deep orange-brown, earthy and warm
    light: {
      bg: '#FAF7F5',
      bgElevated: '#F2EDEA',
      bgHover: '#E8E0DC',
      text: '#2A1E18',
      textSecondary: '#52443A',
      textTertiary: '#766458',
      accent: '#A44A20',
      accentHover: '#883C1A',
      border: '#D4C8C0',
      borderSubtle: '#E4DAD4',
    },
    dark: {
      bg: '#181210',
      bgElevated: '#221A16',
      bgHover: '#302420',
      text: '#F2E8E0',
      textSecondary: '#C0A898',
      textTertiary: '#9A8474',
      accent: '#D4734A',
      accentHover: '#E08A64',
      border: '#3A2C24',
      borderSubtle: '#2A201A',
    },
  },

  {
    id: 'grape',
    name: 'Vintage Grape',
    // Deep purple with a warm undertone
    light: {
      bg: '#F9F7FC',
      bgElevated: '#F0ECF6',
      bgHover: '#E4DEEE',
      text: '#1E1828',
      textSecondary: '#403454',
      textTertiary: '#625478',
      accent: '#5B4F8A',
      accentHover: '#4A4074',
      border: '#CEC4D8',
      borderSubtle: '#DED6E6',
    },
    dark: {
      bg: '#12101A',
      bgElevated: '#1C1826',
      bgHover: '#282238',
      text: '#ECE6F4',
      textSecondary: '#B0A4C6',
      textTertiary: '#8E82A8',
      accent: '#9088C8',
      accentHover: '#A8A0DA',
      border: '#302842',
      borderSubtle: '#221E30',
    },
  },

  {
    id: 'linear',
    name: 'Linear',
    // Deep blue accent — clean developer aesthetic
    light: {
      bg: '#F8FAFC',
      bgElevated: '#EFF4F8',
      bgHover: '#E2EBF2',
      text: '#0F172A',
      textSecondary: '#334155',
      textTertiary: '#5A6A7E',
      accent: '#2563EB',
      accentHover: '#1D4FCC',
      border: '#CBD5E1',
      borderSubtle: '#E2E8F0',
    },
    dark: {
      bg: '#0F172A',
      bgElevated: '#1E293B',
      bgHover: '#273449',
      text: '#F1F5F9',
      textSecondary: '#94A3B8',
      textTertiary: '#6B7B94',
      accent: '#60A5FA',
      accentHover: '#7BB8FB',
      border: '#2D3B50',
      borderSubtle: '#1E293B',
    },
  },

  {
    id: 'plum',
    name: 'Plum',
    // Deep magenta-purple accent
    light: {
      bg: '#FAFAFA',
      bgElevated: '#F3EFF5',
      bgHover: '#E9E3ED',
      text: '#1A1523',
      textSecondary: '#433C4E',
      textTertiary: '#695F76',
      accent: '#86198F',
      accentHover: '#6B1475',
      border: '#D4CEDB',
      borderSubtle: '#E2DEE8',
    },
    dark: {
      bg: '#141118',
      bgElevated: '#1D1923',
      bgHover: '#2A2533',
      text: '#EDEAF0',
      textSecondary: '#B0AAB8',
      textTertiary: '#877F95',
      accent: '#E879F9',
      accentHover: '#ED94FA',
      border: '#322D3C',
      borderSubtle: '#231F2C',
    },
  },

  {
    id: 'ember',
    name: 'Ember',
    // Deep red-orange accent
    light: {
      bg: '#FFFAF9',
      bgElevated: '#FFF1EE',
      bgHover: '#FFE5E0',
      text: '#231515',
      textSecondary: '#4E3838',
      textTertiary: '#735858',
      accent: '#B91C1C',
      accentHover: '#991B1B',
      border: '#DCCECE',
      borderSubtle: '#EAE0E0',
    },
    dark: {
      bg: '#1A1212',
      bgElevated: '#221818',
      bgHover: '#302222',
      text: '#F0E6E5',
      textSecondary: '#B5A4A2',
      textTertiary: '#8E7A78',
      accent: '#FCA5A5',
      accentHover: '#FDB8B8',
      border: '#3A2C2C',
      borderSubtle: '#282020',
    },
  },

  {
    id: 'crimson-gold',
    name: 'Crimson & Gold',
    // Crimson in light mode, warm gold in dark — a deliberate transformation
    light: {
      bg: '#FDFCF9',
      bgElevated: '#F5F3ED',
      bgHover: '#EBE8E0',
      text: '#1C1814',
      textSecondary: '#443E36',
      textTertiary: '#6A6258',
      accent: '#991B1B',
      accentHover: '#7F1616',
      border: '#D4CFC6',
      borderSubtle: '#E2DED6',
    },
    dark: {
      bg: '#1A1714',
      bgElevated: '#22201A',
      bgHover: '#2E2C24',
      text: '#EDE9E2',
      textSecondary: '#B0AA9E',
      textTertiary: '#8A8478',
      accent: '#FBD38D',
      accentHover: '#FCDC9F',
      border: '#34302A',
      borderSubtle: '#272420',
    },
  },
];

export const defaultThemeId = 'notion';
