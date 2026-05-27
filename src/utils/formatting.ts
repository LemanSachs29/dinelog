/**
 * src/utils/formatting.ts
 *
 * Pure formatting and ID-generation utilities — no side effects, no I/O, no React.
 * All date/time inputs are expected to be well-formed; callers should validate first.
 *
 * Date format assumed throughout the app: 'YYYY-MM-DD'
 * Time format assumed throughout the app: 'HH:MM' (24-hour)
 */

// ─── Constants ────────────────────────────────────────────────────────────────

const MONTH_LONG: readonly string[] = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
];

const MONTH_SHORT: readonly string[] = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
];

// ─── Date Formatters ──────────────────────────────────────────────────────────

/**
 * '2023-10-24' → 'OCTOBER 24, 2023'
 * Used in MealDetail and ConfirmMeal headers.
 */
export function formatDateLong(date: string): string {
  const [year, month, day] = date.split('-').map(Number);
  return `${MONTH_LONG[month - 1]} ${day}, ${year}`;
}

/**
 * '2023-10-24' → '2023.10.24'
 * Used in MealList card subtitles.
 */
export function formatDateShort(date: string): string {
  return date.replace(/-/g, '.');
}

/**
 * '2023-10-24' → { day: '24', month: 'OCT' }
 * Used by the DateBadge component in RestaurantDetail last-meals section.
 */
export function formatDateBadge(date: string): { day: string; month: string } {
  const [, month, day] = date.split('-').map(Number);
  return {
    day: String(day).padStart(2, '0'),
    month: MONTH_SHORT[month - 1],
  };
}

// ─── Time Formatter ───────────────────────────────────────────────────────────

/**
 * '19:42' → '07:42 PM'
 * '09:05' → '09:05 AM'
 * Used in MealDetail and ConfirmMeal.
 */
export function formatTime24to12(time: string): string {
  const [hoursStr, minutesStr] = time.split(':');
  const hours = Number(hoursStr);
  const minutes = minutesStr.padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${String(hours12).padStart(2, '0')}:${minutes} ${period}`;
}

// ─── Score Formatter ──────────────────────────────────────────────────────────

/**
 * 4.8  → '4.8'
 * 4.0  → '4.0'
 * null → 'N/A'
 *
 * Always displays one decimal place for consistency.
 */
export function formatScore(score: number | null): string {
  if (score === null) return 'N/A';
  return score.toFixed(1);
}

// ─── ID Generator ─────────────────────────────────────────────────────────────

/**
 * Generates a lightweight unique ID suitable for local storage.
 * Uses timestamp + random suffix — no external package required.
 *
 * Example: '1716825600000-k7f3x2a'
 */
export function generateId(): string {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).slice(2, 9);
  return `${timestamp}-${random}`;
}
