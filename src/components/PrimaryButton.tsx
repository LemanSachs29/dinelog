/**
 * src/components/PrimaryButton.tsx
 *
 * The single primary action button per screen.
 * Black background, white uppercase label.
 *
 * Props
 *   label     — button text (rendered uppercase by the component)
 *   onPress   — tap handler
 *   disabled  — when true: reduces opacity and blocks taps
 *   testID    — forwarded to the touchable for RNTL test queries
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  testID?: string;
};

export function PrimaryButton({ label, onPress, disabled = false, testID }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      testID={testID}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  label: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
