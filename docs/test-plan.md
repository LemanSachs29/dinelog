# DINE_LOG Test Plan

## Purpose

This document defines the automated testing strategy for the DINE_LOG mobile application.

The purpose of the test plan is to validate:

- application functionality,
- user interaction flows,
- input validation,
- navigation behaviour,
- and data consistency.

This test plan is based directly on the original Component 1 design proposal and its associated academic test cases.

The objective is to ensure that the final implementation behaves consistently with the original mobile application design.

---

# Testing Strategy

The testing approach combines three different levels of testing:

## Unit Testing

Unit tests validate isolated pieces of logic and individual components.

Typical responsibilities include:

- form validation,
- score boundaries,
- calculation logic,
- data formatting,
- and utility functions.

Unit tests should remain lightweight and independent.

---

## Integration Testing

Integration tests validate how screens, components, and state interact together.

These tests focus on:

- authentication flows,
- restaurant browsing,
- meal creation,
- screen transitions,
- and confirmation behaviour.

Integration tests ensure that related parts of the application work correctly together.

---

## End-to-End Testing

End-to-End (E2E) testing validates complete user journeys from start to finish.

These tests simulate realistic user behaviour across multiple screens.

Primary user journeys and edge cases should both be covered.

---

# Testing Objectives

The application should guarantee:

- reliable navigation,
- correct validation behaviour,
- accurate meal recording,
- stable state persistence,
- and isolated user data.

Testing should prioritise user-facing functionality over internal implementation details.

---

# Original Test Plan Mapping

The following IDs are inherited from the original Component 1 design report.

These identifiers should remain consistent throughout:

- automated tests,
- README documentation,
- and implementation references.

---

# Test Cases

---

# 1. User Registration

## REG-01 — Valid Registration

| Field | Value |
|---|---|
| Feature | User Registration |
| Scenario | User enters valid full name, username, and password |
| Expected Result | Account is created successfully and user can proceed to login |
| Suggested Test Type | Integration |
| Priority | High |

---

## REG-02 — Missing Full Name

| Field | Value |
|---|---|
| Feature | User Registration |
| Scenario | Full name field is empty |
| Expected Result | Registration is prevented and validation feedback is displayed |
| Suggested Test Type | Unit / Integration |
| Priority | High |

---

## REG-03 — Missing Username

| Field | Value |
|---|---|
| Feature | User Registration |
| Scenario | Username field is empty |
| Expected Result | Registration is prevented and validation feedback is displayed |
| Suggested Test Type | Unit / Integration |
| Priority | High |

---

## REG-04 — Missing Password

| Field | Value |
|---|---|
| Feature | User Registration |
| Scenario | Password field is empty |
| Expected Result | Registration is prevented and validation feedback is displayed |
| Suggested Test Type | Unit / Integration |
| Priority | High |

---

## REG-05 — Empty Form Submission

| Field | Value |
|---|---|
| Feature | User Registration |
| Scenario | User submits empty form |
| Expected Result | Required field validation is shown |
| Suggested Test Type | Unit |
| Priority | Medium |

---

# 2. User Login

## LOG-01 — Valid Login

| Field | Value |
|---|---|
| Feature | User Login |
| Scenario | Correct username and password |
| Expected Result | User is authenticated and redirected to restaurant list |
| Suggested Test Type | Integration / E2E |
| Priority | High |

---

## LOG-02 — Invalid Login

| Field | Value |
|---|---|
| Feature | User Login |
| Scenario | Incorrect credentials |
| Expected Result | Access denied and error message displayed |
| Suggested Test Type | Integration |
| Priority | High |

---

## LOG-03 — Empty Login Fields

| Field | Value |
|---|---|
| Feature | User Login |
| Scenario | Empty username and password |
| Expected Result | Validation feedback displayed |
| Suggested Test Type | Unit |
| Priority | Medium |

---

## LOG-04 — Biometric Login Success

| Field | Value |
|---|---|
| Feature | User Login |
| Scenario | User authenticates with biometrics |
| Expected Result | User enters application successfully |
| Suggested Test Type | Integration / E2E |
| Priority | Medium |

---

# 3. Restaurant List

## RESL-01 — View Restaurant List

| Field | Value |
|---|---|
| Feature | Restaurant List |
| Scenario | User opens restaurant list screen |
| Expected Result | Restaurants display correctly with image, name, address, and score |
| Suggested Test Type | Integration |
| Priority | High |

---

## RESL-02 — Open Restaurant Details

| Field | Value |
|---|---|
| Feature | Restaurant List |
| Scenario | User selects restaurant card |
| Expected Result | Correct restaurant details screen opens |
| Suggested Test Type | Integration / E2E |
| Priority | High |

---

## RESL-03 — Display Unrated Restaurant

| Field | Value |
|---|---|
| Feature | Restaurant List |
| Scenario | Restaurant has no ratings |
| Expected Result | Restaurant displays "N/A" |
| Suggested Test Type | Unit / Integration |
| Priority | Medium |

---

# 4. Restaurant Details

## RESD-01 — View Restaurant Details

| Field | Value |
|---|---|
| Feature | Restaurant Details |
| Scenario | User opens details screen |
| Expected Result | Restaurant information displays correctly |
| Suggested Test Type | Integration |
| Priority | High |

---

## RESD-02 — View Menu Item Scores

| Field | Value |
|---|---|
| Feature | Restaurant Details |
| Scenario | Restaurant contains rated menu items |
| Expected Result | Average scores display correctly |
| Suggested Test Type | Unit / Integration |
| Priority | Medium |

---

## RESD-03 — Open Add Meal Screen

