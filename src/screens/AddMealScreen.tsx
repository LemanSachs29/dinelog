/**
 * src/screens/AddMealScreen.tsx
 *
 * Data-entry screen for recording a meal at a restaurant.
 *
 * The user:
 *   1. Enters a date (YYYY-MM-DD) and time (HH:MM) — pre-filled with today/now
 *   2. Taps menu items to select them
 *   3. Assigns a flavour score (1–5) and a price score (1–5) to each selected item
 *   4. Taps Continue → validated draft is passed to ConfirmMealScreen as a modal
 *
 * State preservation (CONF-02 requirement):
 *   All form state lives in this component. React Navigation preserves it naturally
 *   when ConfirmMeal calls navigation.goBack() — no reset is ever needed here.
 *   Do NOT clear state in useFocusEffect.
 *
 * Tab bar:
 *   Hidden while this screen is focused; restored on blur via useFocusEffect.
 */

import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';
import { findRestaurantById } from '../data/restaurants';
import { validateMealEntry, isValidDate, isValidTime } from '../utils/validation';
import { SectionTitle } from '../components/SectionTitle';
import { FormInput } from '../components/FormInput';
import { MenuItemSelectRow } from '../components/MenuItemSelectRow';
import { PrimaryButton } from '../components/PrimaryButton';
import type { MealDraft, MealItemRating } from '../types';
import type { RestaurantsStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RestaurantsStackParamList, 'AddMeal'>;

// ── Types ─────────────────────────────────────────────────────────────────────

/** Per-item scores held in local state (null = not yet selected by the user) */
type ItemSelection = {
  flavourScore: number | null;
  priceScore: number | null;
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function todayDate(): string {
  return new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'
}

function currentTime(): string {
  const now = new Date();
  const h   = String(now.getHours()).padStart(2, '0');
  const m   = String(now.getMinutes()).padStart(2, '0');
  return `${h}:${m}`; // 'HH:MM'
}

// ── Screen ────────────────────────────────────────────────────────────────────

export function AddMealScreen({ navigation, route }: Props) {
  const { restaurantId } = route.params;
  const restaurant       = findRestaurantById(restaurantId);

  // ── Form state ────────────────────────────────────────────────────────────
  //
  // Initialised once on mount. React Navigation preserves these values when
  // the user navigates to ConfirmMeal and presses Edit (goBack) — no manual
  // preservation logic is required.

  const [date, setDate]       = useState<string>(todayDate);
  const [time, setTime]       = useState<string>(currentTime);

  // Only selected items are in this map; deselecting removes the entry.
  const [selections, setSelections] = useState<Record<string, ItemSelection>>({});

  // Validation error strings rendered above the Continue button.
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // ── Tab bar visibility ────────────────────────────────────────────────────
  //
  // Hides the tab bar while this screen is focused so users can concentrate
  // on recording their meal. Restored on blur.

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
      return () => {
        navigation.getParent()?.setOptions({ tabBarStyle: undefined });
      };
    }, [navigation]),
  );

  // ── Item selection handlers ───────────────────────────────────────────────

  function handleToggle(menuItemId: string) {
    setSelections((prev) => {
      if (prev[menuItemId]) {
        // Deselect: remove from map (also discards any partial scores)
        const next = { ...prev };
        delete next[menuItemId];
        return next;
      }
      // Select: add with no scores yet
      return { ...prev, [menuItemId]: { flavourScore: null, priceScore: null } };
    });
    setValidationErrors([]);
  }

  function handleFlavourScore(menuItemId: string, score: number) {
    setSelections((prev) => ({
      ...prev,
      [menuItemId]: { ...prev[menuItemId], flavourScore: score },
    }));
    setValidationErrors([]);
  }

  function handlePriceScore(menuItemId: string, score: number) {
    setSelections((prev) => ({
      ...prev,
      [menuItemId]: { ...prev[menuItemId], priceScore: score },
    }));
    setValidationErrors([]);
  }

  // ── Validation + navigation ───────────────────────────────────────────────

  function handleContinue() {
    const errors: string[] = [];

    // 1. Date format + calendar check
    const trimDate = date.trim();
    if (!trimDate) {
      errors.push('Please enter a date.');
    } else if (!isValidDate(trimDate)) {
      errors.push('Date must be a valid date in YYYY-MM-DD format (e.g. 2026-05-27).');
    }

    // 2. Time format + range check
    const trimTime = time.trim();
    if (!trimTime) {
      errors.push('Please enter a time.');
    } else if (!isValidTime(trimTime)) {
      errors.push('Time must be in HH:MM format with a valid 24-hour time (e.g. 13:30).');
    }

    // 3. At least one item selected
    const selectedIds = Object.keys(selections);
    if (selectedIds.length === 0) {
      errors.push('Please select at least one menu item.');
    } else {
      // 4. All selected items must have both scores assigned
      const incomplete = selectedIds.filter(
        (id) =>
          selections[id].flavourScore === null ||
          selections[id].priceScore === null,
      );
      if (incomplete.length > 0) {
        errors.push(
          `Please assign flavour and price scores to all selected items` +
          ` (${incomplete.length} item${incomplete.length > 1 ? 's' : ''} incomplete).`,
        );
      }
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Build items array — all scores are non-null at this point
    const items: MealItemRating[] = selectedIds.map((id) => ({
      menuItemId:   id,
      flavourScore: selections[id].flavourScore!,
      priceScore:   selections[id].priceScore!,
    }));

    // Run validateMealEntry as a final safety net
    const { valid, errors: mealErrors } = validateMealEntry({ items });
    if (!valid) {
      setValidationErrors(mealErrors);
      return;
    }

    const draft: MealDraft = {
      restaurantId,
      date:  trimDate,
      time:  trimTime,
      items,
    };

    // Navigate to ConfirmMeal; this screen's state is preserved naturally.
    // ConfirmMeal calls navigation.goBack() on Edit — no reset needed.
    navigation.navigate('ConfirmMeal', { draft });
  }

  // ── Guard: invalid restaurantId ───────────────────────────────────────────

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.errorState}>
          <Text style={styles.errorText}>Restaurant not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Screen title ─────────────────────────────────────────────── */}
        <View style={styles.titleSection}>
          <Text style={styles.screenTitle}>Add Meal</Text>
          <View style={styles.titleUnderline} />
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
        </View>

        {/* ── Date & Time inputs ───────────────────────────────────────── */}
        <View style={styles.section}>
          <SectionTitle title="Date & Time" />
          <FormInput
            label="Date"
            value={date}
            onChangeText={(t) => { setDate(t); setValidationErrors([]); }}
            placeholder="YYYY-MM-DD"
            autoCorrect={false}
            returnKeyType="next"
            testID="input-date"
          />
          <FormInput
            label="Time"
            value={time}
            onChangeText={(t) => { setTime(t); setValidationErrors([]); }}
            placeholder="HH:MM"
            autoCorrect={false}
            returnKeyType="done"
            testID="input-time"
          />
        </View>

        {/* ── Menu items ───────────────────────────────────────────────── */}
        <View style={styles.sectionHeader}>
          <SectionTitle title="Menu Items" />
          <Text style={styles.sectionHint}>
            Tap an item to select it, then rate flavour and price.
          </Text>
        </View>

        {/* MenuItemSelectRow items go edge-to-edge (no paddingHorizontal) */}
        {restaurant.menu.map((item) => (
          <MenuItemSelectRow
            key={item.id}
            item={item}
            selected={!!selections[item.id]}
            flavourScore={selections[item.id]?.flavourScore ?? null}
            priceScore={selections[item.id]?.priceScore ?? null}
            onToggle={() => handleToggle(item.id)}
            onFlavourScore={(s) => handleFlavourScore(item.id, s)}
            onPriceScore={(s) => handlePriceScore(item.id, s)}
          />
        ))}

        {/* ── Validation errors + Continue button ─────────────────────── */}
        <View style={styles.footer}>
          {validationErrors.length > 0 && (
            <View style={styles.errorBox}>
              {validationErrors.map((err, i) => (
                <Text key={i} style={styles.errorLine}>
                  {err}
                </Text>
              ))}
            </View>
          )}

          <PrimaryButton
            label="Continue"
            onPress={handleContinue}
            testID="btn-continue"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // ── Title section ──────────────────────────────────────────────────────────
  titleSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
  },
  screenTitle: {
    fontSize: FontSize.screenTitle,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    lineHeight: FontSize.screenTitle * 1.1,
  },
  titleUnderline: {
    width: 48,
    height: 3,
    backgroundColor: Colors.primary,
    marginTop: 10,
    marginBottom: 12,
  },
  restaurantName: {
    fontSize: FontSize.body,
    color: Colors.secondary,
    marginBottom: 8,
  },

  // ── Padded section (date/time) ─────────────────────────────────────────────
  section: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },

  // ── Menu items section header ──────────────────────────────────────────────
  sectionHeader: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
  },
  sectionHint: {
    fontSize: FontSize.label,
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 4,
  },

  // ── Footer ─────────────────────────────────────────────────────────────────
  footer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  errorBox: {
    backgroundColor: '#FFF5F5',
    borderLeftWidth: 3,
    borderLeftColor: '#C0392B',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  errorLine: {
    fontSize: FontSize.body,
    color: '#C0392B',
    lineHeight: 20,
  },

  // ── Error guard ────────────────────────────────────────────────────────────
  errorState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  errorText: {
    fontSize: FontSize.body,
    color: Colors.secondary,
  },
});
