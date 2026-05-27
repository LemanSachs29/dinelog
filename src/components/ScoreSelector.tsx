/**
 * src/components/ScoreSelector.tsx
 *
 * A row of five pressable score buttons (1 – 5).
 *
 * Visual states:
 *   unselected — neutral (#F5F5F5) background, primary text
 *   selected   — primary (black) background, white text
 *
 * Fully controlled: the parent owns the selected value.
 * Used twice per selected menu item in AddMealScreen (flavour + price).
 *
 * Props
 *   value     — currently selected score (1–5), or null if not yet set
 *   onSelect  — called with the tapped score number
 *   testID    — when provided, each button gets testID `{testID}-{n}` for RNTL
 */

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

const SCORES = [1, 2, 3, 4, 5] as const;

type Props = {
  value: number | null;
  onSelect: (score: number) => void;
  testID?: string;
};

export function ScoreSelector({ value, onSelect, testID }: Props) {
  return (
    <View style={styles.row}>
      {SCORES.map((n) => {
        const active = value === n;
        return (
          <TouchableOpacity
            key={n}
            style={[styles.btn, active && styles.btnActive]}
            onPress={() => onSelect(n)}
            activeOpacity={0.7}
            testID={testID ? `${testID}-${n}` : undefined}
          >
            <Text style={[styles.label, active && styles.labelActive]}>
              {n}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 6,
  },
  btn: {
    flex: 1,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.neutral,
  },
  btnActive: {
    backgroundColor: Colors.primary,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  labelActive: {
    color: Colors.white,
  },
});
