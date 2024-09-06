import { screen, RenderResult } from '@testing-library/react';
import React from 'react';
import { render } from '__test__/test-utils-new';
import FormatPrice from './FormatPrice';

let utils: undefined | RenderResult;
const handleAction = jest.fn();

beforeEach(() => {
  utils = render(<FormatPrice price={10} size="small" />);
});

afterEach(() => {
  handleAction.mockReset();
});

test('FormatPrice - render price with 2 decimal places', () => {
  const { rerender } = utils!;

  expect(screen.getByText('10,00')).toBeInTheDocument();

  rerender(<FormatPrice price={10.0} size="small" />);

  expect(screen.getByText('10,00')).toBeInTheDocument();
});

test('FormatPrice - render price size', () => {
  const { rerender } = utils!;

  expect(screen.getByText('10,00')).toHaveStyle('font-size: 12px');

  rerender(<FormatPrice price={10.0} size="medium" />);

  expect(screen.getByText('10,00')).toHaveStyle('font-size: 18px');

  rerender(<FormatPrice price={10.0} size="big" />);

  expect(screen.getByText('10,00')).toHaveStyle('font-size: 22px');
});
