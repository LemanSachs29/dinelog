/**
 * __tests__/unit/calculations.test.ts
 *
 * Unit tests for src/utils/calculations.ts
 *
 * Test plan coverage:
 *   CALC-01  calcAvgFlavour — correct mean of flavour scores
 *   CALC-02  calcAvgPrice   — correct mean of price scores
 *   CALC-03  calcMealCombinedAvg — (avgFlavour + avgPrice) / 2 rounded to 1dp
 *   CALC-04  calcRestaurantAvgScore — mean of per-meal combinedAvg
 *   CALC-05  calcMenuItemAvgScore   — mean only over meals that include that item
 *   CALC-06  empty items   → null (displayed as 'N/A')
 *   CALC-07  single item   — returns value, not null
 */

import {
  calcAvgFlavour,
  calcAvgPrice,
  calcMealCombinedAvg,
  calcRestaurantAvgScore,
  calcMenuItemAvgScore,
} from '../../src/utils/calculations';
import type { MealEntry, MealItemRating } from '../../src/types';

// ── Helpers ───────────────────────────────────────────────────────────────────

function makeItems(pairs: [number, number][]): MealItemRating[] {
  return pairs.map(([flavourScore, priceScore], i) => ({
    menuItemId: `item-${i + 1}`,
    flavourScore,
    priceScore,
  }));
}

function makeMeal(id: string, restaurantId: string, items: MealItemRating[]): MealEntry {
  return {
    id,
    restaurantId,
    userId: 'user-1',
    date: '2026-05-01',
    time: '12:00',
    items,
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

// CALC-01
it('calcAvgFlavour returns the mean flavour score across all items', () => {
  const items = makeItems([[4, 2], [2, 4]]);
  expect(calcAvgFlavour(items)).toBe(3.0);
});

// CALC-02
it('calcAvgPrice returns the mean price score across all items', () => {
  const items = makeItems([[4, 2], [4, 4]]);
  expect(calcAvgPrice(items)).toBe(3.0);
});

// CALC-03
it('calcMealCombinedAvg returns (avgFlavour + avgPrice) / 2 rounded to 1dp', () => {
  // avgFlavour = (5+1)/2 = 3.0, avgPrice = (3+3)/2 = 3.0 → combined = 3.0
  const items = makeItems([[5, 3], [1, 3]]);
  expect(calcMealCombinedAvg(items)).toBe(3.0);
});

// CALC-04
it('calcRestaurantAvgScore returns the mean of per-meal combined averages', () => {
  // Meal A: items [(4,4)] → combined = 4.0
  // Meal B: items [(2,2)] → combined = 2.0
  // Restaurant avg = (4.0 + 2.0) / 2 = 3.0
  const meals = [
    makeMeal('m1', 'rest-1', makeItems([[4, 4]])),
    makeMeal('m2', 'rest-1', makeItems([[2, 2]])),
  ];
  expect(calcRestaurantAvgScore(meals)).toBe(3.0);
});

// CALC-05
it('calcMenuItemAvgScore returns the avg only for meals containing that item', () => {
  // item-1 appears in meal A with (4,4) → score = 4.0
  // item-2 appears in meal B with (2,2) → score = 2.0
  // querying item-1 should return 4.0
  const meals = [
    makeMeal('m1', 'rest-1', [{ menuItemId: 'item-1', flavourScore: 4, priceScore: 4 }]),
    makeMeal('m2', 'rest-1', [{ menuItemId: 'item-2', flavourScore: 2, priceScore: 2 }]),
  ];
  expect(calcMenuItemAvgScore(meals, 'item-1')).toBe(4.0);
});

// CALC-06
it('calcAvgFlavour returns null for an empty items array', () => {
  expect(calcAvgFlavour([])).toBeNull();
});

// CALC-07
it('calcMealCombinedAvg returns a value (not null) for a single-item meal', () => {
  const items = makeItems([[3, 5]]);
  expect(calcMealCombinedAvg(items)).not.toBeNull();
  expect(calcMealCombinedAvg(items)).toBe(4.0);
});
