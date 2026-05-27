/**
 * src/constants/typography.ts
 *
 * Typography tokens sourced from docs/ui/colour_palette.png.
 *
 * Fonts:
 *   - Headlines → Space Grotesk Bold  (loaded via @expo-google-fonts in a later phase)
 *   - Body/Labels → Inter             (loaded via @expo-google-fonts in a later phase)
 *
 * Until fonts are loaded the system default bold/regular fonts are used as fallbacks.
 * The font family constants are referenced here so every component automatically
 * picks up the real fonts once they are installed.
 */
export const FontFamily = {
  /** Space Grotesk Bold — all large screen titles (RESTAURANTS, LOGIN, ADD MEAL…) */
  headline: 'SpaceGrotesk_700Bold',

  /** Inter Regular — body text, descriptions, addresses */
  body: 'Inter_400Regular',

  /** Inter Medium — secondary labels, tab bar labels */
  medium: 'Inter_500Medium',

  /** Inter Bold — form field labels, small-caps section labels */
  bold: 'Inter_700Bold',
} as const;

export const FontSize = {
  /** Large screen title (RESTAURANTS, ADD MEAL…) — matches mockup hero text */
  screenTitle: 40,

  /** Restaurant name on cards, date in MealDetail */
  cardTitle: 20,

  /** Section headings: MENU, LAST MEALS, ITEMIZED BREAKDOWN */
  sectionTitle: 16,

  /** Small-caps field labels: USERNAME, DATE_RECORD, AVG_SCORE */
  label: 11,

  /** General body copy: descriptions, addresses */
  body: 14,

  /** Hero score number in MealDetail (3.3, 2.0) */
  scoreHero: 48,

  /** Score in MealsList cards */
  scoreMedium: 32,

  /** Score in menu rows and badges */
  scoreSmall: 16,
} as const;
