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
 */

import {
  validateRegistration,
  validateLogin,
  validateMealEntry,
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
