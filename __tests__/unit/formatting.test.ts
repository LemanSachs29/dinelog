/**
 * __tests__/unit/formatting.test.ts
 *
 * Unit tests for src/utils/formatting.ts
 *
 * Test plan coverage:
 *   FMT-01  formatScore(null) → 'N/A'
 *   FMT-02  formatScore(number) → one decimal place string
 *   FMT-03  formatDateLong → 'MONTH DD, YYYY' uppercase
 *   FMT-04  formatTime24to12 → 12-hour format with AM/PM
 *   FMT-05  generateId → non-empty unique string
 */

import {
  formatScore,
  formatDateLong,
  formatDateShort,
  formatTime24to12,
  generateId,
} from '../../src/utils/formatting';

// FMT-01
it('formatScore returns "N/A" when the score is null', () => {
  expect(formatScore(null)).toBe('N/A');
});

// FMT-02
it('formatScore returns a string with exactly one decimal place', () => {
  expect(formatScore(4.8)).toBe('4.8');
  expect(formatScore(4.0)).toBe('4.0');
  expect(formatScore(3)).toBe('3.0');
});

// FMT-03
it('formatDateLong converts YYYY-MM-DD to "MONTH D, YYYY" format', () => {
  expect(formatDateLong('2026-05-27')).toBe('MAY 27, 2026');
  expect(formatDateLong('2023-10-24')).toBe('OCTOBER 24, 2023');
});

// FMT-04
it('formatTime24to12 converts 24-hour time to 12-hour AM/PM format', () => {
  expect(formatTime24to12('13:30')).toBe('01:30 PM');
  expect(formatTime24to12('09:05')).toBe('09:05 AM');
  expect(formatTime24to12('00:00')).toBe('12:00 AM');
  expect(formatTime24to12('12:00')).toBe('12:00 PM');
});

// FMT-05
it('generateId returns a non-empty string that differs between calls', () => {
  const id1 = generateId();
  const id2 = generateId();
  expect(typeof id1).toBe('string');
  expect(id1.length).toBeGreaterThan(0);
  expect(id1).not.toBe(id2);
});
