# Automated Testing Report

## 1. Introduction

This document presents the automated testing carried out for the DINE_LOG mobile application.

The purpose of this testing process was to validate the core application logic, data persistence behaviour, and UI component rendering through repeatable, automated test cases that can be executed independently of a physical device.

Automated testing focuses on isolated units of logic and individual components. It was used in combination with manual UI testing, which remained necessary to validate complete mobile interaction flows, navigation behaviour, and device-specific functionality such as biometric authentication.

All automated tests pass successfully.

---

## 2. Testing Environment

| Item              | Details                          |
| ----------------- | -------------------------------- |
| Application       | DINE_LOG                         |
| Platform          | Node.js (Jest runner)            |
| Testing Type      | Automated Unit and Component     |
| Test Framework    | Jest with jest-expo preset       |
| Component Testing | React Native Testing Library     |
| Language          | TypeScript                       |
| Test Runner       | `npm test`                       |
| Date              | May 2026                         |

---

## 3. Testing Strategy

The automated test suite is divided into two categories: unit tests and component tests.

**Unit tests** validate isolated logic functions independently of any UI or runtime environment. They target validation rules, calculation functions, data formatting utilities, and local storage operations.

**Component tests** validate the rendering output of individual React Native UI components. They confirm that components display the correct text and visual state in response to the props they receive.

No end-to-end testing framework is installed in this project. Complete user journey validation was carried out through structured manual UI testing, documented separately in `docs/manual-testing-report.md`.

---

## 4. Unit Tests

### 4.1 Validation — `__tests__/unit/validation.test.ts`

Tests the input validation functions defined in `src/utils/validation.ts`. These rules enforce field requirements for the registration form, login form, and meal entry form. Date and time format validation is also covered.

| # | Test ID | Scenario | Expected Result |
|---|---------|----------|-----------------|
| 1 | REG-01 | All registration fields are valid | `valid=true`, no errors returned |
| 2 | REG-02 | Full name is a single character | `valid=false`, `fullName` error returned |
| 3 | REG-03 | Username is shorter than 3 characters | `valid=false`, `username` error returned |
| 4 | REG-04 | Password is shorter than 6 characters | `valid=false`, `password` error returned |
| 5 | REG-05 | All registration fields are empty | `valid=false`, errors for all three fields |
| 6 | LOG-01 | Username and password are both provided | `valid=true`, no errors returned |
| 7 | LOG-02 | Username and password are both empty | `valid=false`, errors for both fields |
| 8 | MEAL-01 | No menu items selected | `valid=false`, item selection error returned |
| 9 | MEAL-02 | Flavour score is 0 (below minimum of 1) | `valid=false`, out-of-range error returned |
| 10 | MEAL-03 | Price score is 6 (above maximum of 5) | `valid=false`, out-of-range error returned |
| 11 | DATE-01 | Valid calendar date string | Returns `true` |
| 12 | DATE-02 | Non-numeric date format | Returns `false` |
| 13 | DATE-03 | Out-of-range month (e.g. month 99 or 00) | Returns `false` |
| 14 | DATE-04 | Impossible day (e.g. February 31) | Returns `false` |
| 15 | DATE-05 | Leap year edge cases (2024-02-29 valid, 2025-02-29 invalid) | Returns expected boolean |
| 16 | TIME-01 | Valid 24-hour times (13:45, 00:00, 23:59) | Returns `true` |
| 17 | TIME-02 | Hour out of range (24:00, 25:00) | Returns `false` |
| 18 | TIME-03 | Minute out of range (12:60) | Returns `false` |
| 19 | TIME-04 | Non-numeric time input | Returns `false` |

**Tests in this file: 19**

---

### 4.2 Calculations — `__tests__/unit/calculations.test.ts`

Tests the score calculation functions defined in `src/utils/calculations.ts`. These functions produce the average scores displayed on restaurant cards, restaurant detail screens, and meal history entries.

| # | Test ID | Scenario | Expected Result |
|---|---------|----------|-----------------|
| 1 | CALC-01 | Mean flavour score across multiple items | Correct arithmetic mean returned |
| 2 | CALC-02 | Mean price score across multiple items | Correct arithmetic mean returned |
| 3 | CALC-03 | Combined meal average (avgFlavour + avgPrice) / 2 | Correct value rounded to one decimal place |
| 4 | CALC-04 | Restaurant average across multiple meals | Mean of per-meal combined averages returned |
| 5 | CALC-05 | Per-menu-item average across meals | Average computed only for meals containing that item |
| 6 | CALC-06 | Empty items array | Returns `null` (displayed as N/A in the UI) |
| 7 | CALC-07 | Single-item meal | Returns a numeric value, not null |

**Tests in this file: 7**

---

### 4.3 Formatting — `__tests__/unit/formatting.test.ts`

Tests the display formatting functions defined in `src/utils/formatting.ts`. These functions convert raw data values into the formatted strings rendered throughout the application.

| # | Test ID | Scenario | Expected Result |
|---|---------|----------|-----------------|
| 1 | FMT-01 | `formatScore(null)` | Returns `'N/A'` |
| 2 | FMT-02 | `formatScore(number)` | Returns string with exactly one decimal place |
| 3 | FMT-03 | `formatDateLong('YYYY-MM-DD')` | Returns `'MONTH DD, YYYY'` in uppercase |
| 4 | FMT-04 | `formatTime24to12` | Returns 12-hour time string with AM/PM |
| 5 | FMT-05 | `generateId()` called twice | Returns non-empty strings that differ between calls |

**Tests in this file: 5**

---

