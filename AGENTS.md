# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v56.0.0/ before writing any code.

# Agent Instructions for DineLog

This is a university mobile app assignment built with Expo React Native and TypeScript.

## Main goal
Build a functional mobile app for tracking restaurant meals based on the approved Component 1 design.

## Priority
Working functionality first, visual polish second.

## Tech decisions
- Use Expo React Native with TypeScript.
- Use React Navigation.
- Use AsyncStorage for local persistence.
- Do not add a backend.
- Do not add Supabase.
- Do not overengineer.

## Coding rules
- Keep files short and readable.
- Do not rewrite unrelated files.
- Explain planned changes before editing.
- Implement features incrementally.
- Prefer simple state and clear TypeScript types.
- Keep App.tsx as a clean entry point.
- Put navigation in src/navigation/AppNavigator.tsx.
- Put screens in src/screens.
- Put mock data in src/data.
- Put storage helpers in src/storage.
- Put shared types in src/types.

## Navigation
- ConfirmMealScreen should be presented as a modal.
- Historical meals are not editable.
- AddMeal should preserve selections when returning from ConfirmMeal.

## Assessment requirements
The app must demonstrate:
- registration
- login
- logout
- user-specific data
- restaurant list
- restaurant details
- add meal
- confirmation before saving
- meals list
- meal details
- automated tests aligned with the test plan
- README with setup, test instructions, features, and test mapping