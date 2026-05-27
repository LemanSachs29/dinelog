/**
 * __tests__/components/ScoreBadge.test.tsx
 *
 * Component tests for src/components/ScoreBadge.tsx
 *
 * Test plan coverage:
 *   COMP-01  score=null  → badge displays 'N/A'
 *   COMP-02  score=4.2   → badge displays '4.2'
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import { ScoreBadge } from '../../src/components/ScoreBadge';

// COMP-01
it('renders "N/A" when the score prop is null', () => {
  const { getByText } = render(<ScoreBadge score={null} />);
  expect(getByText('N/A')).toBeTruthy();
});

// COMP-02
it('renders the formatted score string when a numeric score is provided', () => {
  const { getByText } = render(<ScoreBadge score={4.2} />);
  expect(getByText('4.2')).toBeTruthy();
});
