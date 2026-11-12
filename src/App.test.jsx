import { expect, test } from 'vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

test('shows the shop menu and filters treats by category', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /a little hole lot of happy/i })).toBeDefined();
  expect(screen.getByRole('heading', { name: 'Strawberry glaze' })).toBeDefined();

  fireEvent.click(screen.getByRole('button', { name: 'Filled' }));

  expect(screen.getByRole('heading', { name: 'Lemon daydream' })).toBeDefined();
  expect(screen.queryByRole('heading', { name: 'Strawberry glaze' })).toBeNull();
});

test('adds treats to the bag and updates the subtotal', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'Add Strawberry glaze to bag' }));
  fireEvent.click(screen.getByRole('button', { name: 'Add Strawberry glaze to bag' }));
  fireEvent.click(screen.getByRole('button', { name: /open bag, 2 items/i }));

  const bag = screen.getByRole('complementary', { name: 'Your bag' });
  expect(within(bag).getByText('$7.00')).toBeDefined();
  expect(within(bag).getByText('Strawberry glaze')).toBeDefined();

  fireEvent.click(within(bag).getByRole('button', { name: 'Remove one Strawberry glaze' }));

  const subtotalRow = within(bag).getByText('Subtotal').parentElement;
  expect(within(subtotalRow).getByText('$3.50')).toBeDefined();
});
