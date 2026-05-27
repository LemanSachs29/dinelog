/**
 * AddMealScreen
 *
 * Lets the user record a meal: select date/time, choose menu items, and rate
 * each item with a flavour score and price score (both 1–5).
 *
 * Tab bar is hidden on this screen (focus on the task, not browsing).
 *
 * Phase 1: placeholder with tab-bar hiding and demo navigation to ConfirmMeal.
 * Phase 6: date/time pickers, MenuItemSelectRow per menu item, ScoreSelector
 *           per item, validation via validateMealEntry(), pass MealDraft as param.
 *
 * IMPORTANT: local state (selected items, scores, date, time) must never be
 * reset before navigating to ConfirmMeal.  React Navigation preserves this
 * screen's state when goBack() is called from ConfirmMeal — this is how
 * CONF-02 (edit preserves selections) works.
 */
import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';
import type { RestaurantsStackParamList } from '../navigation/AppNavigator';
import type { MealDraft } from '../types';

type Props = NativeStackScreenProps<RestaurantsStackParamList, 'AddMeal'>;

export function AddMealScreen({ navigation, route }: Props) {
  const { restaurantId } = route.params;

  // ── Hide tab bar while this screen is focused ──────────────────────────────
  // Restored automatically when the screen loses focus (e.g. navigating away).
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
      return () => {
        navigation.getParent()?.setOptions({ tabBarStyle: undefined });
      };
    }, [navigation]),
  );

  // ── Placeholder draft for Phase 1 navigation demo ─────────────────────────
  const placeholderDraft: MealDraft = {
    restaurantId,
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    items: [],
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>

        {/* ── Title ─────────────────────────────────────────────────────── */}
        <Text style={styles.title}>Add Meal</Text>
        <View style={styles.titleUnderline} />

        {/* ── Placeholder notice ────────────────────────────────────────── */}
        <Text style={styles.description}>
          Restaurant: {restaurantId}
          {'\n\n'}
          Phase 6 will add date/time pickers, menu item selection with
          checkboxes, and per-item flavour + price score selectors (1–5).
          {'\n\n'}
          State is preserved when returning from the Confirmation screen
          (CONF-02 test requirement).
        </Text>

        {/* ── TODO Phase 6: Date picker ─────────────────────────────────── */}
        {/* ── TODO Phase 6: Time picker ─────────────────────────────────── */}
        {/* ── TODO Phase 6: MenuItemSelectRow × N ─────────────────────── */}

        {/* ── Save Entry CTA ────────────────────────────────────────────── */}
        {/* TODO Phase 6: validate via validateMealEntry() before navigating */}
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate('ConfirmMeal', { draft: placeholderDraft })}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonPrimaryText}>Save Entry</Text>
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
  title: {
    fontSize: FontSize.screenTitle,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
  },
  titleUnderline: {
    width: 48,
    height: 3,
    backgroundColor: Colors.primary,
    marginTop: 8,
    marginBottom: 24,
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
