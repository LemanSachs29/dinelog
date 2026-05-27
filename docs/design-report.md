# DINE_LOG Design Report

## Overview

DINE_LOG is a minimalist restaurant meal tracking mobile application created for the York Developer’s Lunch Club.

The purpose of the application is to help users:

- discover restaurants,
- record meals,
- rate dining experiences,
- and revisit historical meal logs.

The application prioritises simplicity, usability, and clean navigation patterns.

This document describes the user interface structure, interaction flows, and design decisions used throughout the application.

---

# Design Goals

The application was designed around the following principles:

- Minimal cognitive load
- Clear visual hierarchy
- Simple navigation
- Fast interaction flows
- Consistent layouts
- Readable typography
- Reduced visual clutter
- Mobile-first usability

The interface intentionally uses a monochromatic visual identity to maintain focus on content rather than decoration.

---

# Visual Style

## Colour Palette

Reference:

`/docs/ui/colour_palette.png`

The application uses:

- white/light backgrounds,
- black typography,
- grayscale UI components,
- minimal accent usage.

The visual style is intentionally restrained and minimalistic.

The objective is clarity and readability rather than decorative complexity.

---

# Typography

Typography is one of the main visual elements of the application.

Characteristics:

- large bold titles,
- strong hierarchy,
- high contrast,
- generous spacing,
- minimal secondary text.

Section titles should remain visually dominant throughout the application.

---

# Layout Principles

The layout system follows several consistent rules:

- vertical scrolling for content-heavy pages,
- card-based presentation,
- clear spacing between sections,
- predictable alignment,
- persistent bottom navigation where appropriate,
- primary actions placed clearly at the bottom of workflows.

Whitespace is intentionally used to improve readability and reduce interface density.

---

# Navigation Structure

The application follows a stack-based mobile navigation structure.

Main flows:

## Authentication Flow

Login
→ Register
→ Login
→ Restaurant List

---

## Restaurant Flow

Restaurant List
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

# Screen Designs

---

# 1. Registration Screen

Reference:

`/docs/ui/registration_screen.jpg`

## Purpose

Allows new users to create an account.

## UI Elements

- Full name input
- Username input
- Password input
- Register button
- Back navigation

## Design Notes

The screen intentionally uses:

- a vertically focused layout,
- minimal distractions,
- strong title typography,
- and a single primary action.

The form fields are clearly separated to reduce confusion.

The screen should feel lightweight and straightforward.

---

# 2. Login Screen

Reference:

`/docs/ui/login_screen.jpg`

## Purpose

Allows returning users to authenticate.

## UI Elements

- Username input
- Password input
- Login button
- Biometric authentication button
- Register account link

## Design Notes

The login flow is intentionally short and efficient.

Biometric authentication is included as a secondary convenience feature.

The screen prioritises accessibility and fast interaction.

---

# 3. Restaurant List Screen

Reference:

`/docs/ui/restaurant_list_screen.jpg`

## Purpose

Displays available restaurants.

## UI Elements

Each restaurant card includes:

- Restaurant image
- Restaurant name
- Address snippet
- Short description
- Average score or N/A

Bottom navigation includes:

- Restaurants tab
- Meals tab

## Design Notes

The restaurant cards are designed for rapid scanning.

The visual hierarchy prioritises:

1. Restaurant name
2. Image
3. Rating
4. Supporting text

The scrollable list should remain responsive and readable even with larger datasets.

---

# 4. Restaurant Details Screen

Reference:

`/docs/ui/restaurant_details_screen.jpg`

## Purpose

Displays detailed restaurant information.

## UI Elements

- Restaurant title
- Description
- Restaurant image
- Average restaurant score
- Menu item list
- Average menu item scores
- Previous meal history
- "Add New Meal" CTA button

## Design Notes

The screen combines:

- restaurant discovery,
- meal statistics,
- and personal history.

The layout separates information into clearly grouped sections.

The primary CTA button should remain visually prominent.

---

# 5. Add Meal Screen

Reference:

`/docs/ui/add_meal_screen.jpg`

## Purpose

Allows users to record a meal.

## UI Elements

- Date selector
- Time selector
- Menu item selection
- Flavour rating
- Price rating
- Save entry button

## Design Notes

Selected menu items should provide immediate visual feedback.

Ratings must be constrained between 1 and 5.

The screen should support fast interaction without excessive navigation.

---

# 6. Confirmation Screen

Reference:

`/docs/ui/confirmation_screen.jpg`

## Purpose

Allows users to review meal information before submission.

## UI Elements

- Selected items summary
- Ratings summary
- Average calculations
- Confirm button
- Edit button

## Design Notes

The confirmation step reduces accidental submissions.

Users must be able to return and edit previous selections without losing state.

The summary layout should remain easy to scan quickly.

---

# 7. Meals List Screen

Reference:

`/docs/ui/meals_list_screen.jpg`

## Purpose

Displays historical meal records.

## UI Elements

Each entry includes:

- Restaurant name
- Date
- Average score

## Design Notes

The list is chronological and vertically scrollable.

The design supports quick historical review and recognition of previous dining experiences.

---

# 8. Meal Details Screen

Reference:

`/docs/ui/meal_details_screen.jpg`

## Purpose

Displays the full breakdown of a recorded meal.

## UI Elements

- Meal date
- Restaurant name
- Average flavour score
- Average price score
- Itemised meal breakdown
- Navigation button to restaurant

## Design Notes

Historical meals are intentionally read-only.

This preserves historical consistency and prevents accidental modification.

The screen focuses on information clarity rather than interaction complexity.

---

# Interaction Design

The application uses predictable mobile interaction patterns.

Key interaction principles:

- Single primary CTA per screen
- Clear back navigation
- Minimal modal usage
- Immediate visual feedback
- Consistent spacing
- Persistent navigation patterns

The app avoids hidden interactions or gesture-heavy navigation.

---

# Accessibility Considerations

The application includes several accessibility-focused decisions:

- high contrast typography,
- large touch targets,
- readable spacing,
- clear navigation labels,
- consistent interaction patterns,
- reduced visual clutter.

The minimalist visual approach improves readability and reduces cognitive overload.

---

# Data and User Separation

Each authenticated user should only see:

- their own meals,
- their own ratings,
- their own history.

User data must remain isolated between accounts.

Logout functionality is required.

---

# Technical Design Notes

Recommended implementation stack:

- React Native
- Expo
- TypeScript
- React Navigation

Suggested architecture:

- screen-based folder structure,
- reusable UI components,
- lightweight local persistence,
- strongly typed navigation.

The project should prioritise maintainability and readability over architectural complexity.

---

# Design Constraints

The implementation should remain faithful to the original mockups.

Avoid:

- redesigning layouts,
- introducing new visual systems,
- excessive animations,
- unnecessary dashboards,
- enterprise-level abstractions,
- or features outside the assignment scope.

The goal is to create a polished university project that matches the original paper prototype as closely as possible.

---

# UI References

All UI assets are stored inside:

`/docs/ui`

Available assets:

- registration_screen.jpg
- login_screen.jpg
- restaurant_list_screen.jpg
- restaurant_details_screen.jpg
- add_meal_screen.jpg
- confirmation_screen.jpg
- meals_list_screen.jpg
- meal_details_screen.jpg
- colour_palette.png
- full_mockup_overview.jpg