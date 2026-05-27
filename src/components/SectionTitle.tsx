/**
 * src/components/SectionTitle.tsx
 *
 * Small-caps section heading with a thin bottom divider.
 * Used to label content blocks: MENU, LAST MEALS, ITEMIZED BREAKDOWN, etc.
 *
 * Props
 *   title  — section label; rendered uppercase by the component
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';

type Props = {
  title: string;
};

export function SectionTitle({ title }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 4,
  },
  text: {
    fontSize: FontSize.sectionTitle,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginTop: 8,
  },
});
