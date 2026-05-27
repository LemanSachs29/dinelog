/**
 * src/screens/RegisterScreen.tsx
 *
 * New account creation — full name, username, password.
 *
 * Flow:
 *   1. User fills in all three fields.
 *   2. PrimaryButton press → validateRegistration() → field errors if invalid.
 *   3. If valid → AuthContext.register() →
 *        'ok'            → AppNavigator auto-navigates to Main (no navigate() call needed)
 *        'username_taken'→ inline error on the username field
 *
 * Navigation:
 *   - "Back to Login" link → navigation.goBack() (returns to LoginScreen)
 *   - Hardware back button (Android) is handled automatically by React Navigation
 */

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';
import { useAuthContext } from '../context/AuthContext';
import { validateRegistration } from '../utils/validation';
import { ScreenTitle } from '../components/ScreenTitle';
import { FormInput } from '../components/FormInput';
import { PrimaryButton } from '../components/PrimaryButton';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  const { register } = useAuthContext();

  // ── Form state ────────────────────────────────────────────────────────────
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Field-level errors (from validateRegistration + username_taken)
  const [fieldErrors, setFieldErrors] = useState<{
    fullName?: string;
    username?: string;
    password?: string;
  }>({});

  // Prevents double-submit while the async call is in flight
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs for "Next" key focus progression
  const usernameRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  // ── Handlers ──────────────────────────────────────────────────────────────

  function clearErrors() {
    setFieldErrors({});
  }

  async function handleRegister() {
    clearErrors();

    const { valid, errors } = validateRegistration({ fullName, username, password });
    if (!valid) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    const result = await register(fullName.trim(), username.trim(), password);

    if (result === 'username_taken') {
      setFieldErrors({ username: 'This username is already taken.' });
      setIsSubmitting(false);
      // On 'ok': AuthContext sets currentUser → AppNavigator renders Main automatically
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      {/*
       * edges={['bottom']} — the top safe area is already handled by the
       * navigator header (DINE_LOG) that Register is presented inside.
       */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ScreenTitle title="New Account" />

          {/* ── Inputs ──────────────────────────────────────────────────── */}
          <FormInput
            label="Full Name"
            value={fullName}
            onChangeText={(t) => { setFullName(t); clearErrors(); }}
            placeholder="Jane Smith"
            autoCapitalize="words"
            returnKeyType="next"
            onSubmitEditing={() => usernameRef.current?.focus()}
            error={fieldErrors.fullName}
            testID="input-fullname"
          />

          <FormInput
            ref={usernameRef}
            label="Username"
            value={username}
            onChangeText={(t) => { setUsername(t); clearErrors(); }}
            placeholder="jane_smith"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            error={fieldErrors.username}
            testID="input-username"
          />

          <FormInput
            ref={passwordRef}
            label="Password"
            value={password}
            onChangeText={(t) => { setPassword(t); clearErrors(); }}
            placeholder="••••••••"
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleRegister}
            error={fieldErrors.password}
            testID="input-password"
          />

          {/* ── Primary action ───────────────────────────────────────────── */}
          <PrimaryButton
            label="Create Account"
            onPress={handleRegister}
            disabled={isSubmitting}
            testID="btn-register"
          />

          {/* ── Back to Login link ───────────────────────────────────────── */}
          <View style={styles.loginRow}>
            <Text style={styles.loginHint}>Already registered?{'  '}</Text>
            <Text
              style={styles.loginLink}
              onPress={() => navigation.goBack()}
            >
              Back to Login
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginHint: {
    fontSize: FontSize.label,
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  loginLink: {
    fontSize: FontSize.label,
    color: Colors.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textDecorationLine: 'underline',
  },
});
