/**
 * RestaurantListScreen
 *
 * Displays all 10 York restaurants as scrollable cards.
 * Lives in the Restaurants tab — the default landing screen after login.
 *
 * Phase 1: placeholder with one demo navigation button.
 * Phase 4: FlatList of RestaurantCard components using seed data from src/data/restaurants.ts.
 *           Each card navigates to RestaurantDetail with the real restaurantId.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';
import type { RestaurantsStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RestaurantsStackParamList, 'RestaurantList'>;

export function RestaurantListScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>

        {/* ── Title ─────────────────────────────────────────────────────── */}
        <Text style={styles.title}>Restaurants</Text>
        <View style={styles.titleUnderline} />

        {/* ── Placeholder notice ────────────────────────────────────────── */}
        <Text style={styles.description}>
          Phase 4 will render all 10 York restaurants as scrollable cards,
          each showing name, image placeholder, address, short description,
          and average score (or N/A).
        </Text>

        {/* ── TODO Phase 4: FlatList of RestaurantCard ─────────────────── */}

        {/* ── Demo navigation ───────────────────────────────────────────── */}
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() =>
            navigation.navigate('RestaurantDetail', { restaurantId: 'rest-01' })
          }
          activeOpacity={0.8}
        >
          <Text style={styles.buttonPrimaryText}>Open Restaurant (demo)</Text>
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
    paddingTop: 16,
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
