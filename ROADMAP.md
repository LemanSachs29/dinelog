# DineLog — Implementation Roadmap

> Single source of truth for implementation decisions.
> Generated after full analysis of: brief, design report, UI mockups, test plan, implementation notes.
> Do not deviate from this document without updating it first.

---

## 1. Current State

| Item | Status |
|------|--------|
| Expo project scaffolded | ✅ Done |
| App.tsx with SafeAreaProvider + NavigationContainer | ✅ Done |
| Flat-stack placeholder navigator | ✅ Done (will be replaced in Phase 2) |
| 8 placeholder screens with navigation buttons | ✅ Done |
| Real navigation architecture | ⬜ Phase 2 |
| Fonts, constants, types | ⬜ Phase 1 |
| Auth, storage, utilities | ⬜ Phase 1 |
| All screens implemented | ⬜ Phases 3–7 |
| Tests | ⬜ Phase 8 |
| README | ⬜ Phase 9 |

---

## 2. Project Structure

Final folder layout. Every path is relative to the project root.

```
DineLog/
│
├── App.tsx                          ← Entry point: fonts + AuthContext + NavigationContainer
├── index.ts                         ← Expo entry (unchanged)
│
├── assets/                          ← Expo default assets (icon, splash)
│
├── src/
│   ├── components/                  ← Shared, reusable UI components
│   │   ├── DateBadge.tsx
│   │   ├── FormInput.tsx
│   │   ├── MealCard.tsx
│   │   ├── MealItemRow.tsx
│   │   ├── MenuItemSelectRow.tsx
│   │   ├── MenuItemStatRow.tsx
│   │   ├── PrimaryButton.tsx
│   │   ├── RestaurantCard.tsx
│   │   ├── ScoreBadge.tsx
│   │   ├── ScoreSelector.tsx
│   │   ├── ScreenTitle.tsx
│   │   ├── SecondaryButton.tsx
│   │   └── SectionTitle.tsx
│   │
│   ├── constants/
│   │   ├── colors.ts                ← Exact hex values from colour_palette.png
│   │   └── typography.ts            ← Font families, sizes, weights
│   │
│   ├── context/
│   │   └── AuthContext.tsx          ← currentUser, login, logout, register, loginBiometric
│   │
│   ├── data/
│   │   └── restaurants.ts           ← 10 static York restaurants with menu items
│   │
│   ├── navigation/
│   │   └── AppNavigator.tsx         ← Root stack + Auth group + Tab navigator + nested stacks
│   │
│   ├── screens/
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── RestaurantListScreen.tsx
│   │   ├── RestaurantDetailScreen.tsx
│   │   ├── AddMealScreen.tsx
│   │   ├── ConfirmMealScreen.tsx
│   │   ├── MealListScreen.tsx
│   │   └── MealDetailScreen.tsx
│   │
│   ├── storage/
│   │   ├── userStorage.ts           ← AsyncStorage CRUD for users + session
│   │   └── mealStorage.ts           ← AsyncStorage CRUD for meals per user
│   │
│   ├── types/
│   │   └── index.ts                 ← All TypeScript types
│   │
│   └── utils/
│       ├── calculations.ts          ← Pure score calculation functions
│       ├── formatting.ts            ← Pure date/score display formatters
│       └── validation.ts            ← Pure form validation functions
│
├── tests/
│   ├── unit/
│   │   ├── validation.test.ts
│   │   ├── calculations.test.ts
│   │   └── ratings.test.ts
│   ├── integration/
│   │   ├── auth-flow.test.tsx
│   │   ├── restaurant-flow.test.tsx
│   │   └── meal-flow.test.tsx
│   └── e2e/
│       ├── auth.e2e.ts
│       ├── add-meal.e2e.ts
│       └── meal-history.e2e.ts
│
├── docs/                            ← Assignment documentation (do not modify)
├── AGENTS.md
├── CLAUDE.md
├── ROADMAP.md                       ← This file
├── PROJECT_CONTEXT.md
└── README.md                        ← Written last (Phase 9)
```

---

## 3. Navigation Architecture

### Structure

