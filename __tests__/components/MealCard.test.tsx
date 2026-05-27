/**
 * __tests__/components/MealCard.test.tsx
 *
 * Component tests for src/components/MealCard.tsx
 *
 * Test plan coverage:
 *   COMP-03  MealCard displays the restaurant name
 *   COMP-04  MealCard displays 'N/A' when combinedScore is null
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MealCard } from '../../src/components/MealCard';
import type { MealEntry } from '../../src/types';

const MEAL: MealEntry = {
  id: 'meal-test-01',
  restaurantId: 'rest-01',
  userId: 'u-001',
  date: '2026-05-27',
  time: '13:00',
  items: [{ menuItemId: 'item-01', flavourScore: 4, priceScore: 3 }],
};

// COMP-03
it('displays the restaurant name passed as a prop', () => {
  const { getByText } = render(
    <MealCard
      meal={MEAL}
      restaurantName="The Golden Fleece"
      combinedScore={3.5}
      onPress={() => {}}
    />,
  );
  expect(getByText('The Golden Fleece')).toBeTruthy();
});

// COMP-04
it('displays "N/A" in the score badge when combinedScore is null', () => {
  const { getByText } = render(
    <MealCard
      meal={MEAL}
      restaurantName="The Golden Fleece"
      combinedScore={null}
      onPress={() => {}}
    />,
  );
  expect(getByText('N/A')).toBeTruthy();
});
