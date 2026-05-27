/**
 * src/utils/calculations.ts
 *
 * Pure score calculation functions — no side effects, no I/O, no React.
 * All functions return null when the input is empty (displayed as "N/A" in the UI).
 * Results are rounded to one decimal place.
 *
 * Score reference (from ROADMAP §16):
 *  avgFlavour   = mean of all flavourScore in the items array
 *  avgPrice     = mean of all priceScore in the items array
 *  combinedAvg  = (avgFlavour + avgPrice) / 2
 *  restaurantAvg = mean of combinedAvg across all user meals for that restaurant
 *
 * Test coverage: tests/unit/calculations.test.ts
 */

import type { MealEntry, MealItemRating } from '../types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function round1dp(n: number): number {
  return Math.round(n * 10) / 10;
}

function mean(values: number[]): number | null {
  if (values.length === 0) return null;
  return values.reduce((sum, v) => sum + v, 0) / values.length;
}

// ─── Per-Meal Calculations ────────────────────────────────────────────────────

/**
 * Average flavour score across all items in a single meal.
 * Returns null if the items array is empty.
 */
export function calcAvgFlavour(items: MealItemRating[]): number | null {
  const avg = mean(items.map((i) => i.flavourScore));
  return avg !== null ? round1dp(avg) : null;
}

/**
 * Average price score across all items in a single meal.
 * Returns null if the items array is empty.
 */
export function calcAvgPrice(items: MealItemRating[]): number | null {
  const avg = mean(items.map((i) => i.priceScore));
  return avg !== null ? round1dp(avg) : null;
}

/**
 * Combined average for a single meal: (avgFlavour + avgPrice) / 2.
 * Used for meal cards and badge displays.
 * Returns null if the items array is empty.
 */
export function calcMealCombinedAvg(items: MealItemRating[]): number | null {
  const flavour = calcAvgFlavour(items);
  const price = calcAvgPrice(items);
  if (flavour === null || price === null) return null;
  return round1dp((flavour + price) / 2);
}

// ─── Cross-Meal Calculations ──────────────────────────────────────────────────

/**
 * Average combined score for a specific menu item across multiple meals.
 * Each occurrence contributes (flavourScore + priceScore) / 2.
 * Returns null if the item has never appeared in any of the provided meals.
 */
export function calcMenuItemAvgScore(
  meals: MealEntry[],
  menuItemId: string,
): number | null {
  const scores: number[] = [];

  for (const meal of meals) {
    for (const item of meal.items) {
      if (item.menuItemId === menuItemId) {
        scores.push((item.flavourScore + item.priceScore) / 2);
      }
    }
  }

  const avg = mean(scores);
  return avg !== null ? round1dp(avg) : null;
}

/**
 * Overall average score for a restaurant, computed as the mean of
 * calcMealCombinedAvg across all provided meals.
 *
 * Used for the RestaurantList score badge and the RestaurantDetail "Your Average Score".
 * Returns null if the meals array is empty (shown as "N/A").
 */
export function calcRestaurantAvgScore(meals: MealEntry[]): number | null {
  const perMeal = meals
    .map((m) => calcMealCombinedAvg(m.items))
    .filter((v): v is number => v !== null);

  const avg = mean(perMeal);
  return avg !== null ? round1dp(avg) : null;
}