```
RootStack  (NativeStackNavigator)
│
├── [Auth Group]  — no header chrome, no tab bar
│   ├── Login
│   └── Register
│
└── Main  (BottomTabNavigator — 2 tabs)
    │
    ├── RestaurantsTab  (NativeStackNavigator)
    │   ├── RestaurantList      tab bar: VISIBLE
    │   ├── RestaurantDetail    tab bar: VISIBLE
    │   ├── AddMeal             tab bar: HIDDEN
    │   └── [Modal Group]
    │       └── ConfirmMeal     modal sheet, tab bar behind
    │
    └── MealsTab  (NativeStackNavigator)
        ├── MealsList           tab bar: VISIBLE
        └── MealDetail          tab bar: HIDDEN
```

### Tab Bar Spec (from mockups)

- Two tabs: **RESTAURANTS** and **MEALS**
- Icons: fork/knife icon for both
- Active tab: black background, white icon + label
- Inactive tab: white background, black icon + label
- Height: standard native bottom tab height
- No border/shadow — flat, clean

### Tab Bar Visibility

Hiding the tab bar on `AddMeal` and `MealDetail` is done with `useFocusEffect`:

```typescript
// Inside AddMeal and MealDetail
useFocusEffect(() => {
  navigation.getParent()?.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
  return () => {
    navigation.getParent()?.getParent()?.setOptions({ tabBarStyle: undefined });
  };
});
```

### Auth-Gated Routing

`AppNavigator` reads `currentUser` from `AuthContext`.
- `currentUser === null` → renders Auth group (Login/Register)
- `currentUser !== null` → renders Main tabs

No manual `navigation.navigate('Login')` calls on logout — the context change re-renders the navigator automatically.

### Cross-Stack Navigation (MealDetail → RestaurantDetail)

```typescript
// From MealDetailScreen
navigation.navigate('Main', {
  screen: 'RestaurantsTab',
  params: {
    screen: 'RestaurantDetail',
    params: { restaurantId },
  },
});
```

### TypeScript Param Types

```typescript
// src/navigation/AppNavigator.tsx (exported for screen imports)

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RestaurantsStackParamList = {
  RestaurantList: undefined;
  RestaurantDetail: { restaurantId: string };
  AddMeal: { restaurantId: string };
  ConfirmMeal: { draft: MealDraft };
};

export type MealsStackParamList = {
  MealsList: undefined;
  MealDetail: { mealId: string };
};

export type MainTabParamList = {
  RestaurantsTab: NavigatorScreenParams<RestaurantsStackParamList>;
  MealsTab: NavigatorScreenParams<MealsStackParamList>;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};
```

---

## 4. Data Models

```typescript
// src/types/index.ts

// ─── User ────────────────────────────────────────────────────────────────────

/** Public shape — used across all UI components and screens */
export type User = {
  id: string;
  fullName: string;
  username: string;
};

/** Storage-only shape — never passed to UI, only used in userStorage.ts */
export type StoredUser = User & {
  password: string;
};

// ─── Restaurant (static seed data) ──────────────────────────────────────────

export type MenuItem = {
  id: string;
  name: string;
  category: 'APPETIZER' | 'MAIN COURSE' | 'DESSERT';
  price: number;
};

export type Restaurant = {
  id: string;
  name: string;
  address: string;
  description: string;
  menu: MenuItem[];
};

// ─── Meal ────────────────────────────────────────────────────────────────────

export type MealItemRating = {
  menuItemId: string;
  flavourScore: number;  // 1–5 integer
  priceScore: number;    // 1–5 integer
};

export type MealEntry = {
  id: string;
  restaurantId: string;
  userId: string;
  date: string;   // 'YYYY-MM-DD'
  time: string;   // 'HH:MM' (24-hour)
  items: MealItemRating[];
};

// ─── Draft (in-flight, not persisted) ────────────────────────────────────────

/** Passed as navigation param from AddMeal → ConfirmMeal */
export type MealDraft = {
  restaurantId: string;
  date: string;
  time: string;
  items: MealItemRating[];
};
```

---

## 5. State Management

### Rule: state lives as close to where it is needed as possible.

