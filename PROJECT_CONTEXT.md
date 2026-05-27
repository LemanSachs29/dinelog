# DineLog Project Context

## Current status
Phase 3 complete — Login and Register screens fully implemented with AuthContext,
validation, biometric stub, shared components built.
App compiles with zero TypeScript errors.

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

### Session 2 — 2026-05-27: Phase 1 — Base project structure

Replaced the flat-stack placeholder with the real navigation architecture.
Added shared types and design-system constants. All screens are typed placeholders.
No business logic yet.

**Files created:**
- `src/types/index.ts` — User, StoredUser, MenuItem, Restaurant, MealItemRating, MealEntry, MealDraft
- `src/constants/colors.ts` — six colour tokens from colour_palette.png
- `src/constants/typography.ts` — FontFamily and FontSize tokens

**Files updated:**
- `src/navigation/AppNavigator.tsx` — final architecture:
  - RootStack → Login (no header), Register (DINE_LOG header), Main
  - Main → BottomTabNavigator (Restaurants tab + Meals tab)
  - RestaurantsTab → RestaurantsStack (RestaurantList, RestaurantDetail, AddMeal, ConfirmMeal modal)
  - MealsTab → MealsStack (MealList, MealDetail)
  - Exports four param-list types consumed by each screen
- All 8 screens — rewritten with correct TypeScript props types, design-system colours,
  uppercase titles, TODO comments marking Phase 3–8 implementation points,
  and working navigation buttons that demonstrate every route

**Navigation flow (working end-to-end):**
- Login → Register → goBack
- Login → Main (tab navigator, lands on RestaurantList)
- RestaurantList → RestaurantDetail (passes restaurantId)
- RestaurantDetail → AddMeal (passes restaurantId)
- AddMeal → ConfirmMeal modal (passes MealDraft placeholder)
- ConfirmMeal → Edit (goBack, AddMeal state preserved) / Confirm → RestaurantList
- MealList tab → MealDetail (passes mealId)
- MealDetail → goBack
- AddMeal and MealDetail hide the tab bar via useFocusEffect ✓

**Architecture in place:**
- Four exported param-list types (RootStackParamList, MainTabParamList, RestaurantsStackParamList, MealsStackParamList)
- Each screen typed with NativeStackScreenProps<CorrectParamList, 'ScreenName'>
- Tab bar: black active / white inactive, RESTAURANTS and MEALS labels
- No business logic, no storage, no context, no mock data — all deferred

## Next tasks (from ROADMAP.md)
1. ~~Phase 1 — Base structure~~ ✅ Done
2. ~~Phase 2 — Foundation logic~~ ✅ Done
3. ~~Phase 3 — Auth screens~~ ✅ Done
4. Phase 4 — Restaurant list screen (FlatList + RestaurantCard)
5. Phase 5 — Restaurant detail screen (ScrollView with 4 sections)
6. Phase 6 — Add meal screen (date/time pickers, ScoreSelector, validation)
7. Phase 7 — Confirmation screen (modal, save to storage)
8. Phase 8 — Meal history screens (MealList + MealDetail)
9. Phase 9 — Tests (28 test cases)
10. Phase 10 — README