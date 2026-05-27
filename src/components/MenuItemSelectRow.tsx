/**
 * src/components/MenuItemSelectRow.tsx
 *
 * A fully controlled row for selecting a menu item and rating it.
 *
 * Structure:
 *   ┌─────────────────────────────────────────────────────┐
 *   │  [■]  Item Name               CATEGORY   £price    │  ← always visible, tap to toggle
 *   ├─────────────────────────────────────────────────────┤  (only when selected)
 *   │  FLAVOUR   [1] [2] [3] [4] [5]                     │
 *   │  PRICE     [1] [2] [3] [4] [5]                     │
 *   └─────────────────────────────────────────────────────┘
 *
 * Visual states:
 *   unselected — neutral (#F5F5F5) background, muted text, empty indicator square
 *   selected   — white background, 3px black left border, filled indicator, score area
 *
 * No internal state — the parent (AddMealScreen) owns everything.
 *
 * Props
 *   item          — the MenuItem from static restaurant data
 *   selected      — whether this item is currently checked
 *   flavourScore  — current flavour score (null if not yet chosen)
 *   priceScore    — current price score (null if not yet chosen)
 *   onToggle      — called when the header row is tapped
 *   onFlavourScore — called when a flavour score button is tapped
 *   onPriceScore   — called when a price score button is tapped
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';
import { ScoreSelector } from './ScoreSelector';
import type { MenuItem } from '../types';

type Props = {
  item: MenuItem;
  selected: boolean;
  flavourScore: number | null;
  priceScore: number | null;
  onToggle: () => void;
  onFlavourScore: (score: number) => void;
  onPriceScore: (score: number) => void;
};

export function MenuItemSelectRow({
  item,
  selected,
  flavourScore,
  priceScore,
  onToggle,
  onFlavourScore,
  onPriceScore,
}: Props) {
  return (
    <View style={[styles.wrapper, selected && styles.wrapperSelected]}>
      {/* ── Header row — always visible, toggles selection ─────────────── */}
      <TouchableOpacity
        style={styles.header}
        onPress={onToggle}
        activeOpacity={0.7}
        testID={`menu-item-row-${item.id}`}
      >
        {/* Selection indicator */}
        <View style={[styles.indicator, selected && styles.indicatorSelected]} />

        {/* Name + category */}
        <View style={styles.info}>
          <Text
            style={[styles.name, !selected && styles.nameMuted]}
            numberOfLines={1}
          >
            {item.name}
          </Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>

        {/* Price */}
        <Text style={[styles.price, !selected && styles.priceMuted]}>
          £{item.price.toFixed(2)}
        </Text>
      </TouchableOpacity>

      {/* ── Score area — visible only when selected ─────────────────────── */}
      {selected && (
        <View style={styles.scoreArea}>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Flavour</Text>
            <View style={styles.selectorWrap}>
              <ScoreSelector
                value={flavourScore}
                onSelect={onFlavourScore}
                testID={`flavour-${item.id}`}
              />
            </View>
          </View>

          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Price</Text>
            <View style={styles.selectorWrap}>
              <ScoreSelector
                value={priceScore}
                onSelect={onPriceScore}
                testID={`price-${item.id}`}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // ── Wrapper ────────────────────────────────────────────────────────────────
  wrapper: {
    backgroundColor: Colors.neutral,
    marginBottom: 2,
  },
  wrapperSelected: {
    backgroundColor: Colors.white,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },

  // ── Header row ─────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  indicator: {
    width: 18,
    height: 18,
    backgroundColor: Colors.border,
    marginRight: 12,
    flexShrink: 0,
  },
  indicatorSelected: {
    backgroundColor: Colors.primary,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: FontSize.body,
    fontWeight: '600',
    color: Colors.primary,
  },
  nameMuted: {
    fontWeight: '400',
    color: Colors.secondary,
  },
  category: {
    fontSize: FontSize.label,
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  price: {
    fontSize: FontSize.body,
    fontWeight: '600',
    color: Colors.primary,
    flexShrink: 0,
  },
  priceMuted: {
    fontWeight: '400',
    color: Colors.secondary,
  },

  // ── Score area ─────────────────────────────────────────────────────────────
  scoreArea: {
    backgroundColor: Colors.neutral,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
    rowGap: 10,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreLabel: {
    width: 56,
    fontSize: FontSize.label,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    flexShrink: 0,
  },
  selectorWrap: {
    flex: 1,
  },
});