| State | Location | Why |
|-------|----------|-----|
| Logged-in user | `AuthContext` | Needed by every authenticated screen |
| Registration/Login form | `useState` in each screen | Local, not shared |
| AddMeal form (date, time, selections, scores) | `useState` in `AddMealScreen` | React Navigation preserves this on `goBack()` from ConfirmMeal — no extra work needed |
| ConfirmMeal summary | Navigation params (`draft`) | Read-only display, passed in from AddMeal |
| Restaurant list | Derived from static `restaurants.ts` | Never changes |
| Meals list | Read from `mealStorage` on screen focus | Refreshed via `useFocusEffect` |
| Restaurant scores | Derived on render from meals | Pure calculation, never stored |
| Validation errors | `useState` in each form screen | Local, display-only |

### AuthContext Interface

```typescript
type AuthContextValue = {
  currentUser: User | null;
  isLoading: boolean;                                              // true during session restore on startup
  login: (username: string, password: string) => Promise<'ok' | 'invalid'>;
  loginBiometric: () => Promise<'ok' | 'unavailable' | 'failed'>;
  logout: () => Promise<void>;
  register: (
    fullName: string,
    username: string,
    password: string
  ) => Promise<'ok' | 'username_taken'>;
};
```

### Session Persistence

On app start, `AuthContext` reads `@dinelog/session` from AsyncStorage.
- If found and valid → sets `currentUser` → user skips Login
- If not found → `currentUser` stays null → Login screen shown

`isLoading = true` while this check runs.
`App.tsx` shows a blank/splash screen while `isLoading` to avoid flicker.

---

## 6. AsyncStorage Key Strategy

| Key | Type | Contents |
|-----|------|----------|
| `@dinelog/users` | `StoredUser[]` | All registered users |
| `@dinelog/meals/{userId}` | `MealEntry[]` | All meals for that user |
| `@dinelog/session` | `{ userId: string; username: string }` | Active session |
| `@dinelog/lastUser` | `string` | Username for biometric lookup |

### Storage Layer API

```typescript
// src/storage/userStorage.ts
getUsers(): Promise<StoredUser[]>
saveUser(user: StoredUser): Promise<void>
findUserByUsername(username: string): Promise<StoredUser | null>
getSession(): Promise<{ userId: string; username: string } | null>
saveSession(userId: string, username: string): Promise<void>
clearSession(): Promise<void>
getLastUsername(): Promise<string | null>
saveLastUsername(username: string): Promise<void>

// src/storage/mealStorage.ts
getMeals(userId: string): Promise<MealEntry[]>
saveMeal(meal: MealEntry): Promise<void>
getMealById(userId: string, mealId: string): Promise<MealEntry | null>
```

All functions are `async`, all errors are caught and re-thrown with meaningful messages.

---

## 7. Utility Functions

All functions are **pure** (no side effects, no I/O). This is what makes them unit-testable.

### `src/utils/calculations.ts`

```typescript
calcAvgFlavour(items: MealItemRating[]): number
calcAvgPrice(items: MealItemRating[]): number
calcMealCombinedAvg(items: MealItemRating[]): number
calcMenuItemAvgScore(meals: MealEntry[], menuItemId: string): number | null
calcRestaurantAvgScore(meals: MealEntry[]): number | null
```

Rules:
- Returns `null` when the input array is empty (used to display "N/A")
- Rounds to 1 decimal place
- Never throws — always handles empty inputs gracefully

### `src/utils/validation.ts`

```typescript
validateRegistration(fields: {
  fullName: string; username: string; password: string;
}): { valid: boolean; errors: { fullName?: string; username?: string; password?: string } }

validateLogin(fields: {
  username: string; password: string;
}): { valid: boolean; errors: { username?: string; password?: string } }

validateMealEntry(draft: {
  items: MealItemRating[];
}): { valid: boolean; errors: string[] }

isScoreInRange(score: number): boolean  // true if 1 ≤ score ≤ 5
```

### `src/utils/formatting.ts`

```typescript
formatDateLong(date: string): string       // '2023-10-24' → 'OCTOBER 24, 2023'
formatDateShort(date: string): string      // '2023-10-24' → '2023.10.24'
formatDateBadge(date: string): { day: string; month: string }  // → { day: '24', month: 'OCT' }
formatTime24to12(time: string): string     // '19:42' → '07:42 PM'
formatScore(score: number | null): string  // 4.8 → '4.8' | null → 'N/A'
generateId(): string                       // Lightweight unique ID (no dep needed)
```