| Field | Value |
|---|---|
| Feature | Restaurant Details |
| Scenario | User selects "Add New Meal" |
| Expected Result | Add meal screen opens |
| Suggested Test Type | Integration / E2E |
| Priority | High |

---

# 5. Add Meal

## MEAL-01 — Record Valid Meal Entry

| Field | Value |
|---|---|
| Feature | Add Meal |
| Scenario | User enters valid meal data |
| Expected Result | Confirmation screen is displayed |
| Suggested Test Type | Integration / E2E |
| Priority | High |

---

## MEAL-02 — Submit Without Selecting Menu Items

| Field | Value |
|---|---|
| Feature | Add Meal |
| Scenario | User submits without selecting items |
| Expected Result | Submission prevented and validation displayed |
| Suggested Test Type | Unit / Integration |
| Priority | High |

---

## MEAL-03 — Submit Without Ratings

| Field | Value |
|---|---|
| Feature | Add Meal |
| Scenario | User selects items without scores |
| Expected Result | Submission prevented |
| Suggested Test Type | Unit / Integration |
| Priority | High |

---

## MEAL-04 — Rating Outside Valid Range

| Field | Value |
|---|---|
| Feature | Add Meal |
| Scenario | Rating outside 1–5 attempted |
| Expected Result | Invalid input prevented |
| Suggested Test Type | Unit |
| Priority | Medium |

---

## MEAL-05 — Selected Item Visual Feedback

| Field | Value |
|---|---|
| Feature | Add Meal |
| Scenario | User selects menu items |
| Expected Result | Selected items visually highlighted |
| Suggested Test Type | Unit / Integration |
| Priority | Medium |

---

# 6. Confirmation Screen

## CONF-01 — Confirm Meal Entry

| Field | Value |
|---|---|
| Feature | Confirmation |
| Scenario | User confirms meal |
| Expected Result | Meal saved successfully |
| Suggested Test Type | E2E |
| Priority | High |

---

## CONF-02 — Edit Meal Entry

| Field | Value |
|---|---|
| Feature | Confirmation |
| Scenario | User selects edit |
| Expected Result | Previous selections remain preserved |
| Suggested Test Type | E2E |
| Priority | High |

---

## CONF-03 — Verify Summary Accuracy

| Field | Value |
|---|---|
| Feature | Confirmation |
| Scenario | User reaches confirmation screen |
| Expected Result | Summary matches previous input |
| Suggested Test Type | Integration |
| Priority | Medium |

---

# 7. Meals List

## MEALS-01 — View Meals History

| Field | Value |
|---|---|
| Feature | Meals List |
| Scenario | User opens meals list |
| Expected Result | Meals display in chronological order |
| Suggested Test Type | Integration |
| Priority | High |

---

## MEALS-02 — Open Meal Details

| Field | Value |
|---|---|
| Feature | Meals List |
| Scenario | User selects meal entry |
| Expected Result | Meal details screen opens |
| Suggested Test Type | Integration / E2E |
| Priority | High |

---

# 8. Meal Details

## MD-01 — View Meal Details

| Field | Value |
|---|---|
| Feature | Meal Details |
| Scenario | User opens saved meal |
| Expected Result | Meal items and ratings display correctly |
| Suggested Test Type | Integration |
| Priority | High |

---

## MD-02 — Navigate To Restaurant Details

| Field | Value |
|---|---|
| Feature | Meal Details |
| Scenario | User selects restaurant navigation |
| Expected Result | Restaurant details screen opens |
| Suggested Test Type | Integration |
| Priority | Medium |

---

## MD-03 — Historical Meal Is Non-Editable

| Field | Value |
|---|---|
| Feature | Meal Details |
| Scenario | User views historic meal |
| Expected Result | No edit functionality available |
| Suggested Test Type | Unit / Integration |
| Priority | Medium |

---

# Critical End-to-End Journeys

The following journeys are considered critical application flows:

## Authentication Journey

Register
→ Login
→ Enter Application
→ Logout

---

## Restaurant Browsing Journey

Restaurant List
→ Restaurant Details

---

## Meal Recording Journey

Restaurant Details
→ Add Meal
→ Confirmation
→ Save Meal

---

## Meal Editing Before Confirmation Journey

Add Meal
→ Confirmation
→ Edit
→ Return With Preserved State

---

## Meal History Journey

Meals List
→ Meal Details
→ Restaurant Details

---

# Edge Cases

The application should correctly handle:

- empty registration forms,
- invalid login attempts,
- restaurants without ratings,
- missing meal ratings,
- invalid score ranges,
- empty meal submissions,
- preserved confirmation state,
- and read-only historical records.

---

# Suggested Testing Stack

Recommended testing tools:

## Unit and Integration Testing

- Jest
- React Native Testing Library

---

## End-to-End Testing

Optional:

- Detox
- Maestro
- Expo-compatible E2E tooling

---

# Suggested Test Folder Structure

```txt
tests/
├── unit/
│   ├── validation.test.ts
│   ├── ratings.test.ts
│   └── calculations.test.ts
├── integration/
│   ├── auth-flow.test.tsx
│   ├── restaurant-flow.test.tsx
│   └── meal-flow.test.tsx
└── e2e/
    ├── auth.e2e.ts
    ├── add-meal.e2e.ts
    └── meal-history.e2e.ts
```

---

# README Alignment

The final README should include:

- instructions for running automated tests,
- explanation of testing tools used,
- and mapping between implemented tests and the original test case IDs from this document.

---

# Final Notes

The purpose of this test plan is not exhaustive enterprise-level coverage.

The objective is to ensure:

- reliable functionality,
- stable navigation,
- correct validation,
- and consistency with the original application design.

Testing should remain practical, maintainable, and aligned with the scope of the university project.