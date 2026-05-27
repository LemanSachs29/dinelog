/**
 * __mocks__/@react-native-async-storage/async-storage.js
 *
 * In-memory mock for @react-native-async-storage/async-storage.
 * Wired via moduleNameMapper in package.json — no jest.mock() needed in tests.
 *
 * The store is a plain object so each jest.fn() call is synchronous for
 * predictability.  Tests that need a clean slate call AsyncStorage.clear()
 * inside beforeEach() — clearMocks:true in jest config resets call history.
 */
'use strict';

let store = {};

const AsyncStorage = {
  /** Persist a string value. */
  setItem: jest.fn((key, value) => {
    store[key] = String(value);
    return Promise.resolve(null);
  }),

  /** Retrieve a previously stored value, or null if absent. */
  getItem: jest.fn((key) => {
    return Promise.resolve(Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null);
  }),

  /** Remove a key-value pair. */
  removeItem: jest.fn((key) => {
    delete store[key];
    return Promise.resolve(null);
  }),

  /** Wipe all stored data. Call this in beforeEach() to isolate tests. */
  clear: jest.fn(() => {
    store = {};
    return Promise.resolve(null);
  }),

  getAllKeys: jest.fn(() => Promise.resolve(Object.keys(store))),

  multiRemove: jest.fn((keys) => {
    keys.forEach((k) => delete store[k]);
    return Promise.resolve(null);
  }),
};

module.exports = AsyncStorage;