---

## 8. Design System Constants

### `src/constants/colors.ts`

```typescript
export const Colors = {
  primary:    '#000000',   // Black — titles, active states, primary buttons
  secondary:  '#757575',   // Mid gray — body text, inactive labels
  tertiary:   '#777777',   // Supporting text
  neutral:    '#F5F5F5',   // Card backgrounds, input fields, inactive buttons
  white:      '#FFFFFF',   // Screen backgrounds, primary button text
  border:     '#E0E0E0',   // Thin dividers
} as const;
```

### `src/constants/typography.ts`

```typescript
export const FontFamily = {
  headline: 'SpaceGrotesk_700Bold',
  body:     'Inter_400Regular',
  medium:   'Inter_500Medium',
  bold:     'Inter_700Bold',
} as const;

export const FontSize = {
  screenTitle:   42,    // 'RESTAURANTS', 'ADD MEAL'
  cardTitle:     20,    // Restaurant names in cards
  sectionTitle:  16,    // 'MENU', 'LAST MEALS'
  label:         11,    // 'USERNAME', 'DATE_RECORD' (small caps)
  body:          14,    // Descriptions, addresses
  scoreHero:     48,    // Large score number in MealDetail
  scoreMedium:   32,    // Score in MealsList cards
  scoreSmall:    16,    // Score in RestaurantDetail menu rows
} as const;
```

---

## 9. Reusable Components

Complete inventory. Built once, used across multiple screens.

| Component | Props (simplified) | Used in |
|-----------|-------------------|---------|
| `ScreenTitle` | `title: string` | Every screen |
| `SectionTitle` | `title: string` | RestaurantDetail, AddMeal, MealDetail |
| `FormInput` | `label, value, onChange, placeholder, secure?` | Login, Register |
| `PrimaryButton` | `label, onPress, icon?, disabled?` | Every screen |
| `SecondaryButton` | `label, onPress, icon?` | Login (biometrics), ConfirmMeal (edit) |
| `ScoreBadge` | `score: number \| null` | RestaurantList cards |
| `ScoreSelector` | `value: number \| null, onSelect: (n) => void` | AddMeal per item |
| `RestaurantCard` | `restaurant, avgScore, onPress` | RestaurantList |
| `MenuItemStatRow` | `item: MenuItem, avgScore: number \| null` | RestaurantDetail menu section |
| `MenuItemSelectRow` | `item, selected, flavourScore, priceScore, onToggle, onScore` | AddMeal |
| `DateBadge` | `date: string` | RestaurantDetail last meals section |
| `MealCard` | `meal: MealEntry, restaurantName: string, onPress` | MealsList |
| `MealItemRow` | `itemName: string, flavourScore: number, priceScore: number` | MealDetail |

### Component Rules
- Every component has explicit TypeScript props type
- No component accesses `AuthContext` directly — pass what it needs as props
- No component calls navigation directly — pass `onPress` callbacks from the screen
- No component contains business logic — only rendering and local UI state (e.g. pressed state)

---

## 10. Mock Data Strategy

### Restaurants (`src/data/restaurants.ts`)

10 York-inspired restaurants. Each has:
- Unique `id` (e.g. `'rest-01'`)
- Name, address (York street names), short description
- 5–6 menu items per restaurant with name, category, price

Menu item categories follow the pattern seen in mockups:
- 1–2 `APPETIZER`
- 2–3 `MAIN COURSE`
- 1 `DESSERT`

Menu item IDs are globally unique (e.g. `'item-rest01-01'`) to allow cross-restaurant queries.

### Restaurant Images

No real images. Each `RestaurantCard` renders a dark gray `View` placeholder matching the mockup style:

```typescript
<View style={{ width: '100%', height: 180, backgroundColor: '#2a2a2a' }} />
```

This avoids any asset-bundling complexity and matches the mockup placeholders exactly.

### Test Data

Integration tests use a `testUser` fixture and a set of `testMeals` fixtures (3–5 meals across 2 restaurants). These are defined inline in each test file, not shared via a central fixture file — keeping tests self-contained and readable.

---

