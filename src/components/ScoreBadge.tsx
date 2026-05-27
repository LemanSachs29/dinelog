/**
 * src/components/ScoreBadge.tsx
 *
 * A compact square badge that displays a numeric score or "N/A".
 *
 * Two visual states:
 *   scored  — black background, white text  (e.g. "4.2")
 *   no data — neutral (#F5F5F5) background, secondary text  ("N/A")
 *
 * The score value should already be formatted before passing in.
 * Use formatScore() from src/utils/formatting.ts to produce the string.
 *
 * Props
 *   score   — pass the raw number | null; the component calls formatScore internally
 *   size    — optional override; defaults to 'md' (52×52)
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';
import { formatScore } from '../utils/formatting';

type Size = 'sm' | 'md';

type Props = {
  score: number | null;
  size?: Size;
};

const DIMENSIONS: Record<Size, number> = {
  sm: 40,
  md: 52,
};

export function ScoreBadge({ score, size = 'md' }: Props) {
  const label  = formatScore(score);
  const dim    = DIMENSIONS[size];
  const scored = score !== null;

  return (
    <View
      style={[
        styles.badge,
        { width: dim, height: dim },
        scored ? styles.scored : styles.empty,
      ]}
    >
      <Text style={[styles.text, scored ? styles.textScored : styles.textEmpty]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scored: {
    backgroundColor: Colors.primary,
  },
  empty: {
    backgroundColor: Colors.neutral,
  },
  text: {
    fontSize: FontSize.scoreSmall,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  textScored: {
    color: Colors.white,
  },
  textEmpty: {
    color: Colors.secondary,
    fontSize: 11,
    letterSpacing: 1,
  },
});
