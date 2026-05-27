/**
 * src/components/SecondaryButton.tsx
 *
 * Secondary action button with a neutral (light grey) background.
 * Used for biometric login, the "Edit" action in ConfirmMeal, etc.
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

export function SecondaryButton({ label, onPress, disabled = false, testID }: Props) {
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
    backgroundColor: Colors.neutral,
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  label: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
