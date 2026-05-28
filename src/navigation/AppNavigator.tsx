/**
 * src/navigation/AppNavigator.tsx
 *
 * Full navigation architecture for DineLog.
 *
 * Structure:
 *   RootStack
 *   ├── Login          (no header)
 *   ├── Register       (header: DINE_LOG)
 *   └── Main
 *       └── BottomTabs
 *           ├── RestaurantsTab (NativeStack)
 *           │   ├── RestaurantList   — tab bar visible
 *           │   ├── RestaurantDetail — tab bar visible
 *           │   ├── AddMeal          — tab bar HIDDEN (via useFocusEffect in screen)
 *           │   └── ConfirmMeal      — modal sheet
 *           └── MealsTab (NativeStack)
 *               ├── MealList         — tab bar visible
 *               └── MealDetail       — tab bar HIDDEN (via useFocusEffect in screen)
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../constants/colors';
import { useAuthContext } from '../context/AuthContext';
import type { MealDraft } from '../types';

import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { RestaurantListScreen } from '../screens/RestaurantListScreen';
import { RestaurantDetailScreen } from '../screens/RestaurantDetailScreen';
import { AddMealScreen } from '../screens/AddMealScreen';
import { ConfirmMealScreen } from '../screens/ConfirmMealScreen';
import { MealListScreen } from '../screens/MealListScreen';
import { MealDetailScreen } from '../screens/MealDetailScreen';

// ─── Navigation Param Types ───────────────────────────────────────────────────
//
// Exported so each screen can type its own `navigation` and `route` props.
// Domain types (User, MealEntry…) live in src/types/index.ts.

/** Top-level stack: auth screens + main tab container */
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  /** The tab navigator — no params needed from outside */
  Main: undefined;
};

/** Bottom tab navigator */
export type MainTabParamList = {
  RestaurantsTab: undefined;
  MealsTab: undefined;
};

/** Stack inside the Restaurants tab */
export type RestaurantsStackParamList = {
  RestaurantList: undefined;
  RestaurantDetail: { restaurantId: string };
  AddMeal: { restaurantId: string };
  /** draft contains all meal data typed in AddMeal, passed for read-only display */
  ConfirmMeal: { draft: MealDraft };
};

/** Stack inside the Meals tab */
export type MealsStackParamList = {
  MealList: undefined;
  MealDetail: { mealId: string };
};

// ─── Navigator Instances ─────────────────────────────────────────────────────

const RootStack = createNativeStackNavigator<RootStackParamList>();
const MainTabs = createBottomTabNavigator<MainTabParamList>();
const RestaurantsStack = createNativeStackNavigator<RestaurantsStackParamList>();
const MealsStack = createNativeStackNavigator<MealsStackParamList>();

// ─── Shared Header Options ────────────────────────────────────────────────────

/** Applied to every screen inside the two tab stacks */
const sharedStackScreenOptions = {
  headerTitle: 'DINE_LOG',
  headerTitleAlign: 'center' as const,
  headerStyle: { backgroundColor: Colors.white },
  headerTintColor: Colors.primary,
  headerShadowVisible: false,
};

// ─── Restaurants Stack ────────────────────────────────────────────────────────

function RestaurantsNavigator() {
  return (
    <RestaurantsStack.Navigator screenOptions={sharedStackScreenOptions}>
      <RestaurantsStack.Screen
        name="RestaurantList"
        component={RestaurantListScreen}
        options={{ headerBackVisible: false }}
      />
      <RestaurantsStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetailScreen}
      />
      <RestaurantsStack.Screen
        name="AddMeal"
        component={AddMealScreen}
      />
      {/* ConfirmMeal slides up as a modal sheet over AddMeal */}
      <RestaurantsStack.Group screenOptions={{ presentation: 'modal' }}>
        <RestaurantsStack.Screen
          name="ConfirmMeal"
          component={ConfirmMealScreen}
        />
      </RestaurantsStack.Group>
    </RestaurantsStack.Navigator>
  );
}

// ─── Meals Stack ──────────────────────────────────────────────────────────────

function MealsNavigator() {
  return (
    <MealsStack.Navigator screenOptions={sharedStackScreenOptions}>
      <MealsStack.Screen
        name="MealList"
        component={MealListScreen}
        options={{ headerBackVisible: false }}
      />
      <MealsStack.Screen
        name="MealDetail"
        component={MealDetailScreen}
      />
    </MealsStack.Navigator>
  );
}

// ─── Bottom Tab Navigator ─────────────────────────────────────────────────────

function MainNavigator() {
  return (
    <MainTabs.Navigator
      screenOptions={{
        // Each tab stack manages its own header
        headerShown: false,

        // Tab bar visual style — matches the mockup (black active / white inactive)
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.primary,
        tabBarActiveBackgroundColor: Colors.primary,
        tabBarInactiveBackgroundColor: Colors.white,
        tabBarLabelStyle: {
          textTransform: 'uppercase',
          fontSize: 10,
          fontWeight: '600',
          letterSpacing: 0.5,
        },
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
        },
      }}
    >
      <MainTabs.Screen
        name="RestaurantsTab"
        component={RestaurantsNavigator}
        options={{
          tabBarLabel: 'Restaurants',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={size} color={color} />
          ),
        }}
      />
      <MainTabs.Screen
        name="MealsTab"
        component={MealsNavigator}
        options={{
          tabBarLabel: 'Meals',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt" size={size} color={color} />
          ),
        }}
      />
    </MainTabs.Navigator>
  );
}

// ─── Root Navigator ───────────────────────────────────────────────────────────

export function AppNavigator() {
  const { currentUser } = useAuthContext();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {currentUser === null ? (
        /*
         * Auth group — rendered when the user is not logged in.
         * React Navigation automatically transitions to these screens
         * when currentUser becomes null (on logout) and away from them
         * when currentUser is set (on login / registration).
         * No manual navigate('Login') calls are ever needed.
         */
        <>
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              headerShown: true,
              headerTitle: 'DINE_LOG',
              headerTitleAlign: 'center',
              headerStyle: { backgroundColor: Colors.white },
              headerTintColor: Colors.primary,
              headerShadowVisible: false,
            }}
          />
        </>
      ) : (
        /* Main app — tab navigator with nested stacks */
        <RootStack.Screen name="Main" component={MainNavigator} />
      )}
    </RootStack.Navigator>
  );
}
