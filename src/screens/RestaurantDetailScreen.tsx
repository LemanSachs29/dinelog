/**
 * src/screens/RestaurantDetailScreen.tsx
 *
 * Hub screen for a single restaurant.  Four sections:
 *
 *   1. Header      — image placeholder, name, address, description
 *   2. Score       — user's overall average score for this restaurant
 *   3. MENU        — all menu items with per-item average scores
 *   4. LAST MEALS  — previous meals at this restaurant, newest first
 *   5. CTA         — "Add New Meal" navigates to AddMealScreen
 *
 * Data strategy:
 *   - Restaurant record: synchronous lookup from static data (findRestaurantById)
 *   - Meals: loaded from AsyncStorage via getMealsByRestaurant on every focus event
 *     so scores update automatically after a new meal is saved
 *
 * Cross-stack navigation:
 *   Tapping a past meal navigates to MealDetail which lives in MealsStack (different tab).
 *   We reach it via navigation.getParent() to access the BottomTabNavigator.
 */

import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';
import { useAuthContext } from '../context/AuthContext';
import { getMealsByRestaurant } from '../storage/mealStorage';
import { findRestaurantById } from '../data/restaurants';
import {
  calcRestaurantAvgScore,
  calcMenuItemAvgScore,
  calcMealCombinedAvg,
} from '../utils/calculations';
import { formatScore } from '../utils/formatting';
import { SectionTitle } from '../components/SectionTitle';
import { ScoreBadge } from '../components/ScoreBadge';
import { MenuItemStatRow } from '../components/MenuItemStatRow';
import { DateBadge } from '../components/DateBadge';
import { PrimaryButton } from '../components/PrimaryButton';
import type { MealEntry } from '../types';
import type { RestaurantsStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RestaurantsStackParamList, 'RestaurantDetail'>;

export function RestaurantDetailScreen({ navigation, route }: Props) {
  const { restaurantId } = route.params;
  const { currentUser }  = useAuthContext();

  // Static restaurant data — never changes, safe to read outside state
  const restaurant = findRestaurantById(restaurantId);

  // ── Dynamic meal data (reloaded on every focus) ───────────────────────────
  const [meals, setMeals]           = useState<MealEntry[]>([]);
  const [avgScore, setAvgScore]     = useState<number | null>(null);
  const [itemScores, setItemScores] = useState<Record<string, number | null>>({});

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;

      async function loadData() {
        if (!currentUser || !restaurant) return;

        try {
          const restaurantMeals = await getMealsByRestaurant(currentUser.id, restaurantId);
          if (cancelled) return;

          // Overall restaurant score
          setAvgScore(calcRestaurantAvgScore(restaurantMeals));

          // Per-item scores (keyed by menuItemId)
          const scores: Record<string, number | null> = {};
          for (const item of restaurant.menu) {
            scores[item.id] = calcMenuItemAvgScore(restaurantMeals, item.id);
          }
          setItemScores(scores);

          // Store meals for the Last Meals section (already sorted newest-first)
          setMeals(restaurantMeals);
        } catch {
          // Storage error — scores and meals stay empty, app continues
        }
      }

      void loadData();
      return () => { cancelled = true; };
    }, [currentUser, restaurantId, restaurant]),
  );

  // ── Cross-stack navigation to MealDetail ──────────────────────────────────
  //
  // MealDetail lives in MealsStack (Meals tab), not in RestaurantsStack.
  // We use getParent() to reach the BottomTabNavigator and navigate from there.
  // The cast to `any` is intentional — MainTabParamList currently types both
  // tabs as `undefined`; the runtime navigation still works correctly.

  function handleMealPress(mealId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigation.getParent() as any)?.navigate('MealsTab', {
      screen: 'MealDetail',
      params: { mealId },
    });
  }

  // ── Guard: invalid restaurantId ───────────────────────────────────────────

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.errorState}>
          <Text style={styles.errorText}>Restaurant not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── 1. Full-width restaurant image ───────────────────────────── */}
        <Image
          source={restaurant.image}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* ── 2. Padded content area ───────────────────────────────────── */}
        <View style={styles.content}>

          {/* Restaurant name */}
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <View style={styles.nameUnderline} />

          {/* Address */}
          <Text style={styles.address}>{restaurant.address}</Text>

          {/* Description */}
          <Text style={styles.description}>{restaurant.description}</Text>

          {/* Overall score */}
          <View style={styles.scoreRow}>
            <View>
              <Text style={styles.scoreLabel}>Your Average Score</Text>
              <Text style={styles.scoreValue}>{formatScore(avgScore)}</Text>
            </View>
            <ScoreBadge score={avgScore} size="md" />
          </View>

          <View style={styles.sectionGap} />

          {/* ── 3. MENU section ───────────────────────────────────────── */}
          <SectionTitle title="Menu" />
          <View style={styles.menuList}>
            {restaurant.menu.map((item) => (
              <MenuItemStatRow
                key={item.id}
                item={item}
                avgScore={itemScores[item.id] ?? null}
              />
            ))}
          </View>

          <View style={styles.sectionGap} />

          {/* ── 4. LAST MEALS section ─────────────────────────────────── */}
          <SectionTitle title="Last Meals" />

          {meals.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                No meals recorded here yet.{'\n'}
                Tap the button below to add your first one.
              </Text>
            </View>
          ) : (
            <View style={styles.mealList}>
              {meals.map((meal) => {
                const mealScore = calcMealCombinedAvg(meal.items);
                return (
                  <TouchableOpacity
                    key={meal.id}
                    style={styles.mealRow}
                    onPress={() => handleMealPress(meal.id)}
                    activeOpacity={0.7}
                  >
                    <DateBadge date={meal.date} />
                    <View style={styles.mealRowInfo}>
                      <Text style={styles.mealRowScore}>
                        {formatScore(mealScore)}
                      </Text>
                      <Text style={styles.mealRowMeta}>
                        {meal.items.length}{' '}
                        {meal.items.length === 1 ? 'item' : 'items'} · {meal.time}
                      </Text>
                    </View>
                    <Text style={styles.chevron}>›</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          <View style={styles.sectionGap} />

          {/* ── 5. Add New Meal CTA ───────────────────────────────────── */}
          <PrimaryButton
            label="Add New Meal  +"
            onPress={() => navigation.navigate('AddMeal', { restaurantId })}
          />

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // ── Hero image ─────────────────────────────────────────────────────────────
  heroImage: {
    width: '100%',
    height: 200,
  },

  // ── Content wrapper ────────────────────────────────────────────────────────
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  // ── Restaurant header ──────────────────────────────────────────────────────
  restaurantName: {
    fontSize: FontSize.screenTitle,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    lineHeight: FontSize.screenTitle * 1.1,
  },
  nameUnderline: {
    width: 48,
    height: 3,
    backgroundColor: Colors.primary,
    marginTop: 10,
    marginBottom: 14,
  },
  address: {
    fontSize: FontSize.body,
    color: Colors.secondary,
    marginBottom: 8,
  },
  description: {
    fontSize: FontSize.body,
    color: Colors.secondary,
    lineHeight: 22,
    marginBottom: 20,
  },

  // ── Score row ──────────────────────────────────────────────────────────────
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.border,
  },
  scoreLabel: {
    fontSize: FontSize.label,
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  scoreValue: {
    fontSize: FontSize.scoreMedium,
    fontWeight: '700',
    color: Colors.primary,
  },

  // ── Section spacing ────────────────────────────────────────────────────────
  sectionGap: {
    height: 24,
  },

  // ── Menu list ──────────────────────────────────────────────────────────────
  menuList: {
    // MenuItemStatRow items handle their own bottom borders
  },

  // ── Meal rows ──────────────────────────────────────────────────────────────
  mealList: {
    // Rows handle their own bottom borders
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  mealRowInfo: {
    flex: 1,
    marginLeft: 16,
  },
  mealRowScore: {
    fontSize: FontSize.cardTitle,
    fontWeight: '700',
    color: Colors.primary,
  },
  mealRowMeta: {
    fontSize: FontSize.label,
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  chevron: {
    fontSize: 22,
    color: Colors.tertiary,
    marginLeft: 8,
  },

  // ── Empty state ────────────────────────────────────────────────────────────
  emptyState: {
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: FontSize.body,
    color: Colors.secondary,
    lineHeight: 22,
  },

  // ── Error guard ────────────────────────────────────────────────────────────
  errorState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: FontSize.body,
    color: Colors.secondary,
  },
});
