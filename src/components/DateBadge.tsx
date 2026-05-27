/**
 * src/components/DateBadge.tsx
 *
 * A compact square calendar badge used in the RestaurantDetail "Last Meals" section.
 *
 * Visual layout:
 *   ┌──────┐
 *   │ OCT  │  ← month abbreviation, small caps, secondary colour
 *   │  24  │  ← day number, bold, primary colour
 *   └──────┘
 *
 * Props
 *   date  — ISO date string 'YYYY-MM-DD'; the component handles formatting internally
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { formatDateBadge } from '../utils/formatting';

type Props = {
  date: string;
};

export function DateBadge({ date }: Props) {
  const { day, month } = formatDateBadge(date);

  return (
    <View style={styles.badge}>
      <Text style={styles.month}>{month}</Text>
      <Text style={styles.day}>{day}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 52,
    height: 52,
    backgroundColor: Colors.neutral,
    alignItems: 'center',
    justifyContent: 'center',
  },
  month: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  day: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
    lineHeight: 24,
  },
});
