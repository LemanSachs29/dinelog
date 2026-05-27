/**
 * src/context/AuthContext.tsx
 *
 * Authentication state and actions for the entire app.
 *
 * Provided at the root of the component tree (App.tsx).
 * Consumed by screens via the useAuthContext() hook.
 *
 * Responsibilities:
 *  - Restore session on app launch (checks AsyncStorage once, on mount)
 *  - Expose currentUser (null = not logged in)
 *  - Expose isLoading (true only during the initial session-restore check)
 *  - Provide login, register, logout, and loginBiometric actions
 *
 * Design rules:
 *  - StoredUser (with password) is used only inside this file and userStorage.ts
 *  - currentUser is always the public User shape (no password)
 *  - Screens/components must never call userStorage directly
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, StoredUser } from '../types';
import {
  findUserByUsername,
  saveUser,
  getSession,
  saveSession,
  clearSession,
  saveLastUsername,
  getLastUsername,
} from '../storage/userStorage';
import { generateId } from '../utils/formatting';

// ─── Context Type ─────────────────────────────────────────────────────────────

export type AuthContextValue = {
  /** The currently logged-in user, or null if unauthenticated. */
  currentUser: User | null;

  /**
   * True only during the initial AsyncStorage session-restore check on app launch.
   * App.tsx renders a blank screen while this is true to prevent auth flicker.
   */
  isLoading: boolean;

  /**
   * Attempts to log in with username and password.
   * Returns 'ok' on success, 'invalid' if credentials do not match.
   */
  login: (username: string, password: string) => Promise<'ok' | 'invalid'>;

  /**
   * Attempts biometric login using the last-used username.
   * Returns 'unavailable' until expo-local-authentication is wired up in Phase 3.
   */
  loginBiometric: () => Promise<'ok' | 'unavailable' | 'failed'>;

  /**
   * Clears the session and sets currentUser to null.
   * AppNavigator re-renders automatically — no manual navigate() call needed.
   */
  logout: () => Promise<void>;

  /**
   * Creates a new account and immediately logs the user in.
   * Returns 'ok' on success, 'username_taken' if the username already exists.
   */
  register: (
    fullName: string,
    username: string,
    password: string,
  ) => Promise<'ok' | 'username_taken'>;
};

// ─── Context Instance ─────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading]     = useState(true);

  // Restore session once on mount
  useEffect(() => {
    async function restoreSession() {
      try {
        const session = await getSession();
        if (session) {
          const stored = await findUserByUsername(session.username);
          if (stored) {
            // Strip password before putting user into state
            const { password: _pw, ...user } = stored;
            setCurrentUser(user);
          } else {
            // Stored session references a user that no longer exists — clear it
            await clearSession();
          }
        }
      } catch {
        // Failed to read storage — stay logged out, don't crash
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  // ─── Actions ────────────────────────────────────────────────────────────────

  const login = async (username: string, password: string): Promise<'ok' | 'invalid'> => {
    const stored = await findUserByUsername(username);
    if (!stored || stored.password !== password) return 'invalid';

    const { password: _pw, ...user } = stored;
    await saveSession(user.id, user.username);
    await saveLastUsername(user.username);
    setCurrentUser(user);
    return 'ok';
  };

  const loginBiometric = async (): Promise<'ok' | 'unavailable' | 'failed'> => {
    /**
     * TODO Phase 3: wire up expo-local-authentication here.
     *
     * Steps:
     *  1. npx expo install expo-local-authentication
     *  2. Check LocalAuthentication.hasHardwareAsync() → return 'unavailable' if false
     *  3. Check LocalAuthentication.isEnrolledAsync()  → return 'unavailable' if false
     *  4. Call LocalAuthentication.authenticateAsync()
     *  5. On success: getLastUsername() → findUserByUsername() → login flow
     *  6. Return 'ok' | 'failed' accordingly
     */
    return 'unavailable';
  };

  const logout = async (): Promise<void> => {
    await clearSession();
    setCurrentUser(null);
    // AppNavigator sees currentUser === null and re-renders the auth screens automatically
  };

  const register = async (
    fullName: string,
    username: string,
    password: string,
  ): Promise<'ok' | 'username_taken'> => {
    const existing = await findUserByUsername(username);
    if (existing) return 'username_taken';

    const newStored: StoredUser = {
      id:       generateId(),
      fullName,
      username,
      password,
    };
    await saveUser(newStored);

    const { password: _pw, ...user } = newStored;
    await saveSession(user.id, user.username);
    await saveLastUsername(user.username);
    setCurrentUser(user);
    return 'ok';
  };

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <AuthContext.Provider
      value={{ currentUser, isLoading, login, loginBiometric, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Returns the AuthContext value.
 * Throws if called outside of AuthContextProvider — this is intentional,
 * because every authenticated screen must be rendered inside the provider.
 */
export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext must be used inside <AuthContextProvider>.');
  }
  return ctx;
}
