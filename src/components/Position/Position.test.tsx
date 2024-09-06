import { screen, RenderResult } from '@testing-library/react';
import React from 'react';
import { render } from '__test__/test-utils-new';
import Position from './Position';

let utils: undefined | RenderResult;
const handleAction = jest.fn();

beforeEach(() => {
  utils = render(<Position place={1} amount={10} />);
});

afterEach(() => {
  handleAction.mockReset();
});

test('Position - rendering tooltip', () => {
  expect(screen.getByText('1 / 10').parentElement).toHaveStyle(
    'background: #2f80ed',
  );
  expect(screen.getByText('1 / 10')).toBeInTheDocument();
});

test('Position - rendering toltip in the right place', () => {
  const { rerender } = utils!;

  rerender(<Position place={5} amount={10} />);
  expect(screen.getByText('5 / 10').parentElement).toHaveStyle('left: 50%');
});

test('Position - rendering no-data toltip', () => {
  const { rerender } = utils!;

  rerender(<Position />);
  expect(screen.getByText('- / -').parentElement).toHaveStyle(
    'background: #828282',
  );
  expect(screen.getByText('- / -')).toBeInTheDocument();
});