## 11. Screen Implementation Order and Dependencies

Build screens in this order. Each depends on the layers below it.

```
Phase 1  →  Types, constants, data, storage, utils, context
Phase 2  →  Navigation (replaces flat stack)
Phase 3  →  LoginScreen, RegisterScreen
               depends on: FormInput, PrimaryButton, SecondaryButton, AuthContext, validation
Phase 4  →  RestaurantListScreen
               depends on: ScreenTitle, RestaurantCard, ScoreBadge, calculations
Phase 5  →  RestaurantDetailScreen
               depends on: ScreenTitle, SectionTitle, MenuItemStatRow, DateBadge, PrimaryButton, calculations
Phase 6  →  AddMealScreen
               depends on: ScreenTitle, SectionTitle, MenuItemSelectRow, ScoreSelector, PrimaryButton, validation
Phase 7  →  ConfirmMealScreen
               depends on: ScreenTitle, SectionTitle, PrimaryButton, SecondaryButton, calculations, formatting
Phase 8  →  MealListScreen
               depends on: ScreenTitle, MealCard, calculations, formatting
Phase 9  →  MealDetailScreen
               depends on: ScreenTitle, SectionTitle, MealItemRow, PrimaryButton, calculations, formatting
Phase 10 →  Tests
Phase 11 →  README
```

---

## 12. Testing Strategy

### Stack
- **Unit + Integration**: Jest + React Native Testing Library (jest-expo preset)
- **E2E**: Simulated via RNTL (Detox/Maestro optional, not required for assessment)

### Test Configuration

`jest.config.js` at project root:
```javascript
module.exports = {
  preset: 'jest-expo',
  setupFilesAfterFramework: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
};
```

AsyncStorage mock in `__mocks__/@react-native-async-storage/async-storage.js` (provided by the library itself — just configure in jest setup).

### Unit Tests (`tests/unit/`)

**`validation.test.ts`** — covers REG-02, REG-03, REG-04, REG-05, LOG-03, MEAL-02, MEAL-03, MEAL-04
- Tests pure `validateRegistration`, `validateLogin`, `validateMealEntry`, `isScoreInRange`
- No React, no navigation, no AsyncStorage
- Every `it()` block starts with the test plan ID: `it('[REG-02] rejects missing full name', ...)`

**`calculations.test.ts`** — covers RESD-02, CONF-03, MD-01
- Tests all `calc*` functions with known input → expected output
- Verifies the arithmetic confirmed in the mockups (e.g. items 4.0/1.0 + 2.0/3.0 + 4.0/2.0 → avgFlavour 3.3, avgPrice 2.0)
- Tests `null` return when no meals exist

**`ratings.test.ts`** — covers MEAL-04, RESL-03, MEAL-05
- Tests score range enforcement (`isScoreInRange`)
- Tests `formatScore` returns `'N/A'` for null inputs
- Tests ScoreSelector renders correct selected state

### Integration Tests (`tests/integration/`)

**`auth-flow.test.tsx`** — covers REG-01, LOG-01, LOG-02, LOG-04
- Renders Register + Login screens wrapped in a test navigator + mocked AuthContext
- REG-01: fill valid form → press Register → expect navigation called
- LOG-01: fill valid credentials → press Login → expect context.login called + navigation
- LOG-02: fill invalid credentials → press Login → expect error message visible
- LOG-04: press Biometrics → expect context.loginBiometric called

**`restaurant-flow.test.tsx`** — covers RESL-01, RESL-02, RESL-03, RESD-01, RESD-02, RESD-03
- Renders screens with mock meal data injected
- RESL-01: restaurant list renders all 10 cards with correct data
- RESL-02: pressing a card calls navigation with correct restaurantId
- RESL-03: restaurant with no meals shows "N/A" badge
- RESD-01: detail screen renders restaurant name, description, menu
- RESD-02: menu item average scores render correctly (based on test meals)
- RESD-03: pressing "Add New Meal" navigates to AddMeal

