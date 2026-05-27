/**
 * src/constants/colors.ts
 *
 * Design-system colour tokens sourced from docs/ui/colour_palette.png.
 * Use these everywhere — never hardcode hex strings in component files.
 */
export const Colors = {
  /** #000000 — screen titles, primary buttons, active tab, selected states */
  primary: '#000000',

  /** #757575 — body text, secondary labels, muted descriptions */
  secondary: '#757575',

  /** #777777 — supporting / tertiary text */
  tertiary: '#777777',

  /** #F5F5F5 — card backgrounds, input fields, inactive buttons */
  neutral: '#F5F5F5',

  /** #FFFFFF — screen backgrounds, primary button labels */
  white: '#FFFFFF',

  /** #E0E0E0 — thin dividers and section borders */
  border: '#E0E0E0',
} as const;

export type ColorKey = keyof typeof Colors;
