import { RenderResult } from '@testing-library/react';
import React from 'react';
import { render } from '__test__/test-utils-new';
import { Logo } from './Logo';

let utils: undefined | RenderResult;
const handleAction = jest.fn();

beforeEach(() => {
  utils = render(<Logo marketplace="ceneo" />);
});

afterEach(() => {
  handleAction.mockReset();
});

test('rendering ceneo logo', () => {
  expect(utils?.container.querySelector('svg')?.textContent).toBe('ceneo.svg');
});

test('rendering idealo logo', () => {
  const { rerender } = utils!;
  rerender(<Logo marketplace="idealo" />);
  expect(utils?.container.querySelector('svg')?.textContent).toBe('idealo.svg');
});
