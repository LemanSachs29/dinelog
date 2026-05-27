/**
 * ConfirmMealScreen
 *
 * Presented as a modal sheet over AddMealScreen.
 * Shows a read-only summary of the meal draft before the user confirms and saves.
 *
 * Two actions:
 *   Confirm → saves meal to AsyncStorage, navigates back to RestaurantDetail.
 *   Edit    → goBack() — AddMealScreen's state is preserved naturally.
 *
 * Phase 1: placeholder showing draft data from route params, demo navigation.
 * Phase 7: display full MealDraft summary, call mealStorage.saveMeal(),
 *           compute avg flavour and avg price via calculations.ts,
 *           navigate back to RestaurantDetail after saving (pop 2).
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';
import type { RestaurantsStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RestaurantsStackParamList, 'ConfirmMeal'>;

export function ConfirmMealScreen({ navigation, route }: Props) {
  const { draft } = route.params;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>

        {/* ── Title ─────────────────────────────────────────────────────── */}
        <Text style={styles.title}>Confirmation</Text>
        <View style={styles.titleUnderline} />

        {/* ── Draft summary (placeholder) ───────────────────────────────── */}
        <Text style={styles.label}>Date_Record</Text>
        <Text style={styles.value}>{draft.date} — {draft.time}</Text>

        <Text style={[styles.label, { marginTop: 16 }]}>Restaurant</Text>
        <Text style={styles.value}>{draft.restaurantId}</Text>

        <Text style={[styles.label, { marginTop: 16 }]}>Selected Plates</Text>
        <Text style={styles.description}>
          {draft.items.length === 0
            ? '(no items — Phase 6 will populate these)'
            : draft.items.map((item) =>
                `${item.menuItemId}  Fl: ${item.flavourScore}  Pr: ${item.priceScore}`,
              ).join('\n')}
        </Text>

        {/* ── TODO Phase 7: SCORES_METRIC block (avg flavour + avg price) ── */}

        {/* ── Confirm ───────────────────────────────────────────────────── */}
        {/* TODO Phase 7: mealStorage.saveMeal() → navigation.navigate('RestaurantList') */}
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate('RestaurantList')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonPrimaryText}>Confirm</Text>
        </TouchableOpacity>

        {/* ── Edit (returns to AddMeal with state intact) ───────────────── */}
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonSecondaryText}>Edit</Text>
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
    paddingTop: 24,
  },
  title: {
    fontSize: FontSize.cardTitle + 4,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
  },
  titleUnderline: {
    width: 40,
    height: 3,
    backgroundColor: Colors.primary,
    marginTop: 8,
    marginBottom: 24,
  },
  label: {
    fontSize: FontSize.label,
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  value: {
    fontSize: FontSize.body,
    fontWeight: '600',
    color: Colors.primary,
    textTransform: 'uppercase',
    marginBottom: 8,
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
    marginBottom: 12,
  },
  buttonPrimaryText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  buttonSecondary: {
    backgroundColor: Colors.neutral,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
