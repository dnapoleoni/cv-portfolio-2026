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
    id: 'tailwind',
    name: 'Tailwind',
    // Sky blue accent, clean and bright
    light: {
      bg: '#F8FAFC',
      bgElevated: '#F1F5F9',
      bgHover: '#E2E8F0',
      text: '#0F172A',
      textSecondary: '#334155',
      textTertiary: '#546580',
      accent: '#0284C7',
      accentHover: '#0369A1',
      border: '#CBD5E1',
      borderSubtle: '#E2E8F0',
    },
    dark: {
      bg: '#0F172A',
      bgElevated: '#1E293B',
      bgHover: '#283548',
      text: '#F1F5F9',
      textSecondary: '#94A3B8',
      textTertiary: '#7B8DA4',
      accent: '#38BDF8',
      accentHover: '#5CCBFA',
      border: '#2D3E56',
      borderSubtle: '#1E2D42',
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

  {
    id: 'raycast',
    name: 'Raycast',
    // Purple-pink, vibrant and developer-loved
    light: {
      bg: '#FAF8FC',
      bgElevated: '#F2EEF6',
      bgHover: '#E8E2EE',
      text: '#1C1428',
      textSecondary: '#443660',
      textTertiary: '#685888',
      accent: '#B84ACF',
      accentHover: '#9C3AB0',
      border: '#D4C8E0',
      borderSubtle: '#E4DAEA',
    },
    dark: {
      bg: '#14101A',
      bgElevated: '#1E1826',
      bgHover: '#2C2438',
      text: '#F0E8F6',
      textSecondary: '#B8A8D0',
      textTertiary: '#9484B0',
      accent: '#D174E8',
      accentHover: '#DC94F0',
      border: '#342A44',
      borderSubtle: '#261E32',
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
    id: 'coral',
    name: 'Vibrant Coral',
    // Lively coral-pink accent
    light: {
      bg: '#FFFAF8',
      bgElevated: '#FFF0EB',
      bgHover: '#FFE4DC',
      text: '#2A1610',
      textSecondary: '#5C3830',
      textTertiary: '#7E5A52',
      accent: '#D4532F',
      accentHover: '#B84426',
      border: '#E0C8C0',
      borderSubtle: '#EEDCD6',
    },
    dark: {
      bg: '#1A100E',
      bgElevated: '#241816',
      bgHover: '#322420',
      text: '#F8E8E4',
      textSecondary: '#C8A098',
      textTertiary: '#A88078',
      accent: '#FF785A',
      accentHover: '#FF9478',
      border: '#3E2A26',
      borderSubtle: '#2C1E1A',
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
    id: 'tangerine',
    name: 'Tangerine Dream',
    // Warm orange, bold and energetic
    light: {
      bg: '#FFFAF6',
      bgElevated: '#FFF2E8',
      bgHover: '#FFE6D6',
      text: '#2A1C10',
      textSecondary: '#5C4430',
      textTertiary: '#7E6452',
      accent: '#C86030',
      accentHover: '#A84E26',
      border: '#E0CCBA',
      borderSubtle: '#EEDCCE',
    },
    dark: {
      bg: '#1A1210',
      bgElevated: '#241A14',
      bgHover: '#32261E',
      text: '#F8EAE0',
      textSecondary: '#C8A890',
      textTertiary: '#A88870',
      accent: '#FAAA8D',
      accentHover: '#FFBEA6',
      border: '#3E2C22',
      borderSubtle: '#2C201A',
    },
  },
];

export const defaultThemeId = 'notion';
