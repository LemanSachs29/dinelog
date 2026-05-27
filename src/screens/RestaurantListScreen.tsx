/**
 * src/screens/RestaurantListScreen.tsx
 *
 * Default landing screen after login.
 * Renders all 10 York restaurants as a scrollable FlatList.
 *
 * Data strategy:
 *   - Restaurants: static import from src/data/restaurants.ts (never changes)
 *   - Scores: read from AsyncStorage once per focus event so they update
 *     automatically after a new meal is saved without needing a manual refresh.
 *   - One getMeals() call fetches all user meals; scores are computed in memory
 *     by filtering per restaurantId — avoids 10 separate storage reads.
 *
 * Navigation:
 *   Pressing a card navigates to RestaurantDetail with the restaurantId param.
 */

import React, { useCallback, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { useAuthContext } from '../context/AuthContext';
import { getMeals } from '../storage/mealStorage';
import { restaurants } from '../data/restaurants';
import { calcRestaurantAvgScore } from '../utils/calculations';
import { ScreenTitle } from '../components/ScreenTitle';
import { RestaurantCard } from '../components/RestaurantCard';
import type { RestaurantsStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RestaurantsStackParamList, 'RestaurantList'>;

/**
 * Map of restaurantId → computed average score (or null if no meals yet).
 * Built fresh on every focus event.
 */
type ScoreMap = Record<string, number | null>;

export function RestaurantListScreen({ navigation }: Props) {
  const { currentUser } = useAuthContext();
  const [scoreMap, setScoreMap] = useState<ScoreMap>({});

  // ── Reload scores whenever the screen comes into focus ────────────────────
  //
  // useCallback is required by useFocusEffect — it memoises the effect so it
  // doesn't re-register on every render, only when currentUser changes.

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;

      async function loadScores() {
        if (!currentUser) return;

        // Single storage read for all of this user's meals
        const allMeals = await getMeals(currentUser.id);
        if (cancelled) return;

        const map: ScoreMap = {};
        for (const restaurant of restaurants) {
          const forThisRestaurant = allMeals.filter(
            (m) => m.restaurantId === restaurant.id,
          );
          map[restaurant.id] = calcRestaurantAvgScore(forThisRestaurant);
        }

        setScoreMap(map);
      }

      loadScores();

      // Cleanup: ignore the result if the screen unmounted or lost focus
      // before the async call completed
      return () => {
        cancelled = true;
      };
    }, [currentUser]),
  );

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RestaurantCard
            restaurant={item}
            avgScore={scoreMap[item.id] ?? null}
            onPress={() =>
              navigation.navigate('RestaurantDetail', { restaurantId: item.id })
            }
          />
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <ScreenTitle title="Restaurants" />
          </View>
        }
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listContent: {
    paddingBottom: 32,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  separator: {
    height: 12,
    backgroundColor: Colors.white,
  },
});
