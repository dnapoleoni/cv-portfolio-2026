export interface ThemeColors {
  bg: string;
  bgElevated: string;
  bgHover: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  accent: string;
  accentHover: string;
  border: string;
  borderSubtle: string;
}

export interface Theme {
  id: string;
  name: string;
  light: ThemeColors;
  dark: ThemeColors;
}

/**
 * All themes are AAA compliant:
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
    id: 'claude',
    name: 'Claude',
    // Inspired by claude.ai — warm beige, terracotta accent
    light: {
      bg: '#F5F3EF',
      bgElevated: '#ECEAE4',
      bgHover: '#E2E0D9',
      text: '#1C1B18',
      textSecondary: '#4A4840',
      textTertiary: '#5C5A50',
      accent: '#B05A30',
      accentHover: '#8E4725',
      border: '#C8C5BC',
      borderSubtle: '#DBD9D2',
    },
    dark: {
      bg: '#161514',
      bgElevated: '#201F1D',
      bgHover: '#2C2B28',
      text: '#EDECE8',
      textSecondary: '#B0AEA6',
      textTertiary: '#908E86',
      accent: '#D4845E',
      accentHover: '#E0956F',
      border: '#333230',
      borderSubtle: '#272624',
    },
  },
  {
    id: 'github',
    name: 'GitHub',
    // Inspired by github.com — clean white, blue accents, dark mode signature
    light: {
      bg: '#FFFFFF',
      bgElevated: '#F6F8FA',
      bgHover: '#EBEEF1',
      text: '#1F2328',
      textSecondary: '#424A53',
      textTertiary: '#59636E',
      accent: '#0969DA',
      accentHover: '#0550AE',
      border: '#D0D7DE',
      borderSubtle: '#E3E8ED',
    },
    dark: {
      bg: '#0D1117',
      bgElevated: '#161B22',
      bgHover: '#21262D',
      text: '#E6EDF3',
      textSecondary: '#A8B5C4',
      textTertiary: '#8B949E',
      accent: '#58A6FF',
      accentHover: '#79B8FF',
      border: '#30363D',
      borderSubtle: '#21262D',
    },
  },
  {
    id: 'linear',
    name: 'Linear',
    // Inspired by linear.app — crisp, purple/violet accents
    light: {
      bg: '#FBFBFC',
      bgElevated: '#F2F2F5',
      bgHover: '#E8E8ED',
      text: '#171721',
      textSecondary: '#42425A',
      textTertiary: '#5A5A72',
      accent: '#5E6AD2',
      accentHover: '#4850B8',
      border: '#CDCDD6',
      borderSubtle: '#DFDFE6',
    },
    dark: {
      bg: '#101012',
      bgElevated: '#1A1A1F',
      bgHover: '#252530',
      text: '#EEEEF0',
      textSecondary: '#A8A8B8',
      textTertiary: '#8888A0',
      accent: '#8B8FE8',
      accentHover: '#A0A4F0',
      border: '#2E2E3A',
      borderSubtle: '#222230',
    },
  },
  {
    id: 'vercel',
    name: 'Vercel',
    // Inspired by vercel.com — stark monochrome, pure black/white
    light: {
      bg: '#FFFFFF',
      bgElevated: '#FAFAFA',
      bgHover: '#F0F0F0',
      text: '#0A0A0A',
      textSecondary: '#3B3B3B',
      textTertiary: '#525252',
      accent: '#0A0A0A',
      accentHover: '#2E2E2E',
      border: '#E0E0E0',
      borderSubtle: '#EBEBEB',
    },
    dark: {
      bg: '#0A0A0A',
      bgElevated: '#141414',
      bgHover: '#1F1F1F',
      text: '#EDEDED',
      textSecondary: '#A1A1A1',
      textTertiary: '#888888',
      accent: '#EDEDED',
      accentHover: '#FFFFFF',
      border: '#2E2E2E',
      borderSubtle: '#1C1C1C',
    },
  },
  {
    id: 'stripe',
    name: 'Stripe',
    // Inspired by stripe.com — deep indigo, blue-purple tints
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
    // Inspired by spotify.com — dark-first, vibrant green accent
    light: {
      bg: '#F8F8F8',
      bgElevated: '#EFEFEF',
      bgHover: '#E4E4E4',
      text: '#121212',
      textSecondary: '#3E3E3E',
      textTertiary: '#555555',
      accent: '#1A7A3A',
      accentHover: '#14602E',
      border: '#D4D4D4',
      borderSubtle: '#E2E2E2',
    },
    dark: {
      bg: '#121212',
      bgElevated: '#1A1A1A',
      bgHover: '#252525',
      text: '#EEEEEE',
      textSecondary: '#A7A7A7',
      textTertiary: '#8A8A8A',
      accent: '#1DB954',
      accentHover: '#1ED760',
      border: '#2A2A2A',
      borderSubtle: '#1E1E1E',
    },
  },

  // =============================================
  // CUSTOM COLOUR THEMES
  // =============================================

  {
    id: 'desert',
    name: 'Desert Sand',
    // Base: #D7B49E — warm sandy neutrals
    light: {
      bg: '#FAF6F2',
      bgElevated: '#F0EAE3',
      bgHover: '#E6DED5',
      text: '#2A2118',
      textSecondary: '#554A3E',
      textTertiary: '#6B5F52',
      accent: '#A0673C',
      accentHover: '#845430',
      border: '#D0C6BA',
      borderSubtle: '#E0D8CE',
    },
    dark: {
      bg: '#181410',
      bgElevated: '#221E18',
      bgHover: '#2E2820',
      text: '#F0E8E0',
      textSecondary: '#BFB3A4',
      textTertiary: '#9A8E80',
      accent: '#D4A070',
      accentHover: '#E0B080',
      border: '#382F26',
      borderSubtle: '#2A241C',
    },
  },
  {
    id: 'coral',
    name: 'Vibrant Coral',
    // Base: #FF785A — vibrant warm coral
    light: {
      bg: '#FFFAF8',
      bgElevated: '#FFF0EC',
      bgHover: '#FFE4DD',
      text: '#1F1210',
      textSecondary: '#4D3A34',
      textTertiary: '#6B524A',
      accent: '#D4532F',
      accentHover: '#B84428',
      border: '#DCCCC6',
      borderSubtle: '#EAE0DC',
    },
    dark: {
      bg: '#170F0C',
      bgElevated: '#211714',
      bgHover: '#2E201A',
      text: '#F5E8E4',
      textSecondary: '#C4AAA0',
      textTertiary: '#A08880',
      accent: '#FF785A',
      accentHover: '#FF9478',
      border: '#3A2820',
      borderSubtle: '#2A1C16',
    },
  },
  {
    id: 'grape',
    name: 'Vintage Grape',
    // Base: #403D58 — deep moody purple
    light: {
      bg: '#F8F7FA',
      bgElevated: '#EEECF4',
      bgHover: '#E2E0EC',
      text: '#1C1A28',
      textSecondary: '#403D58',
      textTertiary: '#5A5672',
      accent: '#5B4F8A',
      accentHover: '#483F72',
      border: '#CAC8D6',
      borderSubtle: '#DCDAE6',
    },
    dark: {
      bg: '#100F16',
      bgElevated: '#1A1822',
      bgHover: '#252330',
      text: '#ECEAF2',
      textSecondary: '#AAA6C0',
      textTertiary: '#8884A0',
      accent: '#9088C8',
      accentHover: '#A8A0D8',
      border: '#302E40',
      borderSubtle: '#222030',
    },
  },
  {
    id: 'tangerine',
    name: 'Tangerine Dream',
    // Base: #FAAA8D — warm peachy orange
    light: {
      bg: '#FFFBF8',
      bgElevated: '#FFF2EC',
      bgHover: '#FFE8DE',
      text: '#221810',
      textSecondary: '#504038',
      textTertiary: '#685850',
      accent: '#C86030',
      accentHover: '#A84E28',
      border: '#D8CCC4',
      borderSubtle: '#E8DED6',
    },
    dark: {
      bg: '#181210',
      bgElevated: '#221A16',
      bgHover: '#2E2420',
      text: '#F4ECE6',
      textSecondary: '#C0AEA0',
      textTertiary: '#9E8C80',
      accent: '#FAAA8D',
      accentHover: '#FCBEA5',
      border: '#382E26',
      borderSubtle: '#2A221C',
    },
  },
  {
    id: 'seagrass',
    name: 'Sea Grass',
    // Base: #43AA8B — fresh green-teal
    light: {
      bg: '#F5FAF8',
      bgElevated: '#E8F4F0',
      bgHover: '#DCECE6',
      text: '#121E1A',
      textSecondary: '#354A42',
      textTertiary: '#4A6258',
      accent: '#2E8A6E',
      accentHover: '#246E58',
      border: '#BED4CA',
      borderSubtle: '#D2E4DC',
    },
    dark: {
      bg: '#0C1410',
      bgElevated: '#141E1A',
      bgHover: '#1E2C26',
      text: '#E4F0EA',
      textSecondary: '#9EBCAE',
      textTertiary: '#7EA094',
      accent: '#43AA8B',
      accentHover: '#58BCA0',
      border: '#243830',
      borderSubtle: '#1A2A22',
    },
  },
  {
    id: 'blush',
    name: 'Baby Pink',
    // Base: #FFADC6 — soft pink
    light: {
      bg: '#FFFAFC',
      bgElevated: '#FFF0F5',
      bgHover: '#FFE4EC',
      text: '#201018',
      textSecondary: '#4E3642',
      textTertiary: '#684A5A',
      accent: '#C45080',
      accentHover: '#A84068',
      border: '#DCCAD2',
      borderSubtle: '#EADCE2',
    },
    dark: {
      bg: '#180C12',
      bgElevated: '#22141A',
      bgHover: '#301E28',
      text: '#F6E8F0',
      textSecondary: '#C4A0B2',
      textTertiary: '#A08094',
      accent: '#F088AE',
      accentHover: '#F4A0C0',
      border: '#3A242E',
      borderSubtle: '#2A1A22',
    },
  },
];

export const defaultThemeId = 'claude';

export function getThemeById(id: string): Theme {
  return themes.find((t) => t.id === id) ?? themes[0];
}