**`meal-flow.test.tsx`** — covers MEAL-01–05, CONF-01–03, MEALS-01–02, MD-01–03
- MEAL-01: select items + scores → press Save Entry → ConfirmMeal shown with correct data
- MEAL-02: press Save Entry with no items → validation error visible
- MEAL-03: select item, leave scores unset → validation error visible
- MEAL-04: ScoreSelector only allows 1–5 (buttons outside range do not exist)
- MEAL-05: selecting item shows score inputs (visual feedback)
- CONF-01: press Confirm → meal saved to storage → navigation called
- CONF-02: press Edit → goBack → AddMeal selections still present
- CONF-03: summary shows exactly the items + scores entered in AddMeal
- MEALS-01: meals list renders in descending date order
- MEALS-02: pressing a meal card navigates to MealDetail
- MD-01: meal detail shows correct items and scores
- MD-02: pressing "Go to Restaurant" navigates cross-stack
- MD-03: no edit button, no score inputs rendered in MealDetail

### Test ID Convention

Every test uses the plan ID as a prefix:
```typescript
it('[REG-01] creates account with valid full name, username, and password', () => { ... });
it('[LOG-02] shows error message for incorrect credentials', () => { ... });
```

This makes the README mapping table trivial to generate.

---

## 13. Dependencies

### Already Installed

| Package | Version | Purpose |
|---------|---------|---------|
| `expo` | ~56.0.5 | Runtime |
| `react-native` | 0.85.3 | Core |
| `@react-navigation/native` | ^7.2.5 | Navigation core |
| `@react-navigation/native-stack` | ^7.16.0 | Stack navigator |
| `@react-native-async-storage/async-storage` | 2.2.0 | Local persistence |
| `react-native-safe-area-context` | ~5.7.0 | SafeAreaView |
| `react-native-screens` | 4.25.2 | Native screen optimization |
| `react-native-gesture-handler` | ~2.31.1 | Gesture support |
| `react-native-reanimated` | 4.3.1 | Animation support |

### To Add

| Package | Install command | Purpose |
|---------|----------------|---------|
| `@react-navigation/bottom-tabs` | `npx expo install @react-navigation/bottom-tabs` | Tab navigator |
| `@expo-google-fonts/space-grotesk` | `npx expo install @expo-google-fonts/space-grotesk` | Headline font |
| `@expo-google-fonts/inter` | `npx expo install @expo-google-fonts/inter` | Body font |
| `expo-font` | `npx expo install expo-font` | Font loading |
| `expo-local-authentication` | `npx expo install expo-local-authentication` | Biometric login |
| `@react-native-community/datetimepicker` | `npx expo install @react-native-community/datetimepicker` | Date/time pickers |
| `jest-expo` | `npx expo install jest-expo --dev` | Jest preset |
| `@testing-library/react-native` | `npm install --save-dev @testing-library/react-native` | RNTL |
| `@testing-library/jest-native` | `npm install --save-dev @testing-library/jest-native` | RNTL matchers |

---

## 14. Implementation Phases

### Phase 1 — Foundation
*Everything code depends on. No UI yet.*

- [ ] Install all missing dependencies
- [ ] `src/types/index.ts` — all types
- [ ] `src/constants/colors.ts` — exact hex values
- [ ] `src/constants/typography.ts` — font families + sizes
- [ ] `src/data/restaurants.ts` — 10 restaurants, full menu items
- [ ] `src/utils/validation.ts` — pure validation functions
- [ ] `src/utils/calculations.ts` — pure score calculation functions
- [ ] `src/utils/formatting.ts` — pure formatters
- [ ] `src/storage/userStorage.ts` — AsyncStorage user layer
- [ ] `src/storage/mealStorage.ts` — AsyncStorage meal layer
- [ ] `src/context/AuthContext.tsx` — auth state + actions

---

### Phase 2 — Navigation
*Replace flat stack with final architecture.*

- [ ] Rewrite `src/navigation/AppNavigator.tsx` — Root stack + Auth group + Tab navigator
- [ ] Update `App.tsx` — font loading + AuthContext provider + loading state

---

### Phase 3 — Auth Screens
*First working user journey: register + login + logout.*

- [ ] `FormInput` component
- [ ] `PrimaryButton` component
- [ ] `SecondaryButton` component
- [ ] `ScreenTitle` component
- [ ] `RegisterScreen` — validation, storage, navigation
- [ ] `LoginScreen` — credential auth, biometric button, register link

