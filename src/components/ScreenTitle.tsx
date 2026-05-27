/**
 * src/components/ScreenTitle.tsx
 *
 * Large uppercase screen title with a short black underline accent.
 * Used at the top of every screen.
 *
 * Props
 *   title   — displayed in uppercase; do NOT pre-uppercase the string,
 *             the component handles textTransform so the string stays
 *             readable in source code.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';

type Props = {
  title: string;
};

export function ScreenTitle({ title }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.underline} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 32,
  },
  title: {
    fontSize: FontSize.screenTitle,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    lineHeight: FontSize.screenTitle * 1.1,
  },
  underline: {
    width: 48,
    height: 3,
    backgroundColor: Colors.primary,
    marginTop: 10,
  },
});
