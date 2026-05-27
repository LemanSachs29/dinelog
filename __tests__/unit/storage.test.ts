/**
 * __tests__/unit/storage.test.ts
 *
 * Unit tests for src/storage/userStorage.ts and src/storage/mealStorage.ts.
 * AsyncStorage is replaced by the in-memory mock via moduleNameMapper.
 *
 * Test plan coverage:
 *   STOR-01  saveUser → getUsers returns the saved user
 *   STOR-02  findUserByUsername finds an existing user
 *   STOR-03  findUserByUsername returns null for an unknown username
 *   STOR-04  saveSession / getSession round-trip
 *   STOR-05  clearSession removes the active session
 *   STOR-06  saveMeal / getMeals round-trip, sorted newest-first
 *   STOR-07  getMealsByRestaurant filters by restaurantId
 *   STOR-08  getMealById returns the correct meal or null when absent
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  saveUser,
  getUsers,
  findUserByUsername,
  saveSession,
  getSession,
  clearSession,
} from '../../src/storage/userStorage';
import {
  saveMeal,
  getMeals,
  getMealsByRestaurant,
  getMealById,
} from '../../src/storage/mealStorage';
import type { StoredUser, MealEntry } from '../../src/types';

// Reset the in-memory store before every test
beforeEach(async () => {
  await AsyncStorage.clear();
});

// ── User storage ──────────────────────────────────────────────────────────────

const USER_A: StoredUser = {
  id: 'u-001',
  fullName: 'Alice Example',
  username: 'alice',
  password: 'pass_alice',
};

const USER_B: StoredUser = {
  id: 'u-002',
  fullName: 'Bob Example',
  username: 'bob',
  password: 'pass_bob',
};

// STOR-01
it('saveUser persists a user who can then be retrieved by getUsers', async () => {
  await saveUser(USER_A);
  const users = await getUsers();
  expect(users).toHaveLength(1);
  expect(users[0].username).toBe('alice');
});

// STOR-02
it('findUserByUsername returns the user when they exist', async () => {
  await saveUser(USER_A);
  await saveUser(USER_B);
  const found = await findUserByUsername('bob');
  expect(found).not.toBeNull();
  expect(found?.id).toBe('u-002');
});

// STOR-03
it('findUserByUsername returns null for a username that has not been registered', async () => {
  await saveUser(USER_A);
  const found = await findUserByUsername('nobody');
  expect(found).toBeNull();
});

// ── Session storage ───────────────────────────────────────────────────────────

// STOR-04
it('saveSession / getSession round-trips userId and username correctly', async () => {
  await saveSession('u-001', 'alice');
  const session = await getSession();
  expect(session).not.toBeNull();
  expect(session?.userId).toBe('u-001');
  expect(session?.username).toBe('alice');
});

// STOR-05
it('clearSession removes the stored session so getSession returns null', async () => {
  await saveSession('u-001', 'alice');
  await clearSession();
  const session = await getSession();
  expect(session).toBeNull();
});

// ── Meal storage ──────────────────────────────────────────────────────────────

function makeMeal(id: string, restaurantId: string, date: string): MealEntry {
  return {
    id,
    restaurantId,
    userId: 'u-001',
    date,
    time: '12:00',
    items: [{ menuItemId: 'item-01', flavourScore: 4, priceScore: 3 }],
  };
}

// STOR-06
it('saveMeal persists meals and getMeals returns them sorted newest-first', async () => {
  const older = makeMeal('meal-1', 'rest-01', '2026-01-10');
  const newer = makeMeal('meal-2', 'rest-01', '2026-05-27');

  await saveMeal(older);
  await saveMeal(newer);

  const meals = await getMeals('u-001');
  expect(meals).toHaveLength(2);
  // Newest date should be first
  expect(meals[0].id).toBe('meal-2');
  expect(meals[1].id).toBe('meal-1');
});

// STOR-07
it('getMealsByRestaurant returns only meals for the specified restaurant', async () => {
  await saveMeal(makeMeal('meal-1', 'rest-01', '2026-01-01'));
  await saveMeal(makeMeal('meal-2', 'rest-02', '2026-01-02'));
  await saveMeal(makeMeal('meal-3', 'rest-01', '2026-01-03'));

  const meals = await getMealsByRestaurant('u-001', 'rest-01');
  expect(meals).toHaveLength(2);
  expect(meals.every((m) => m.restaurantId === 'rest-01')).toBe(true);
});

// STOR-08
it('getMealById returns the correct meal, or null when the ID does not exist', async () => {
  await saveMeal(makeMeal('meal-42', 'rest-01', '2026-03-15'));

  const found = await getMealById('u-001', 'meal-42');
  expect(found).not.toBeNull();
  expect(found?.id).toBe('meal-42');

  const missing = await getMealById('u-001', 'does-not-exist');
  expect(missing).toBeNull();
});
