# Manual UI Testing Report

## 1. Introduction

This document presents the manual user interface testing carried out for the DINE_LOG mobile application.

The purpose of this testing process was to validate the main user journeys of the application on a physical Android device and confirm that the implemented functionality behaves as expected under normal usage conditions.

The tests focused on authentication, restaurant browsing, meal creation, navigation behaviour, multi-user separation, and historical meal management.

All tests were completed successfully.

---

# 2. Testing Environment

| Item         | Details                 |
| ------------ | ----------------------- |
| Application  | DINE_LOG                |
| Platform     | Android                 |
| Device Type  | Physical Android device |
| Testing Type | Manual UI Testing       |
| Framework    | React Native + Expo     |
| Date         | May 2026                |

---

# 3. Manual Test Cases

| #  | Test Case                | Action Performed                        | Expected Result                                                        | Result |
| -- | ------------------------ | --------------------------------------- | ---------------------------------------------------------------------- | ------ |
| 1  | Valid registration       | Create a new user account               | User is registered successfully and can log in                         | Pass   |
| 2  | Invalid registration     | Leave required fields empty             | Validation error is displayed                                          | Pass   |
| 3  | Valid login              | Log in with a registered account        | Restaurant list screen is displayed                                    | Pass   |
| 4  | Invalid login            | Enter incorrect password                | Access is denied and error is shown                                    | Pass   |
| 5  | Logout                   | Log out from the application            | User is returned to login screen                                       | Pass   |
| 6  | Multi-user separation    | Log in with a different account         | Previous user meals are not visible                                    | Pass   |
| 7  | Restaurant list display  | Open main restaurant screen             | 10 restaurants, images, address snippets, and scores/N/A are displayed | Pass   |
| 8  | Restaurant details       | Select a restaurant card                | Correct restaurant details are displayed                               | Pass   |
| 9  | Valid meal creation      | Select menu items and ratings           | Confirmation screen is displayed                                       | Pass   |
| 10 | Meal confirmation        | Press confirm on confirmation screen    | Meal is saved successfully                                             | Pass   |
| 11 | Edit before confirmation | Press edit on confirmation screen       | Previous selections remain preserved                                   | Pass   |
| 12 | Empty meal submission    | Attempt to save without selecting items | Validation prevents submission or shows error                          | Pass   |
| 13 | Meal history list        | Open meals history screen               | Saved meals are displayed correctly                                    | Pass   |
| 14 | Meal details             | Open a saved meal entry                 | Meal items and ratings are displayed correctly                         | Pass   |
| 15 | Navigation stability     | Navigate repeatedly between screens     | Application remains stable and does not crash                          | Pass   |

---

# 4. Summary

The manual testing process confirmed that the core functionality of the application operates correctly on a physical Android device.

The application successfully supports:

* User registration and authentication
* Multi-user data separation
* Restaurant browsing
* Meal recording and confirmation
* Historical meal tracking
* Stable screen navigation

No critical issues or application crashes were identified during testing.
