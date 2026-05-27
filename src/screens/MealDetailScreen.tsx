/**
 * MealDetailScreen
 *
 * Read-only view of a single saved meal.
 * Shows date, restaurant name, average flavour and price scores (separately),
 * and an itemised breakdown of each menu item with its individual scores.
 *
 * Tab bar is hidden on this screen (detail view, not browsing).
 *
 * The "Go to Restaurant" button navigates cross-stack (MealsTab → RestaurantsTab).
 *
 * Phase 1: placeholder with tab-bar hiding and demo cross-stack navigation comment.
 * Phase 8: load MealEntry from mealStorage, resolve Restaurant from seed data,
 *           render MealItemRow per item, compute avg scores via calculations.ts.
 *           "Go to Restaurant" uses navigation.getParent() cross-stack call.
 *
 * MD-03 requirement: this screen must contain ZERO edit controls.
 */
import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';
import type { MealsStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<MealsStackParamList, 'MealDetail'>;

export function MealDetailScreen({ navigation, route }: Props) {
  const { mealId } = route.params;

  // ── Hide tab bar while this screen is focused ──────────────────────────────
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
      return () => {
        navigation.getParent()?.setOptions({ tabBarStyle: undefined });
      };
    }, [navigation]),
  );

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>

        {/* ── Title ─────────────────────────────────────────────────────── */}
        <Text style={styles.overline}>Logged Entry</Text>
        <Text style={styles.dateTitle}>Oct. 24, 2023</Text>
        <Text style={styles.restaurantName}>The Concrete Bistro</Text>

        {/* ── Placeholder notice ────────────────────────────────────────── */}
        <Text style={styles.description}>
          Meal ID: {mealId}
          {'\n\n'}
          Phase 8 will show avg flavour and avg price as large numbers,
          then an itemised breakdown (MealItemRow per item).
          {'\n\n'}
          This screen is intentionally read-only — no edit controls exist
          (MD-03 test requirement).
        </Text>

        {/* ── TODO Phase 8: MEAL AVERAGES block (large flavour + price) ── */}
        {/* ── TODO Phase 8: ITEMIZED BREAKDOWN (MealItemRow × N) ────────── */}

        {/* ── Go to Restaurant (cross-stack navigation) ────────────────── */}
        {/*
         * TODO Phase 8: implement cross-stack navigation:
         *   navigation.getParent()?.navigate('RestaurantsTab', {
         *     screen: 'RestaurantDetail',
         *     params: { restaurantId: meal.restaurantId },
         *   });
         */}
        <TouchableOpacity
          style={styles.buttonPrimary}
          activeOpacity={0.8}
          onPress={() => {
            // Placeholder — real implementation in Phase 8
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonPrimaryText}>Go to Restaurant  →</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  overline: {
    fontSize: FontSize.label,
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  dateTitle: {
    fontSize: FontSize.screenTitle,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: FontSize.body,
    fontWeight: '600',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 24,
    textAlign: 'right',
  },
  description: {
    fontSize: FontSize.body,
    color: Colors.secondary,
    lineHeight: 22,
    marginBottom: 32,
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonPrimaryText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
