/**
 * src/utils/validation.ts
 *
 * Pure validation functions — no side effects, no I/O, no React.
 * All functions return a result object so the caller decides how to display errors.
 *
 * Test coverage: tests/unit/validation.test.ts
 */

import type { MealItemRating } from '../types';

// ─── Registration ─────────────────────────────────────────────────────────────

export type RegistrationErrors = {
  fullName?: string;
  username?: string;
  password?: string;
};

export type RegistrationResult = {
  valid: boolean;
  errors: RegistrationErrors;
};

/**
 * Validates the registration form fields.
 *
 * Rules:
 *  - fullName:  required, 2+ characters after trimming
 *  - username:  required, 3+ characters, no spaces, letters/digits/underscore only
 *  - password:  required, 6+ characters
 */
export function validateRegistration(fields: {
  fullName: string;
  username: string;
  password: string;
}): RegistrationResult {
  const errors: RegistrationErrors = {};

  const fullName = fields.fullName.trim();
  if (fullName.length === 0) {
    errors.fullName = 'Full name is required.';
  } else if (fullName.length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.';
  }

  const username = fields.username.trim();
  if (username.length === 0) {
    errors.username = 'Username is required.';
  } else if (username.length < 3) {
    errors.username = 'Username must be at least 3 characters.';
  } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.username = 'Username may only contain letters, digits, and underscores.';
  }

  if (fields.password.length === 0) {
    errors.password = 'Password is required.';
  } else if (fields.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

// ─── Login ────────────────────────────────────────────────────────────────────

export type LoginErrors = {
  username?: string;
  password?: string;
};

export type LoginResult = {
  valid: boolean;
  errors: LoginErrors;
};

/**
 * Validates that both login fields are filled in before making a storage call.
 * Credential correctness is checked separately in AuthContext.
 */
export function validateLogin(fields: {
  username: string;
  password: string;
}): LoginResult {
  const errors: LoginErrors = {};

  if (fields.username.trim().length === 0) {
    errors.username = 'Username is required.';
  }

  if (fields.password.length === 0) {
    errors.password = 'Password is required.';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

// ─── Meal Entry ───────────────────────────────────────────────────────────────

export type MealEntryResult = {
  valid: boolean;
  errors: string[];
};

/**
 * Validates a meal draft before passing it to the confirmation screen.
 *
 * Rules:
 *  - At least one item must be selected.
 *  - Every selected item must have both flavourScore and priceScore in range 1–5.
 */
export function validateMealEntry(draft: { items: MealItemRating[] }): MealEntryResult {
  const errors: string[] = [];

  if (draft.items.length === 0) {
    errors.push('Please select at least one menu item.');
    return { valid: false, errors };
  }

  for (const item of draft.items) {
    if (!isScoreInRange(item.flavourScore)) {
      errors.push(`Flavour score for item ${item.menuItemId} must be between 1 and 5.`);
    }
    if (!isScoreInRange(item.priceScore)) {
      errors.push(`Price score for item ${item.menuItemId} must be between 1 and 5.`);
    }
  }

  return { valid: errors.length === 0, errors };
}

// ─── Score Range ──────────────────────────────────────────────────────────────

/**
 * Returns true if the score is an integer in the range 1–5 (inclusive).
 */
export function isScoreInRange(score: number): boolean {
  return Number.isInteger(score) && score >= 1 && score <= 5;
}
