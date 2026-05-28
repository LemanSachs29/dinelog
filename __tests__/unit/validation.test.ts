/**
 * __tests__/unit/validation.test.ts
 *
 * Unit tests for src/utils/validation.ts
 *
 * Test plan coverage:
 *   REG-01  valid registration  — all fields valid → no errors
 *   REG-02  missing full name   — too short → specific error
 *   REG-03  missing username    — too short → specific error
 *   REG-04  missing password    — too short → specific error
 *   REG-05  empty form          — all blank → errors for all three fields
 *   LOG-01  valid login         — both fields present → no errors
 *   LOG-02  empty login         — both fields blank → errors
 *   MEAL-01 no items selected   — empty array → not-enough-items error
 *   MEAL-02 missing scores      — score = 0 → out-of-range error
 *   MEAL-03 score out of range  — score = 6 → out-of-range error
 *   DATE-01 valid date          — '2026-06-09' → true
 *   DATE-02 invalid format      — 'abcd-ef-gh' → false
 *   DATE-03 impossible month    — '2026-99-01' and '2026-00-10' → false
 *   DATE-04 impossible day      — '2026-02-31' → false
 *   DATE-05 leap-year day       — '2024-02-29' → true, '2025-02-29' → false
 *   TIME-01 valid time          — '13:45' and '00:00' and '23:59' → true
 *   TIME-02 hour out of range   — '24:00' and '25:00' → false
 *   TIME-03 minute out of range — '12:60' → false
 *   TIME-04 invalid format      — 'ab:cd' → false
 */

import {
  validateRegistration,
  validateLogin,
  validateMealEntry,
  isValidDate,
  isValidTime,
} from '../../src/utils/validation';

// ── Registration ──────────────────────────────────────────────────────────────

describe('validateRegistration', () => {
  // REG-01
  it('returns valid=true and no errors when all fields are correct', () => {
    const result = validateRegistration({
      fullName: 'Jane Smith',
      username: 'jane_123',
      password: 'secret99',
    });
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  // REG-02
  it('returns an error for a full name that is a single character', () => {
    const result = validateRegistration({
      fullName: 'J',
      username: 'jane_123',
      password: 'secret99',
    });
    expect(result.valid).toBe(false);
    expect(result.errors.fullName).toBeDefined();
  });

  // REG-03
  it('returns an error for a username shorter than 3 characters', () => {
    const result = validateRegistration({
      fullName: 'Jane Smith',
      username: 'ab',
      password: 'secret99',
    });
    expect(result.valid).toBe(false);
    expect(result.errors.username).toBeDefined();
  });

  // REG-04
  it('returns an error for a password shorter than 6 characters', () => {
    const result = validateRegistration({
      fullName: 'Jane Smith',
      username: 'jane_123',
      password: '12345',
    });
    expect(result.valid).toBe(false);
    expect(result.errors.password).toBeDefined();
  });

  // REG-05
  it('returns errors for all three fields when the form is completely empty', () => {
    const result = validateRegistration({ fullName: '', username: '', password: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.fullName).toBeDefined();
    expect(result.errors.username).toBeDefined();
    expect(result.errors.password).toBeDefined();
  });
});

// ── Login ─────────────────────────────────────────────────────────────────────

describe('validateLogin', () => {
  // LOG-01
  it('returns valid=true when username and password are both provided', () => {
    const result = validateLogin({ username: 'jane_123', password: 'secret99' });
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  // LOG-02
  it('returns errors for both fields when the login form is completely empty', () => {
    const result = validateLogin({ username: '', password: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.username).toBeDefined();
    expect(result.errors.password).toBeDefined();
  });
});

// ── Meal entry ────────────────────────────────────────────────────────────────

describe('validateMealEntry', () => {
  // MEAL-01
  it('returns valid=false when no items are selected', () => {
    const result = validateMealEntry({ items: [] });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  // MEAL-02
  it('returns valid=false when a flavour score is 0 (below the minimum of 1)', () => {
    const result = validateMealEntry({
      items: [{ menuItemId: 'item-01', flavourScore: 0, priceScore: 3 }],
    });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  // MEAL-03
  it('returns valid=false when a price score is 6 (above the maximum of 5)', () => {
    const result = validateMealEntry({
      items: [{ menuItemId: 'item-01', flavourScore: 3, priceScore: 6 }],
    });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });
});

// ── isValidDate ───────────────────────────────────────────────────────────────

describe('isValidDate', () => {
  // DATE-01
  it('returns true for a valid calendar date', () => {
    expect(isValidDate('2026-06-09')).toBe(true);
  });

  // DATE-02
  it('returns false for a non-numeric format', () => {
    expect(isValidDate('abcd-ef-gh')).toBe(false);
  });

  // DATE-03
  it('returns false for an out-of-range month', () => {
    expect(isValidDate('2026-99-01')).toBe(false);
    expect(isValidDate('2026-00-10')).toBe(false);
  });

  // DATE-04
  it('returns false for an impossible day (e.g. Feb 31)', () => {
    expect(isValidDate('2026-02-31')).toBe(false);
  });

  // DATE-05
  it('handles leap years correctly', () => {
    expect(isValidDate('2024-02-29')).toBe(true);   // 2024 is a leap year
    expect(isValidDate('2025-02-29')).toBe(false);  // 2025 is not
  });
});

// ── isValidTime ───────────────────────────────────────────────────────────────

describe('isValidTime', () => {
  // TIME-01
  it('returns true for valid 24-hour times', () => {
    expect(isValidTime('13:45')).toBe(true);
    expect(isValidTime('00:00')).toBe(true);
    expect(isValidTime('23:59')).toBe(true);
  });

  // TIME-02
  it('returns false when the hour is out of range', () => {
    expect(isValidTime('24:00')).toBe(false);
    expect(isValidTime('25:00')).toBe(false);
  });

  // TIME-03
  it('returns false when the minute is out of range', () => {
    expect(isValidTime('12:60')).toBe(false);
  });

  // TIME-04
  it('returns false for non-numeric input', () => {
    expect(isValidTime('ab:cd')).toBe(false);
  });
});
