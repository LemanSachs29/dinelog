/**
 * src/storage/mealStorage.ts
 *
 * AsyncStorage persistence layer for meal entries.
 *
 * Keys
 * ─────────────────────────────────────────────────────────────────────────
 *  @dinelog/meals/{userId}   MealEntry[]   All meals for a specific user
 *
 * Each user's meals are stored under their own key so data stays isolated.
 * No user can read or modify another user's meals.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { MealEntry } from '../types';

// ─── Key Helper ───────────────────────────────────────────────────────────────

function mealsKey(userId: string): string {
  return `@dinelog/meals/${userId}`;
}

// ─── Read ─────────────────────────────────────────────────────────────────────

/**
 * Returns all meals for a given user, sorted by date descending (newest first).
 * Returns an empty array when the user has no recorded meals.
 */
export async function getMeals(userId: string): Promise<MealEntry[]> {
  const raw = await AsyncStorage.getItem(mealsKey(userId));
  if (!raw) return [];
  const meals = JSON.parse(raw) as MealEntry[];
  // Newest first — consistent ordering for the meals list
  return meals.sort((a, b) => {
    const dateCompare = b.date.localeCompare(a.date);
    if (dateCompare !== 0) return dateCompare;
    return b.time.localeCompare(a.time);
  });
}

/**
 * Returns a single meal by ID, or null if not found.
 */
export async function getMealById(userId: string, mealId: string): Promise<MealEntry | null> {
  const meals = await getMeals(userId);
  return meals.find((m) => m.id === mealId) ?? null;
}

/**
 * Returns all meals for a user that belong to a specific restaurant.
 * Useful for the RestaurantDetail "last meals" section.
 */
export async function getMealsByRestaurant(
  userId: string,
  restaurantId: string,
): Promise<MealEntry[]> {
  const meals = await getMeals(userId);
  return meals.filter((m) => m.restaurantId === restaurantId);
}

// ─── Write ────────────────────────────────────────────────────────────────────

/**
 * Appends a new meal entry to the user's list.
 * The caller must ensure meal.id is unique (use generateId() from utils/formatting).
 */
export async function saveMeal(meal: MealEntry): Promise<void> {
  // Read raw without sort to avoid parsing overhead on write path
  const raw = await AsyncStorage.getItem(mealsKey(meal.userId));
  const meals: MealEntry[] = raw ? (JSON.parse(raw) as MealEntry[]) : [];
  meals.push(meal);
  await AsyncStorage.setItem(mealsKey(meal.userId), JSON.stringify(meals));
}
