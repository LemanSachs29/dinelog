/**
 * src/storage/userStorage.ts
 *
 * AsyncStorage persistence layer for user accounts and sessions.
 *
 * Keys
 * ─────────────────────────────────────────────────────────────────────────
 *  @dinelog/users      StoredUser[]   All registered accounts
 *  @dinelog/session    Session        Active login session (userId + username)
 *  @dinelog/lastUser   string         Username used for biometric lookup
 *
 * Rules
 * ─────────────────────────────────────────────────────────────────────────
 *  - Only this file may use the StoredUser type (it contains the password).
 *  - All functions are async and surface meaningful errors on failure.
 *  - No UI logic, no navigation, no React imports.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StoredUser } from '../types';

// ─── Storage Keys ─────────────────────────────────────────────────────────────

const USERS_KEY    = '@dinelog/users';
const SESSION_KEY  = '@dinelog/session';
const LAST_USER_KEY = '@dinelog/lastUser';

// ─── Internal Types ───────────────────────────────────────────────────────────

type Session = {
  userId: string;
  username: string;
};

// ─── Users ────────────────────────────────────────────────────────────────────

/**
 * Returns all registered users.
 * Returns an empty array when no users have been saved yet.
 */
export async function getUsers(): Promise<StoredUser[]> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  if (!raw) return [];
  return JSON.parse(raw) as StoredUser[];
}

/**
 * Appends a new user to the stored list.
 * The caller is responsible for checking that the username is not already taken.
 */
export async function saveUser(user: StoredUser): Promise<void> {
  const users = await getUsers();
  users.push(user);
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

/**
 * Returns the stored user whose username matches (case-insensitive).
 * Returns null if no match is found.
 */
export async function findUserByUsername(username: string): Promise<StoredUser | null> {
  const users = await getUsers();
  const lower = username.toLowerCase();
  return users.find((u) => u.username.toLowerCase() === lower) ?? null;
}

// ─── Session ──────────────────────────────────────────────────────────────────

/**
 * Returns the active session, or null if no session is stored.
 */
export async function getSession(): Promise<Session | null> {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  return JSON.parse(raw) as Session;
}

/**
 * Persists a session so the user is automatically logged in on the next app launch.
 */
export async function saveSession(userId: string, username: string): Promise<void> {
  const session: Session = { userId, username };
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

/**
 * Removes the active session (called on logout).
 */
export async function clearSession(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}

// ─── Last Username (Biometric) ────────────────────────────────────────────────

/**
 * Returns the username last used to log in.
 * Used by biometric login to look up the correct user record.
 */
export async function getLastUsername(): Promise<string | null> {
  return AsyncStorage.getItem(LAST_USER_KEY);
}

/**
 * Persists the last-used username after a successful login or registration.
 */
export async function saveLastUsername(username: string): Promise<void> {
  await AsyncStorage.setItem(LAST_USER_KEY, username);
}
