# DineLog Project Context

## Current status
Expo React Native TypeScript project created.

The app is for COM6031M Smartphone Application Design and Development Component 2.

The assignment requires implementing the approved Component 1 design as a mobile app, including source code, video demo, Component 1 design documents, README, and automated tests.

## Deadline
9 June 2026.

## Chosen stack
- Expo React Native
- TypeScript
- React Navigation
- AsyncStorage
- Jest / React Native Testing Library later if feasible

## Reason for no backend
The brief requires a mobile app implementing the functional user journeys. It does not require remote sync, cloud database, API server, or multi-device support. Local persistence is enough for this assessed prototype.

## App concept
DineLog helps York Developer’s Lunch Club users track restaurant visits, meals, menu items, and flavour/price ratings.

## Required screens
- LoginScreen
- RegisterScreen
- RestaurantListScreen
- RestaurantDetailScreen
- AddMealScreen
- ConfirmMealScreen
- MealsListScreen
- MealDetailScreen

## Key functional requirements
- Users can register with full name, username, and password.
- Users can login with username and password.
- Different users should see their own meals.
- User can logout.
- App displays 10 predefined York restaurants.
- Restaurant cards show name, image/placeholder, address snippet, description, and score or N/A.
- Restaurant details show description, image, menu items, average item scores, restaurant average, and previous meals for that user.
- User can add a meal with date, time, selected menu items, flavour score 1 to 5, and price score 1 to 5.
- Confirmation screen shows selected data before saving.
- User can edit before confirming without losing selections.
- Meals list shows meals by date with restaurant and average scores.
- Meal details show selected items and individual scores.
- Historic meals do not need to be editable.

## Design style
Minimal, monochrome, inspired by the Component 1 prototype.
Functionality matters more than pixel-perfect UI.

## Current implementation notes
Update this section after every major coding session.

## Next tasks
1. Implement navigation and placeholder screens.
2. Implement restaurant mock data.
3. Implement restaurant list and details.
4. Implement register/login with AsyncStorage.
5. Implement meal creation flow.
6. Implement meals list and meal details.
7. Add tests.
8. Write README.
9. Record demo video.