/**
 * src/components/MealCard.tsx
 *
 * A pressable row card used in MealListScreen.
 *
 * Layout:
 *   ┌─────────────────────────────────────────────────────┐
 *   │  [DateBadge]  Restaurant Name            [score]    │
 *   │               2026.05.27  ·  01:30 PM               │
 *   └─────────────────────────────────────────────────────┘  ← bottom border
 *
 * Props
 *   meal            — the MealEntry (provides date, time, id)
 *   restaurantName  — pre-resolved from static restaurant data in the parent
 *   combinedScore   — pre-computed combined avg (number | null); ScoreBadge handles N/A
 *   onPress         — called when the card is tapped
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';
import { DateBadge } from './DateBadge';
import { ScoreBadge } from './ScoreBadge';
import { formatDateShort, formatTime24to12 } from '../utils/formatting';
import type { MealEntry } from '../types';

type Props = {
  meal: MealEntry;
  restaurantName: string;
  combinedScore: number | null;
  onPress: () => void;
};

export function MealCard({ meal, restaurantName, combinedScore, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
      testID={`meal-card-${meal.id}`}
    >
      {/* ── Date badge ──────────────────────────────────────────────────── */}
      <DateBadge date={meal.date} />

      {/* ── Text section ────────────────────────────────────────────────── */}
      <View style={styles.body}>
        <Text style={styles.restaurantName} numberOfLines={1}>
          {restaurantName}
        </Text>
        <Text style={styles.meta}>
          {formatDateShort(meal.date)}{'  ·  '}{formatTime24to12(meal.time)}
        </Text>
      </View>

      {/* ── Combined score ──────────────────────────────────────────────── */}
      <ScoreBadge score={combinedScore} size="sm" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  body: {
    flex: 1,
    marginHorizontal: 14,
  },
  restaurantName: {
    fontSize: FontSize.body,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 3,
  },
  meta: {
    fontSize: FontSize.label,
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
