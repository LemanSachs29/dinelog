/**
 * MealListScreen
 *
 * Shows all meals recorded by the current user, sorted chronologically.
 * Lives in the Meals tab.
 *
 * Phase 1: placeholder with demo navigation to MealDetail.
 * Phase 8: FlatList of MealCard components, loaded from mealStorage.getMeals(),
 *           sorted descending by date, floating "+" FAB for new meal flow.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';
import type { MealsStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<MealsStackParamList, 'MealList'>;

export function MealListScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>

        {/* ── Title ─────────────────────────────────────────────────────── */}
        <Text style={styles.overline}>Registry Overview</Text>
        <View style={styles.accentRow}>
          <View style={styles.leftAccent} />
          <Text style={styles.title}>{'Recent\nLogs'}</Text>
        </View>

        {/* ── Placeholder notice ────────────────────────────────────────── */}
        <Text style={styles.description}>
          Phase 8 will display all meals for the current user in chronological
          order, each showing restaurant name, date/time, and combined average
          score.
        </Text>

        {/* ── TODO Phase 8: FlatList of MealCard ───────────────────────── */}
        {/* ── TODO Phase 8: Floating + FAB for new meal ────────────────── */}

        {/* ── Demo navigation ───────────────────────────────────────────── */}
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate('MealDetail', { mealId: 'meal-01' })}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonPrimaryText}>Open Meal (demo)</Text>
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
    marginBottom: 8,
  },
  accentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  leftAccent: {
    width: 4,
    backgroundColor: Colors.primary,
    marginRight: 12,
    marginTop: 4,
    alignSelf: 'stretch',
  },
  title: {
    fontSize: FontSize.screenTitle,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    lineHeight: 46,
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
