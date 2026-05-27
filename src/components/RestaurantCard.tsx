/**
 * src/components/RestaurantCard.tsx
 *
 * A pressable card for the RestaurantListScreen.
 *
 * Layout (top → bottom, full screen width):
 *   ┌──────────────────────────────────────────┐
 *   │  [dark image placeholder — 160px tall]   │
 *   ├──────────────────────────────────────────┤
 *   │  RESTAURANT NAME               [badge]   │
 *   │  Address snippet                         │
 *   └──────────────────────────────────────────┘
 *
 * No shadows, no rounded corners — keeps the flat monochrome aesthetic.
 *
 * Props
 *   restaurant  — the static Restaurant record from src/data/restaurants.ts
 *   avgScore    — pre-computed score for this user (number | null → ScoreBadge handles formatting)
 *   onPress     — called when the card is tapped
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';
import { ScoreBadge } from './ScoreBadge';
import type { Restaurant } from '../types';

type Props = {
  restaurant: Restaurant;
  avgScore: number | null;
  onPress: () => void;
};

export function RestaurantCard({ restaurant, avgScore, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      {/* ── Image placeholder ───────────────────────────────────────────── */}
      <View style={styles.imagePlaceholder} />

      {/* ── Text body ───────────────────────────────────────────────────── */}
      <View style={styles.body}>
        {/* Name row + score badge */}
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>
            {restaurant.name}
          </Text>
          <ScoreBadge score={avgScore} size="md" />
        </View>

        {/* Address */}
        <Text style={styles.address} numberOfLines={1}>
          {restaurant.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    width: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: 160,
    backgroundColor: '#2a2a2a',
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  name: {
    flex: 1,
    fontSize: FontSize.cardTitle,
    fontWeight: '700',
    color: Colors.primary,
    marginRight: 12,
  },
  address: {
    fontSize: FontSize.body,
    color: Colors.secondary,
  },
});
