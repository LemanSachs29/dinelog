/**
 * src/screens/LoginScreen.tsx
 *
 * Entry screen — username + password login with biometric shortcut.
 *
 * Flow:
 *   1. User fills in username and password.
 *   2. PrimaryButton press → validateLogin() → field errors if invalid.
 *   3. If valid → AuthContext.login() →
 *        'ok'      → AppNavigator auto-navigates to Main (no navigate() call needed)
 *        'invalid' → submitError shown below the password field
 *   4. Biometric button → AuthContext.loginBiometric() →
 *        'ok'          → AppNavigator auto-navigates to Main
 *        'unavailable' → inline message below the button
 *        'failed'      → inline message below the button
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
import { validateLogin } from '../utils/validation';
import { ScreenTitle } from '../components/ScreenTitle';
import { FormInput } from '../components/FormInput';
import { PrimaryButton } from '../components/PrimaryButton';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  const { login } = useAuthContext();

  // ── Form state ────────────────────────────────────────────────────────────
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Field-level errors (from validateLogin)
  const [fieldErrors, setFieldErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  // Server-level error shown below the form (wrong credentials)
  const [submitError, setSubmitError] = useState('');

  // Prevents double-submit while the async call is in flight
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Ref for moving focus from username → password via the keyboard "Next" key
  const passwordRef = useRef<TextInput>(null);

  // ── Handlers ──────────────────────────────────────────────────────────────

  function clearErrors() {
    setFieldErrors({});
    setSubmitError('');
  }

  async function handleLogin() {
    clearErrors();

    const { valid, errors } = validateLogin({ username, password });
    if (!valid) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    const result = await login(username.trim(), password);

    if (result === 'invalid') {
      setSubmitError('Username or password is incorrect.');
      setIsSubmitting(false);
      // On 'ok': AuthContext sets currentUser → AppNavigator renders Main automatically
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ScreenTitle title="Login" />

          {/* ── Inputs ──────────────────────────────────────────────────── */}
          <FormInput
            label="Username"
            value={username}
            onChangeText={(t) => { setUsername(t); clearErrors(); }}
            placeholder="your_username"
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
            onSubmitEditing={handleLogin}
            error={fieldErrors.password}
            testID="input-password"
          />

          {/* ── Credentials error ────────────────────────────────────────── */}
          {submitError ? (
            <Text style={styles.submitError}>{submitError}</Text>
          ) : null}

          {/* ── Actions ──────────────────────────────────────────────────── */}
          <View style={styles.actions}>
            <PrimaryButton
              label="Login"
              onPress={handleLogin}
              disabled={isSubmitting}
              testID="btn-login"
            />
          </View>

          {/* ── Register link ─────────────────────────────────────────────── */}
          <View style={styles.registerRow}>
            <Text style={styles.registerHint}>No account?{'  '}</Text>
            <Text
              style={styles.registerLink}
              onPress={() => navigation.navigate('Register')}
            >
              Register
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
  submitError: {
    fontSize: 12,
    color: '#C0392B',
    marginBottom: 12,
    marginTop: -4,
  },
  actions: {
    marginTop: 8,
    marginBottom: 32,
  },
  registerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerHint: {
    fontSize: FontSize.label,
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  registerLink: {
    fontSize: FontSize.label,
    color: Colors.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    textDecorationLine: 'underline',
  },
});
