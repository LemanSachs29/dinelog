/**
 * src/components/FormInput.tsx
 *
 * Labelled text input with an optional inline error message.
 *
 * Uses React.forwardRef so the parent screen can forward focus between
 * fields (e.g. username "Next" key moves focus to password field).
 *
 * Props
 *   label          — small-caps field label rendered above the input
 *   value          — controlled value
 *   onChangeText   — controlled setter
 *   placeholder    — dim placeholder text
 *   secureTextEntry — hides typed characters (password fields)
 *   autoCapitalize  — default 'none' (suitable for usernames/passwords)
 *   autoCorrect     — default false
 *   returnKeyType   — forwarded to TextInput
 *   onSubmitEditing — forwarded to TextInput (use for field-to-field navigation)
 *   error          — when truthy, renders a red error line below the input
 *   testID         — forwarded to TextInput for RNTL test queries
 */

import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  type TextInputProps,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  autoCorrect?: boolean;
  returnKeyType?: TextInputProps['returnKeyType'];
  onSubmitEditing?: TextInputProps['onSubmitEditing'];
  error?: string;
  testID?: string;
};

export const FormInput = React.forwardRef<TextInput, Props>(
  (
    {
      label,
      value,
      onChangeText,
      placeholder,
      secureTextEntry = false,
      autoCapitalize = 'none',
      autoCorrect = false,
      returnKeyType,
      onSubmitEditing,
      error,
      testID,
    },
    ref,
  ) => {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={ref}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors.tertiary}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          style={[styles.input, error ? styles.inputError : null]}
          testID={testID}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
    );
  },
);

FormInput.displayName = 'FormInput';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 16,
  },
  label: {
    fontSize: FontSize.label,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  input: {
    backgroundColor: Colors.neutral,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: FontSize.body,
    color: Colors.primary,
  },
  inputError: {
    borderBottomWidth: 2,
    borderBottomColor: '#C0392B',
  },
  error: {
    fontSize: 12,
    color: '#C0392B',
    marginTop: 4,
  },
});
