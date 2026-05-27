/**
 * RegisterScreen
 *
 * Allows new users to create an account with full name, username, and password.
 *
 * Phase 1: placeholder navigation only.
 * Phase 3: form inputs, validation, userStorage.saveUser(), navigate to Login.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export function RegisterScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        {/* ── Title ─────────────────────────────────────────────────────── */}
        <Text style={styles.title}>New Registry</Text>
        <View style={styles.titleUnderline} />

        {/* ── Placeholder notice ────────────────────────────────────────── */}
        <Text style={styles.description}>
          Phase 3 will add full name, username, and password inputs with
          validation and AsyncStorage persistence.
        </Text>

        {/* ── TODO Phase 3: Full name input ────────────────────────────── */}
        {/* ── TODO Phase 3: Username input ─────────────────────────────── */}
        {/* ── TODO Phase 3: Password input ─────────────────────────────── */}

        {/* ── Primary action ────────────────────────────────────────────── */}
        {/* TODO Phase 3: validate → userStorage.saveUser() → navigate back to Login */}
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonPrimaryText}>Register</Text>
        </TouchableOpacity>

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
  },
  buttonPrimaryText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
