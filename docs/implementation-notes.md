# DINE_LOG Implementation Notes

## Purpose

This document defines the expected implementation approach for the DINE_LOG mobile application.

The goal is to maintain:

- consistency,
- simplicity,
- readability,
- maintainability,
- and alignment with the original design proposal.

The application is a university project and should prioritise reliable functionality over unnecessary architectural complexity.

---

# General Development Approach

The implementation should follow these priorities:

1. Working functionality
2. Consistent UI
3. Readable code
4. Stable navigation
5. Reliable state handling
6. Automated testing
7. Maintainable structure

Avoid premature optimisation or enterprise-level abstractions.

The project should remain lightweight and understandable.

---

# Preferred Technology Stack

## Frontend

Recommended stack:

- React Native
- Expo
- TypeScript

---

## Navigation

Use:

- React Navigation
- Native Stack Navigator

Recommended structure:

- Authentication stack
- Main application stack
- Modal stack for confirmation screen if needed

Avoid deeply nested navigators unless necessary.

---

## Persistence

Use lightweight local persistence only.

Recommended:

- AsyncStorage
- Zustand persistence
- or simple local state persistence

A backend is NOT required.

Restaurant data may be seeded statically.

---

# Architecture Guidelines

## Recommended Folder Structure

```txt
app/
├── components/
├── screens/
├── navigation/
├── data/
├── hooks/
├── store/
├── utils/
├── services/
├── types/
├── constants/
└── tests/
```

---

# Component Philosophy

Prefer:

- small reusable components,
- simple props,
- explicit naming,
- minimal side effects.

Avoid:

- giant multi-purpose components,
- unnecessary abstraction layers,
- deeply nested component trees.

---

# State Management

Recommended approach:

- local component state for UI interactions,
- lightweight global state only when required.

Recommended:

- Zustand
- Context API
- or lightweight custom hooks

Avoid Redux unless absolutely necessary.

The app does not require enterprise state complexity.

---

# Data Model Suggestions

## User

```ts
type User = {
  id: string;
  fullName: string;
  username: string;
};
```

---

## Restaurant

```ts
type Restaurant = {
  id: string;
  name: string;
  address: string;
  description: string;
  image: string;
  menu: MenuItem[];
};
```

---

## Menu Item

```ts
type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
};
```

---

## Meal Entry

```ts
type MealEntry = {
  id: string;
  restaurantId: string;
  userId: string;
  date: string;
  items: MealItemRating[];
};
```

---

## Meal Item Rating

```ts
type MealItemRating = {
  menuItemId: string;
  flavourScore: number;
  priceScore: number;
};
```

---

# Navigation Behaviour

## Expected Main Flow

Login
→ Restaurant List
→ Restaurant Details
→ Add Meal
→ Confirmation
→ Restaurant Details

---

## Meal History Flow

Meals List
→ Meal Details
→ Restaurant Details

---

## Navigation Rules

- Back navigation should behave predictably.
- Users should never become trapped in screens.
- Confirmation screens should preserve previous state.
- Navigation should feel native and lightweight.

---

# Screen Implementation Notes

---

# Registration Screen

Requirements:

- basic validation,
- empty field prevention,
- clear error messages,
- navigation to login.

Keep the screen visually minimal.

---

# Login Screen

Requirements:

- username/password login,
- biometric login,
- logout support,
- separate user data visibility.

Biometric login may be simulated if device support is unavailable.

---

# Restaurant List Screen

Requirements:

- vertical scroll,
- card-based UI,
- average ratings,
- empty state handling ("N/A").

Performance should remain acceptable with larger lists.

---

# Restaurant Details Screen

Requirements:

- display restaurant information,
- menu averages,
- previous meals,
- add meal CTA.

The layout should remain sectioned and easy to scan.

---

# Add Meal Screen

Requirements:

- date selection,
- time selection,
- item selection,
- score assignment,
- validation.

Rules:

- scores must remain between 1 and 5,
- at least one menu item required,
- selected items require scores.

Selected items should show clear visual feedback.

---

# Confirmation Screen

Requirements:

- display summary,
- preserve previous selections,
- allow editing,
- final confirmation action.

Avoid accidental submission behaviour.

---

# Meals List Screen

Requirements:

- chronological sorting,
- clear card structure,
- easy navigation to meal details.

Should remain readable with many entries.

---

# Meal Details Screen

Requirements:

- itemised meal breakdown,
- average calculations,
- navigation to restaurant,
- read-only behaviour.

Historical entries must not be editable.

---

# Styling Notes

## Visual Consistency

The implementation should remain visually close to the original mockups.

Important design characteristics:

- monochromatic palette,
- large typography,
- whitespace,
- strong visual hierarchy,
- minimal visual noise.

---

## Avoid

Avoid introducing:

- gradients,
- glassmorphism,
- colourful themes,
- neumorphism,
- excessive shadows,
- over-animated interfaces,
- dashboard-heavy layouts.

The design should remain restrained and minimal.

---

# Testing Expectations

The implementation must align with the original test plan.

Required test categories:

- Unit tests
- Integration tests
- End-to-End tests

---

# Suggested Testing Stack

Recommended:

- Jest
- React Native Testing Library
- Detox (optional)
- Expo testing utilities

---

# Critical User Journeys

The following flows should be covered:

## Authentication

- Register user
- Login user
- Logout user
- Invalid credentials

---

## Restaurant Browsing

- View restaurant list
- Open restaurant details

---

## Meal Recording

- Add valid meal
- Prevent invalid submissions
- Confirm meal
- Edit meal before confirmation

---

## Meal History

- View meals list
- Open meal details
- Navigate back to restaurant

---

# Validation Rules

## Registration

- all fields required

---

## Login

- username required
- password required

---

## Meal Entry

- minimum one selected item
- scores required
- score range limited to 1–5

---

# Persistence Expectations

User data should persist between sessions.

Expected persisted data:

- current authenticated user
- recorded meals
- ratings history

Restaurant seed data may remain static.

---

# Code Style Expectations

Prioritise:

- readable naming,
- explicit typing,
- modular components,
- simple logic,
- consistent formatting.

Avoid:

- magic numbers,
- unclear variable names,
- deeply nested conditions,
- oversized files,
- duplicated logic.

---

# Performance Expectations

The application does not require aggressive optimisation.

However:

- avoid unnecessary rerenders,
- avoid extremely large components,
- avoid excessive global state usage.

The app should feel smooth on normal mobile devices.

---

# Error Handling

Expected behaviours:

- validation feedback,
- safe navigation,
- graceful empty states,
- prevention of invalid actions.

Avoid silent failures.

---

# Accessibility Expectations

The application should support:

- readable typography,
- adequate spacing,
- large touch targets,
- consistent interaction patterns,
- high contrast text.

---

# Development Constraints

This is a university project.

The implementation should prioritise:

- completion,
- reliability,
- and consistency.

Avoid adding features outside the assignment requirements.

Do not redesign the product into a different application.

The goal is faithful implementation of the original prototype.

---

# UI Asset References

UI assets are located in:

`/docs/ui`

Available references:

- registration_screen.jpg
- login_screen.jpg
- restaurant_list_screen.jpg
- restaurant_details_screen.jpg
- add_meal_screen.jpg
- confirmation_screen.jpg
- meals_list_screen.jpg
- meal_details_screen.jpg
- full_mockup_overview.jpg
- colour_palette.png

These assets should be treated as the primary visual source of truth.