/**
 * src/screens/ConfirmMealScreen.tsx
 *
 * Modal sheet presented over AddMealScreen.
 * Shows a full read-only summary of the meal draft and offers two actions:
 *
 *   Confirm → builds a MealEntry, saves it, pops both this modal and AddMeal
 *             so the user lands back on RestaurantDetail (pop(2)).
 *
 *   Edit    → goBack() — React Navigation preserves AddMeal's local state
 *             naturally, so all selections and scores are still there.
 *
 * Nothing is saved until the user presses Confirm.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Colors } from '../constants/colors';
import { FontSize } from '../constants/typography';
import { useAuthContext } from '../context/AuthContext';
import { saveMeal } from '../storage/mealStorage';
import { findRestaurantById } from '../data/restaurants';
import {
  calcAvgFlavour,
  calcAvgPrice,
  calcMealCombinedAvg,
} from '../utils/calculations';
import {
  formatDateLong,
  formatTime24to12,
  formatScore,
  generateId,
} from '../utils/formatting';
import { SectionTitle } from '../components/SectionTitle';
import { MealItemRow } from '../components/MealItemRow';
import { PrimaryButton } from '../components/PrimaryButton';
import { SecondaryButton } from '../components/SecondaryButton';
import type { MealEntry } from '../types';
import type { RestaurantsStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RestaurantsStackParamList, 'ConfirmMeal'>;

export function ConfirmMealScreen({ navigation, route }: Props) {
  const { draft }      = route.params;
  const { currentUser } = useAuthContext();

  const restaurant = findRestaurantById(draft.restaurantId);

  // ── Save state ────────────────────────────────────────────────────────────
  const [isSaving, setIsSaving]     = useState(false);
  const [saveError, setSaveError]   = useState('');

  // ── Pre-compute scores (pure, no async) ───────────────────────────────────
  const avgFlavour = calcAvgFlavour(draft.items);
  const avgPrice   = calcAvgPrice(draft.items);
  const combined   = calcMealCombinedAvg(draft.items);

  // ── Build a fast lookup: menuItemId → item name ───────────────────────────
  const menuNameMap: Record<string, string> = {};
  if (restaurant) {
    for (const item of restaurant.menu) {
      menuNameMap[item.id] = item.name;
    }
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  async function handleConfirm() {
    if (!currentUser) {
      setSaveError('You must be logged in to save a meal.');
      return;
    }
    if (!restaurant) {
      setSaveError('Restaurant data not found. Cannot save.');
      return;
    }

    setIsSaving(true);
    setSaveError('');

    try {
      const entry: MealEntry = {
        id:           generateId(),
        restaurantId: draft.restaurantId,
        userId:       currentUser.id,
        date:         draft.date,
        time:         draft.time,
        items:        draft.items,
      };

      await saveMeal(entry);

      // Pop this modal (ConfirmMeal) and AddMeal together.
      // The user lands on RestaurantDetail, where useFocusEffect will reload
      // meals and update the score badge and Last Meals section automatically.
      navigation.pop(2);
    } catch {
      setSaveError('Failed to save the meal. Please try again.');
      setIsSaving(false);
    }
  }

  function handleEdit() {
    // goBack() dismisses the modal and returns to AddMealScreen.
    // React Navigation preserves AddMeal's useState values — no reset needed.
    navigation.goBack();
  }

  // ── Guard: restaurant not found ───────────────────────────────────────────

  if (!restaurant) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        <View style={styles.errorState}>
          <Text style={styles.errorText}>Restaurant not found.</Text>
          <SecondaryButton label="Go Back" onPress={handleEdit} />
        </View>
      </SafeAreaView>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Modal header ─────────────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.title}>Confirm Meal</Text>
          <View style={styles.titleUnderline} />
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
        </View>

        <View style={styles.body}>

          {/* ── Date & Time ──────────────────────────────────────────────── */}
          <View style={styles.metaBlock}>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Date</Text>
              <Text style={styles.metaValue}>{formatDateLong(draft.date)}</Text>
            </View>
            <View style={styles.metaRow}>
              <Text style={styles.metaLabel}>Time</Text>
              <Text style={styles.metaValue}>{formatTime24to12(draft.time)}</Text>
            </View>
          </View>

          {/* ── Selected items ───────────────────────────────────────────── */}
          <View style={styles.sectionWrap}>
            <SectionTitle title="Selected Items" />
            {draft.items.map((rating) => (
              <MealItemRow
                key={rating.menuItemId}
                itemName={menuNameMap[rating.menuItemId] ?? rating.menuItemId}
                flavourScore={rating.flavourScore}
                priceScore={rating.priceScore}
              />
            ))}
          </View>

          {/* ── Score summary ────────────────────────────────────────────── */}
          <View style={styles.sectionWrap}>
            <SectionTitle title="Meal Scores" />
            <View style={styles.scoreBlock}>
              <View style={styles.scoreBlockRow}>
                <Text style={styles.scoreBlockLabel}>Avg Flavour</Text>
                <Text style={styles.scoreBlockValue}>{formatScore(avgFlavour)}</Text>
              </View>
              <View style={styles.scoreBlockDivider} />
              <View style={styles.scoreBlockRow}>
                <Text style={styles.scoreBlockLabel}>Avg Price</Text>
                <Text style={styles.scoreBlockValue}>{formatScore(avgPrice)}</Text>
              </View>
              <View style={styles.scoreBlockDivider} />
              <View style={styles.scoreBlockRow}>
                <Text style={styles.scoreBlockLabel}>Combined</Text>
                <Text style={styles.scoreBlockCombined}>{formatScore(combined)}</Text>
              </View>
            </View>
          </View>

          {/* ── Save error ───────────────────────────────────────────────── */}
          {saveError ? (
            <View style={styles.errorBox}>
              <Text style={styles.errorBoxText}>{saveError}</Text>
            </View>
          ) : null}

          {/* ── Actions ─────────────────────────────────────────────────── */}
          <View style={styles.actions}>
            <PrimaryButton
              label={isSaving ? 'Saving…' : 'Confirm & Save'}
              onPress={handleConfirm}
              disabled={isSaving}
              testID="btn-confirm"
            />
            <View style={styles.actionGap} />
            <SecondaryButton
              label="Edit"
              onPress={handleEdit}
              disabled={isSaving}
              testID="btn-edit"
            />
          </View>

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

  // ── Header ─────────────────────────────────────────────────────────────────
  header: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.primary,
    textTransform: 'uppercase',
    lineHeight: 28 * 1.1,
  },
  titleUnderline: {
    width: 48,
    height: 3,
    backgroundColor: Colors.primary,
    marginTop: 10,
    marginBottom: 14,
  },
  restaurantName: {
    fontSize: FontSize.body,
    color: Colors.secondary,
  },

  // ── Body ───────────────────────────────────────────────────────────────────
  body: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  // ── Date/Time meta block ───────────────────────────────────────────────────
  metaBlock: {
    backgroundColor: Colors.neutral,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    rowGap: 8,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metaLabel: {
    fontSize: FontSize.label,
    fontWeight: '700',
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  metaValue: {
    fontSize: FontSize.body,
    fontWeight: '600',
    color: Colors.primary,
  },

  // ── Section wrapper ────────────────────────────────────────────────────────
  sectionWrap: {
    marginBottom: 24,
  },

  // ── Score block ────────────────────────────────────────────────────────────
  scoreBlock: {
    backgroundColor: Colors.neutral,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  scoreBlockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  scoreBlockDivider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  scoreBlockLabel: {
    fontSize: FontSize.label,
    fontWeight: '700',
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scoreBlockValue: {
    fontSize: FontSize.sectionTitle,
    fontWeight: '700',
    color: Colors.primary,
  },
  scoreBlockCombined: {
    // Combined score is the headline number — displayed larger
    fontSize: FontSize.scoreMedium,
    fontWeight: '700',
    color: Colors.primary,
  },

  // ── Error box ──────────────────────────────────────────────────────────────
  errorBox: {
    backgroundColor: '#FFF5F5',
    borderLeftWidth: 3,
    borderLeftColor: '#C0392B',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  errorBoxText: {
    fontSize: FontSize.body,
    color: '#C0392B',
    lineHeight: 20,
  },

  // ── Action buttons ─────────────────────────────────────────────────────────
  actions: {
    marginTop: 8,
  },
  actionGap: {
    height: 12,
  },

  // ── Error guard ────────────────────────────────────────────────────────────
  errorState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    rowGap: 20,
  },
  errorText: {
    fontSize: FontSize.body,
    color: Colors.secondary,
    textAlign: 'center',
  },
});
