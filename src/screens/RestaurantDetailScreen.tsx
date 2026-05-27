/**
 * RestaurantDetailScreen
 *
 * The hub screen.  Shows restaurant info, menu with per-item average scores,
 * the user's previous meals at this restaurant, and the "Add New Meal" CTA.
 *
 * Phase 1: placeholder showing the restaurantId received via route params.
 * Phase 5: full ScrollView layout — image, description, MENU section,
 *           LAST MEALS section — all computed from seed data + AsyncStorage meals.
 */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';
import type { RestaurantsStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RestaurantsStackParamList, 'RestaurantDetail'>;

export function RestaurantDetailScreen({ navigation, route }: Props) {
  const { restaurantId } = route.params;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <View style={styles.content}>

        {/* ── Title ─────────────────────────────────────────────────────── */}
        <Text style={styles.label}>Restaurant Profile</Text>
        <Text style={styles.title}>The Archive{'\n'}Kitchen</Text>
        <View style={styles.titleUnderline} />

        {/* ── Placeholder notice ────────────────────────────────────────── */}
        <Text style={styles.description}>
          ID: {restaurantId}
          {'\n\n'}
          Phase 5 will show image, description, average score, MENU section
          with per-item averages, and LAST MEALS list for this user.
        </Text>

        {/* ── TODO Phase 5: image placeholder ─────────────────────────── */}
        {/* ── TODO Phase 5: MENU section (MenuItemStatRow × N) ─────────── */}
        {/* ── TODO Phase 5: LAST MEALS section (DateBadge rows) ────────── */}

        {/* ── Add New Meal CTA ──────────────────────────────────────────── */}
        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate('AddMeal', { restaurantId })}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonPrimaryText}>Add New Meal  +</Text>
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
  label: {
    fontSize: FontSize.label,
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontSize: FontSize.screenTitle,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    lineHeight: 46,
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
