/**
 * src/types/index.ts
 *
 * All shared domain types for DineLog.
 * Navigation param types live in src/navigation/AppNavigator.tsx.
 */

// ─── Authentication ───────────────────────────────────────────────────────────

/**
 * Public user shape used across all screens and components.
 * Never contains the password.
 */
export type User = {
  id: string;
  fullName: string;
  username: string;
};

/**
 * Storage-only shape used exclusively inside src/storage/userStorage.ts.
 * Do NOT pass this type to screens, components, or context.
 */
export type StoredUser = User & {
  password: string;
};

// ─── Restaurant (static seed data) ───────────────────────────────────────────

export type MenuItemCategory = 'APPETIZER' | 'MAIN COURSE' | 'DESSERT';

export type MenuItem = {
  id: string;
  name: string;
  category: MenuItemCategory;
  /** Price in pounds (£) */
  price: number;
};

export type Restaurant = {
  id: string;
  name: string;
  /** Short address snippet shown on the list card */
  address: string;
  /** Full paragraph description shown on the detail screen */
  description: string;
  /**
   * Local image asset — loaded with require() so React Native bundles it.
   * Type `number` is what require() returns for static image imports.
   */
  image: number;
  menu: MenuItem[];
};

// ─── Meals ────────────────────────────────────────────────────────────────────

export type MealItemRating = {
  menuItemId: string;
  /** Integer 1–5 */
  flavourScore: number;
  /** Integer 1–5 */
  priceScore: number;
};

export type MealEntry = {
  id: string;
  restaurantId: string;
  userId: string;
  /** ISO date string: 'YYYY-MM-DD' */
  date: string;
  /** 24-hour time string: 'HH:MM' */
  time: string;
  items: MealItemRating[];
};

/**
 * In-flight meal data created in AddMealScreen and passed to ConfirmMealScreen
 * as a navigation param.  Not persisted until the user presses Confirm.
 */
export type MealDraft = {
  restaurantId: string;
  date: string;
  time: string;
  items: MealItemRating[];
};