---

### Phase 4 — Restaurant List Screen
*First real data screen.*

- [ ] `ScoreBadge` component
- [ ] `RestaurantCard` component
- [ ] `RestaurantListScreen` — FlatList, scores, navigation

---

### Phase 5 — Restaurant Detail Screen
*The hub screen — most complex layout.*

- [ ] `SectionTitle` component
- [ ] `MenuItemStatRow` component
- [ ] `DateBadge` component
- [ ] `RestaurantDetailScreen` — ScrollView with 4 sections, computed scores, Add Meal CTA

---

### Phase 6 — Add Meal Screen
*Core data entry screen.*

- [ ] `ScoreSelector` component
- [ ] `MenuItemSelectRow` component
- [ ] `AddMealScreen` — date/time picker, item selection, score inputs, validation

---

### Phase 7 — Confirmation Screen
*Completes the meal recording flow.*

- [ ] `ConfirmMealScreen` — modal, read-only summary, save + edit actions, storage write

---

### Phase 8 — Meal History Screens
*Completes the history flow.*

- [ ] `MealCard` component
- [ ] `MealItemRow` component
- [ ] `MealListScreen` — FlatList, chronological, FAB
- [ ] `MealDetailScreen` — read-only breakdown, cross-stack navigation

---

### Phase 9 — Testing
*Automated tests in test plan ID order.*

- [ ] Jest configuration (`jest.config.js`, AsyncStorage mock)
- [ ] `tests/unit/validation.test.ts`
- [ ] `tests/unit/calculations.test.ts`
- [ ] `tests/unit/ratings.test.ts`
- [ ] `tests/integration/auth-flow.test.tsx`
- [ ] `tests/integration/restaurant-flow.test.tsx`
- [ ] `tests/integration/meal-flow.test.tsx`

---

### Phase 10 — README
*Final deliverable before submission.*

- [ ] Project overview
- [ ] Setup instructions (`npm install`, `npx expo start`)
- [ ] Test instructions (`npm test`)
- [ ] Feature list
- [ ] Test case ID mapping table (all 28 test IDs → file → line)

---

## 15. Hard Constraints

Rules that must never be broken:

1. **No backend** — AsyncStorage only. No Supabase, no REST API, no Firebase.
2. **No Redux** — Context API for auth, `useState` for everything else.
3. **`StoredUser` (with password) never crosses into UI components** — only `User` is passed as props.
4. **Validation is always a pure function** — never inline in an event handler.
5. **Score calculations are always pure functions** — never duplicated in components or screens.
6. **Historical meals have zero interactive elements** — no edit UI, no score inputs, nothing tappable except "Go to Restaurant".
7. **`goBack()` from ConfirmMeal must preserve AddMeal state** — never call any state reset before navigating to ConfirmMeal.
8. **Every screen title is UPPERCASE** — it is a design rule enforced in the `ScreenTitle` component, not a per-screen choice.
9. **One primary black button per screen** — never two `PrimaryButton` components on the same screen simultaneously.
10. **Tab bar hidden on AddMeal and MealDetail** — enforced via `useFocusEffect`.
11. **Every test `it()` begins with the test plan ID** — e.g. `'[REG-01] ...'`.
12. **README test mapping table is required for submission** — build it alongside tests, not after.

---

## 16. Score Calculation Reference

Verified against mockup arithmetic:

| Calculation | Formula | Example |
|-------------|---------|---------|
| Avg flavour for a meal | mean of all `flavourScore` in `items` | `(4+5)/2 = 4.5` |
| Avg price for a meal | mean of all `priceScore` in `items` | `(2+3)/2 = 2.5` |
| Combined avg for a meal | `(avgFlavour + avgPrice) / 2` | `(4.5+2.5)/2 = 3.5` |
| Menu item avg (across meals) | mean of all scores for that item | — |
| Restaurant avg | mean of combined avg across all user meals | — |
| Display "N/A" | when 0 meals exist for a restaurant | — |

Flavour and price are **always displayed separately** in detail views (ConfirmMeal, MealDetail, RestaurantDetail last meals). They are **combined into one number** only in list/badge views (RestaurantList badge, MealsList card, RestaurantDetail "Your Average Score").
