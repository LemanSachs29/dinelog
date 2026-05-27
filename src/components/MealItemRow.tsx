/**
 * src/components/MealItemRow.tsx
 *
 * A read-only row displaying a single rated menu item.
 * Used in ConfirmMealScreen (summary before saving) and MealDetailScreen (history view).
 *
 * Layout:
 *   ┌──────────────────────────────────────────────────────┐
 *   │  Item Name                     FL  4  ·  PR  3      │
 *   └──────────────────────────────────────────────────────┘  ← thin bottom border
 *
 * Props
 *   itemName      — resolved menu item name (look up from restaurant data in the screen)
 *   flavourScore  — integer 1–5
 *   priceScore    — integer 1–5
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';

type Props = {
  itemName: string;
  flavourScore: number;
  priceScore: number;
};

export function MealItemRow({ itemName, flavourScore, priceScore }: Props) {
  return (
    <View style={styles.row}>
      {/* ── Item name ─────────────────────────────────────────────────── */}
      <Text style={styles.name} numberOfLines={2}>
        {itemName}
      </Text>

      {/* ── Scores ────────────────────────────────────────────────────── */}
      <View style={styles.scores}>
        <Text style={styles.scoreLabel}>FL</Text>
        <Text style={styles.scoreNum}>{flavourScore}</Text>
        <Text style={styles.sep}> · </Text>
        <Text style={styles.scoreLabel}>PR</Text>
        <Text style={styles.scoreNum}>{priceScore}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  name: {
    flex: 1,
    fontSize: FontSize.body,
    fontWeight: '600',
    color: Colors.primary,
    marginRight: 12,
  },
  scores: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 0,
  },
  scoreLabel: {
    fontSize: FontSize.label,
    fontWeight: '700',
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  scoreNum: {
    fontSize: FontSize.body,
    fontWeight: '700',
    color: Colors.primary,
    marginLeft: 3,
  },
  sep: {
    fontSize: FontSize.body,
    color: Colors.secondary,
    marginHorizontal: 4,
  },
});
