/**
 * LoginScreen
 *
 * Entry point of the app.  Allows users to log in with username + password
 * or with biometric authentication.
 *
 * Phase 1: placeholder navigation only.
 * Phase 3: form inputs, validation, AuthContext integration, biometric call.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export function LoginScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* ── Title ─────────────────────────────────────────────────────── */}
        <Text style={styles.title}>Login</Text>
        <View style={styles.titleUnderline} />

        {/* ── Placeholder notice ────────────────────────────────────────── */}
        <Text style={styles.description}>
          Phase 3 will add username + password inputs and real authentication.
          {'\n\n'}
          Use the buttons below to navigate the app structure.
        </Text>

        {/* ── TODO Phase 3: Username input ─────────────────────────────── */}
        {/* ── TODO Phase 3: Password input ─────────────────────────────── */}

        {/* ── Primary action ────────────────────────────────────────────── */}
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate('Main')}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonPrimaryText}>Execute Login</Text>
        </TouchableOpacity>

        {/* ── Biometric action ──────────────────────────────────────────── */}
        {/* TODO Phase 3: call AuthContext.loginBiometric() */}
        <TouchableOpacity style={styles.buttonSecondary} activeOpacity={0.8}>
          <Text style={styles.buttonSecondaryText}>Biometrics</Text>
        </TouchableOpacity>

        {/* ── Register link ─────────────────────────────────────────────── */}
        <View style={styles.registerRow}>
          <Text style={styles.registerHint}>New to the ecosystem?{'  '}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerLink}>Register Account</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: FontSize.screenTitle,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
  },
  titleUnderline: {
    width: 48,
    height: 3,
    backgroundColor: Colors.primary,
    marginTop: 8,
    marginBottom: 24,
  },
  description: {
    fontSize: FontSize.body,
    color: Colors.secondary,
    lineHeight: 22,
    marginBottom: 32,
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonPrimaryText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  buttonSecondary: {
    backgroundColor: Colors.neutral,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  buttonSecondaryText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  registerRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
