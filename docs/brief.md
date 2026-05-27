# DINE_LOG Mobile Application

## Project Overview

DINE_LOG is a mobile application developed for the York Developer’s Lunch Club.

The purpose of the application is to allow users to:

- Browse restaurants
- Record restaurant visits
- Log meals consumed
- Rate meals based on flavour and price
- Review historical dining experiences

The application is based on the requirements defined in the COM6031M Smartphone Application Design and Development assignment.

The app must follow the mobile application design previously produced in Component 1 of the module.

---

# Core Objective

The application should prioritise:

- simplicity,
- usability,
- clean navigation,
- low cognitive load,
- and consistency.

The UI must remain minimalist and functional.

Avoid unnecessary complexity, animations, excessive colours, decorative UI elements, or overengineered architecture.

The application should feel realistic, modern, and buildable within a university project scope.

---

# Design Philosophy

The application uses a monochromatic minimalist visual style.

Main characteristics:

- White/light backgrounds
- Black typography
- Strong typography hierarchy
- Minimal accent colours
- Card-based layouts
- Clear spacing and alignment
- Focus on readability
- Simple navigation flows

The UI should closely resemble the mockups provided in `/docs/ui`.

The project intentionally avoids highly colourful or visually noisy interfaces.

---

# Target Users

Primary users are members of the York Developer’s Lunch Club.

Users may:

- revisit previous restaurants,
- compare previous meals,
- remember dining experiences,
- and discover restaurants recommended by the group.

The app should also remain understandable for international users and non-native English speakers.

---

# Functional Requirements

## Authentication

### Registration

Users must be able to register with:

- full name
- username
- password

### Login

Users must be able to login using:

- username + password
- biometric authentication

Different users must see their own data only.

The app must include logout functionality.

---

# Restaurants

## Restaurant List

The app contains an initial dataset of 10 restaurants.

Each restaurant card must display:

- image
- restaurant name
- short address snippet
- short description
- average restaurant score
- or "N/A" if no meals exist

Users must be able to open restaurant details.

---

## Restaurant Details

The details screen must contain:

- restaurant name
- paragraph description
- restaurant image
- menu items
- average score per menu item
- overall restaurant score
- list of previous meals for that user

The screen must include a primary CTA button:

- "Add New Meal"

---

# Meal Recording

## Add Meal Screen

Users must be able to:

- select date
- select time
- select menu items
- rate each item

Each item requires:

- flavour score (1-5)
- price score (1-5)

Selected items should provide visual feedback.

Ratings outside the valid range must not be possible.

---

## Confirmation Screen

Before saving a meal:

- users must review all entered data,
- confirm the meal,
- or return to edit it.

Editing must preserve previous selections.

The confirmation screen should display:

- selected items
- ratings
- averages
- date/time

---

# Meal History

## Meals List

Users must be able to see all previous meals ordered chronologically.

Each item should contain:

- restaurant name
- date
- average score

---

## Meal Details

Meal details must contain:

- all selected meal items
- flavour scores
- price scores
- averages

Users must be able to:

- return to previous screens
- navigate to restaurant details

Historical meals are NOT editable.

---

# Navigation Structure

Expected navigation flow:

Login
→ Restaurant List
→ Restaurant Details
→ Add Meal
→ Confirmation
→ Restaurant Details

Additional flows:

Restaurant List
→ Meals List
→ Meal Details
→ Restaurant Details

The app should use stack navigation patterns typical in mobile applications.

---

# Technical Requirements

## Frontend

Preferred stack:

- React Native
- Expo
- TypeScript
- React Navigation

Recommended libraries:

- React Native Paper or lightweight UI primitives
- Expo Local Authentication for biometrics
- AsyncStorage or lightweight local persistence

Avoid unnecessary dependencies.

---

# Data Persistence

Persistence may be local only.

A backend is NOT required unless explicitly needed.

Restaurant data may be seeded locally.

User-specific meal history should persist between sessions.

---

# Testing Requirements

The application must include automated testing aligned with the original test plan.

Required categories:

- Unit tests
- Integration tests
- End-to-End tests

Main user journeys must be tested.

Edge cases and validation cases must also be covered.

---

# UI Screens

The following screens are required:

1. Registration Screen
2. Login Screen
3. Restaurant List Screen
4. Restaurant Details Screen
5. Add Meal Screen
6. Confirmation Screen
7. Meals List Screen
8. Meal Details Screen

All UI references and mockups are available inside:

`/docs/ui`

The file `DINE_LOG` contains the complete visual reference system.

---

# Development Constraints

The project is a university assignment.

Prioritise:

- maintainability,
- consistency,
- readability,
- and completion.

Avoid:

- overengineering,
- unnecessary abstractions,
- enterprise architecture patterns,
- excessive animations,
- complex backend systems,
- unnecessary authentication flows,
- or features outside the assignment scope.

The app should feel polished but achievable.

---

# Deliverables

The final project must include:

- working mobile application
- source code repository
- automated tests
- README.md
- demonstration video
- original design documentation

---

# Important Notes

The implementation should remain faithful to the original design report.

The objective is not to redesign the app completely.

The objective is to transform the existing paper prototype into a working mobile application with consistent UX and reliable functionality.