/**
 * src/screens/MealDetailScreen.tsx
 *
 * Read-only view of a single saved meal.
 *
 * Sections:
 *   1. Header — screen title, restaurant name
 *   2. Meta block — date (long), time (12-hour)
 *   3. Score block — avg flavour, avg price, combined avg
 *   4. Items — MealItemRow for every rated menu item
 *   5. Footer — "Go to Restaurant" button (cross-stack navigation)
 *
 * This screen is intentionally 100 % read-only.
 * There are zero edit controls (MD-03 test requirement).
 *
 * Tab bar is hidden while this screen is focused (restored on blur).
 *
 * Cross-stack navigation:
 *   "Go to Restaurant" exits the Meals stack and deep-links into
 *   RestaurantsTab → RestaurantDetail, passing the restaurantId.
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';
import { useAuthContext } from '../context/AuthContext';
import { getMealById } from '../storage/mealStorage';
import { findRestaurantById } from '../data/restaurants';
import {
  calcAvgFlavour,
  calcAvgPrice,
  calcMealCombinedAvg,
} from '../utils/calculations';
import {
  formatDateLong,
  formatTime24to12,
  formatScore,
} from '../utils/formatting';
import { SectionTitle } from '../components/SectionTitle';
import { MealItemRow } from '../components/MealItemRow';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import type { MealEntry } from '../types';
import type { MealsStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<MealsStackParamList, 'MealDetail'>;

export function MealDetailScreen({ navigation, route }: Props) {
  const { mealId }       = route.params;
  const { currentUser }  = useAuthContext();

  const [meal, setMeal]           = useState<MealEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound]   = useState(false);

  // ── Hide tab bar while this screen is focused ─────────────────────────────
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
      return () => {
        navigation.getParent()?.setOptions({ tabBarStyle: undefined });
      };
    }, [navigation]),
  );

  // ── Load meal data on mount ────────────────────────────────────────────────
  //
  // Historical meals cannot change, so a single load on mount is sufficient.
  // The mealId is fixed for the lifetime of this screen instance.

  useEffect(() => {
    if (!currentUser) return;
    let cancelled = false;

    async function load() {
      const data = await getMealById(currentUser!.id, mealId);
      if (!cancelled) {
        if (data === null) {
          setNotFound(true);
        } else {
          setMeal(data);
        }
        setIsLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [currentUser, mealId]);

  // ── Derived data (safe to compute only when meal is loaded) ───────────────

  const restaurant   = meal ? findRestaurantById(meal.restaurantId) : null;
  const avgFlavour   = meal ? calcAvgFlavour(meal.items)       : null;
  const avgPrice     = meal ? calcAvgPrice(meal.items)         : null;
  const combined     = meal ? calcMealCombinedAvg(meal.items)  : null;

  // Fast lookup: menuItemId → display name
  const menuNameMap: Record<string, string> = {};
  if (restaurant) {
    for (const item of restaurant.menu) {
      menuNameMap[item.id] = item.name;
    }
  }

  // ── Handlers ──────────────────────────────────────────────────────────────

  function handleGoToRestaurant() {
    if (!meal) return;
    // Cross-stack: MealsStack → MainTabs → RestaurantsTab → RestaurantDetail
    // getParent() steps up from MealsStack to the BottomTabNavigator.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigation.getParent() as any)?.navigate('RestaurantsTab', {
      screen: 'RestaurantDetail',
      params: { restaurantId: meal.restaurantId },
    });
  }

  // ── Loading state ─────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.centeredState}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  // ── Not-found guard ───────────────────────────────────────────────────────

  if (notFound || !meal) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.centeredState}>
          <Text style={styles.errorText}>Meal not found.</Text>
          <SecondaryButton label="Go Back" onPress={() => navigation.goBack()} />
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
        {/* ── Screen header ─────────────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.title}>Meal Detail</Text>
          <View style={styles.titleUnderline} />
          <Text style={styles.restaurantName}>
            {restaurant?.name ?? 'Unknown Restaurant'}
          </Text>
        </View>

        <View style={styles.body}>

          {/* ── Date & time meta block ────────────────────────────────────── */}
          <View style={styles.metaBlock}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Date</Text>
              <Text style={styles.metaValue}>{formatDateLong(meal.date)}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Time</Text>
              <Text style={styles.metaValue}>{formatTime24to12(meal.time)}</Text>
            </View>
          </View>

          {/* ── Score summary block ───────────────────────────────────────── */}
          <View style={styles.sectionWrap}>
            <SectionTitle title="Meal Scores" />
            <View style={styles.scoreBlock}>
              <View style={styles.scoreBlockRow}>
                <Text style={styles.scoreBlockLabel}>Avg Flavour</Text>
                <Text style={styles.scoreBlockValue}>{formatScore(avgFlavour)}</Text>
              </View>
              <View style={styles.scoreBlockDivider} />
              <View style={styles.scoreBlockRow}>
                <Text style={styles.scoreBlockLabel}>Avg Price</Text>
                <Text style={styles.scoreBlockValue}>{formatScore(avgPrice)}</Text>
              </View>
              <View style={styles.scoreBlockDivider} />
              <View style={styles.scoreBlockRow}>
                <Text style={styles.scoreBlockLabel}>Combined</Text>
                <Text style={styles.scoreBlockCombined}>{formatScore(combined)}</Text>
              </View>
            </View>
          </View>

          {/* ── Itemised breakdown ────────────────────────────────────────── */}
          <View style={styles.sectionWrap}>
            <SectionTitle title="Items" />
            {meal.items.map((rating) => (
              <MealItemRow
                key={rating.menuItemId}
                itemName={menuNameMap[rating.menuItemId] ?? rating.menuItemId}
                flavourScore={rating.flavourScore}
                priceScore={rating.priceScore}
              />
            ))}
          </View>

          {/* ── Navigation button ────────────────────────────────────────── */}
          <View style={styles.footer}>
            <PrimaryButton
              label="Go to Restaurant  →"
              onPress={handleGoToRestaurant}
              testID="btn-go-to-restaurant"
            />
          </View>

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

  // ── Centered states (loading / not found) ─────────────────────────────────
  centeredState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    rowGap: 20,
  },
  errorText: {
    fontSize: FontSize.body,
    color: Colors.secondary,
    textAlign: 'center',
  },

  // ── Header ─────────────────────────────────────────────────────────────────
  header: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    lineHeight: 28 * 1.1,
  },
  titleUnderline: {
    width: 48,
    height: 3,
    backgroundColor: Colors.primary,
    marginTop: 10,
    marginBottom: 14,
  },
  restaurantName: {
    fontSize: FontSize.body,
    color: Colors.secondary,
  },

  // ── Body ───────────────────────────────────────────────────────────────────
  body: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  // ── Date/time meta block ───────────────────────────────────────────────────
  metaBlock: {
    backgroundColor: Colors.neutral,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    rowGap: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: FontSize.label,
    fontWeight: '700',
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  metaValue: {
    fontSize: FontSize.body,
    fontWeight: '600',
    color: Colors.primary,
  },

  // ── Section wrapper ────────────────────────────────────────────────────────
  sectionWrap: {
    marginBottom: 24,
  },

  // ── Score block (mirrors ConfirmMealScreen) ────────────────────────────────
  scoreBlock: {
    backgroundColor: Colors.neutral,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  scoreBlockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  scoreBlockDivider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  scoreBlockLabel: {
    fontSize: FontSize.label,
    fontWeight: '700',
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scoreBlockValue: {
    fontSize: FontSize.sectionTitle,
    fontWeight: '700',
    color: Colors.primary,
  },
  scoreBlockCombined: {
    fontSize: FontSize.scoreMedium,
    fontWeight: '700',
    color: Colors.primary,
  },

  // ── Footer ─────────────────────────────────────────────────────────────────
  footer: {
    marginTop: 8,
  },
});