### 4.4 Storage — `__tests__/unit/storage.test.ts`

Tests the AsyncStorage helper functions defined in `src/storage/userStorage.ts` and `src/storage/mealStorage.ts`. AsyncStorage is replaced by an in-memory mock via the Jest `moduleNameMapper` configuration, allowing storage behaviour to be verified without a device runtime.

| # | Test ID | Scenario | Expected Result |
|---|---------|----------|-----------------|
| 1 | STOR-01 | Save a user, then retrieve all users | Saved user is present in the returned array |
| 2 | STOR-02 | Find a user by username (user exists) | Correct user record is returned |
| 3 | STOR-03 | Find a user by username (user does not exist) | Returns `null` |
| 4 | STOR-04 | Save session, then retrieve session | Session `userId` and `username` round-trip correctly |
| 5 | STOR-05 | Clear session, then retrieve session | Returns `null` |
| 6 | STOR-06 | Save two meals with different dates | `getMeals` returns them sorted newest-first |
| 7 | STOR-07 | Save meals for two different restaurants | `getMealsByRestaurant` returns only meals for the requested restaurant |
| 8 | STOR-08 | Retrieve a meal by ID (present and absent) | Returns correct meal, or `null` when the ID does not exist |

**Tests in this file: 8**

---

## 5. Component Tests

### 5.1 ScoreBadge — `__tests__/components/ScoreBadge.test.tsx`

Tests the `ScoreBadge` component defined in `src/components/ScoreBadge.tsx`. This component is used throughout the application to display formatted scores on restaurant cards and meal history entries.

| # | Test ID | Scenario | Expected Result |
|---|---------|----------|-----------------|
| 1 | COMP-01 | `score` prop is `null` | Badge renders the text `'N/A'` |
| 2 | COMP-02 | `score` prop is a numeric value (e.g. 4.2) | Badge renders the formatted score string `'4.2'` |

**Tests in this file: 2**

---

### 5.2 MealCard — `__tests__/components/MealCard.test.tsx`

Tests the `MealCard` component defined in `src/components/MealCard.tsx`. This component renders a summary of a recorded meal in the meal history list.

| # | Test ID | Scenario | Expected Result |
|---|---------|----------|-----------------|
| 1 | COMP-03 | `restaurantName` prop is provided | Card renders the restaurant name |
| 2 | COMP-04 | `combinedScore` prop is `null` | Card renders `'N/A'` in the score badge area |

**Tests in this file: 2**

---

## 6. Test Plan Coverage Summary

The following table maps each automated test file to the original test plan identifiers defined in `docs/test-plan.md`.

| Test File | Test Plan IDs Covered | Total Tests |
|---|---|---|
| `validation.test.ts` | REG-01, REG-02, REG-03, REG-04, REG-05, LOG-01, LOG-02, MEAL-01, MEAL-02, MEAL-03, DATE-01–05, TIME-01–04 | 19 |
| `calculations.test.ts` | CALC-01, CALC-02, CALC-03, CALC-04, CALC-05, CALC-06, CALC-07 | 7 |
| `formatting.test.ts` | FMT-01, FMT-02, FMT-03, FMT-04, FMT-05 | 5 |
| `storage.test.ts` | STOR-01, STOR-02, STOR-03, STOR-04, STOR-05, STOR-06, STOR-07, STOR-08 | 8 |
| `ScoreBadge.test.tsx` | COMP-01, COMP-02 | 2 |
| `MealCard.test.tsx` | COMP-03, COMP-04 | 2 |
| **Total** | | **43** |

---

## 7. Test Execution Results

```text
PASS  __tests__/unit/calculations.test.ts
PASS  __tests__/unit/validation.test.ts
PASS  __tests__/unit/formatting.test.ts
PASS  __tests__/unit/storage.test.ts
PASS  __tests__/components/ScoreBadge.test.tsx
PASS  __tests__/components/MealCard.test.tsx

Test Suites: 6 passed, 6 total
Tests:       43 passed, 43 total
Snapshots:   0 total
```

All 43 tests pass across all 6 suites. No test failures or warnings were recorded.

---

## 8. Test Execution Instructions

### Run all tests

```bash
npm test
```

### Run tests with coverage report

```bash
npm run test:coverage
```

> Note: The coverage report reflects the portions of source code exercised by the automated test suite. Manual UI testing was required to validate functionality not reachable through unit or component tests, such as navigation flows, modal presentation, and biometric authentication.

---

## 9. Known Limitations

- **No end-to-end testing framework is installed.** Navigation flows, screen transitions, and multi-screen interactions were validated exclusively through manual testing.
- **Biometric authentication cannot be tested automatically.** The `expo-local-authentication` module requires a physical device with enrolled credentials and cannot be simulated in a Jest environment.
- **AsyncStorage is mocked in tests.** The storage test suite uses an in-memory mock rather than a real AsyncStorage instance. This confirms the logic of storage helper functions but does not test the underlying native persistence layer.
- **No code coverage percentages are reported here.** A coverage report can be generated using `npm run test:coverage`, but the raw percentages were not collected as part of this submission.

---

## 10. Summary

The automated test suite validates the logic layer and component rendering layer of the DINE_LOG application across 43 tests in 6 suites.

The suite covers:

* Form validation for registration, login, and meal entry
* Date and time input validation
* Score calculation and aggregation
* Display formatting for scores, dates, and times
* Local storage read, write, query, and session management
* UI component rendering correctness for `ScoreBadge` and `MealCard`

All tests pass. Automated testing was used alongside structured manual UI testing to achieve full validation coverage across both the application logic and the physical device interaction layer.
