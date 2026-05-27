/**
 * src/components/MenuItemStatRow.tsx
 *
 * A single menu item row inside the RestaurantDetail MENU section.
 *
 * Layout:
 *   ┌─────────────────────────────────────────────┐
 *   │  Item Name          £12.50   [score badge]  │
 *   │  CATEGORY                                   │
 *   ├─────────────────────────────────────────────┤  ← thin border
 *
 * Props
 *   item      — the MenuItem record from static restaurant data
 *   avgScore  — pre-computed average combined score, or null if no meals yet
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';
import { ScoreBadge } from './ScoreBadge';
import type { MenuItem } from '../types';

type Props = {
  item: MenuItem;
  avgScore: number | null;
};

export function MenuItemStatRow({ item, avgScore }: Props) {
  return (
    <View style={styles.row}>
      {/* ── Left: name + category ──────────────────────────────────────── */}
      <View style={styles.left}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>

      {/* ── Right: price + score badge ─────────────────────────────────── */}
      <View style={styles.right}>
        <Text style={styles.price}>£{item.price.toFixed(2)}</Text>
        <ScoreBadge score={avgScore} size="sm" />
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
  left: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: FontSize.body,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 2,
  },
  category: {
    fontSize: FontSize.label,
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  price: {
    fontSize: FontSize.body,
    color: Colors.secondary,
    minWidth: 44,
    textAlign: 'right',
  },
});
