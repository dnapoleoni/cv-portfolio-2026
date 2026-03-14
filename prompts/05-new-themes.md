# New Themes — Tech-Inspired + Custom Colour Palettes

Replace the current 6 themes with 12 new ones. The existing themes are too tame. Generate a complete replacement `data/themes.ts` file.

---

## Theme Requirements

- Every theme must have both light and dark mode variants
- All must be WCAG AAA compliant: 7:1 contrast for normal text, 4.5:1 for large text
- `textTertiary` must maintain at least 4.5:1 contrast (large text only usage)
- Accent colours should be adjusted per mode (lighter in dark mode for contrast)
- Follow the existing theme data structure and CSS custom property names

---

## Tech-Inspired Themes (6)

Generate themes inspired by these well-known tech products. Developers visiting the site should recognise the colour palettes:

1. **Claude** — Anthropic's warm beige and terracotta aesthetic
2. **GitHub** — clean white/dark with blue accents
3. **Linear** — crisp with purple/violet accents
4. **Vercel** — stark monochrome black/white
5. **Stripe** — deep indigo, blue-purple tints
6. **Spotify** — dark-first with vibrant green accent

---

## Custom Colour Themes (6)

Generate themes built around these specific hero colours. Skip any that can't hit AAA compliance:

- Desert Sand: `#D7B49E` — warm sandy neutrals, burnt umber accent
- Vibrant Coral: `#FF785A` — warm orange-red
- Vintage Grape: `#403D58` — deep moody purple
- Tangerine Dream: `#FAAA8D` — peachy warm orange
- Sea Grass: `#43AA8B` — fresh green-teal
- Baby Pink: `#FFADC6` — soft pink accent

### Colours to skip
- Vanilla Custard (`#F2F3AE`) — yellow accent can't hit 7:1 against light backgrounds
- Banana Cream (`#FFF05A`) — same issue, looks washed out or muddy brown at AAA compliance

---

## Output

Replace the entire `data/themes.ts` file with the new 12-theme set. Maintain the existing `Theme` interface and export structure so the ThemePicker and ThemeProvider components continue to work without changes.

---

## Summary of files to change
- `data/themes.ts` — complete replacement with 12 themes
