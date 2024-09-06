import { screen, RenderResult } from '@testing-library/react';
import React from 'react';
import { render } from '__test__/test-utils-new';
import moment from 'moment';
import { FormatShortDate } from './FormatDate';

let utils: undefined | RenderResult;
const handleAction = jest.fn();

beforeEach(() => {
  utils = render(
    <FormatShortDate>{moment('01-01-2021', 'DD-MM-YYYY')}</FormatShortDate>,
  );
});

afterEach(() => {
  handleAction.mockReset();
});

test('FormatShortDate - rendering with minimum configuration', () => {
  expect(screen.getByText('01 Jan')).toBeInTheDocument();
});

test('FormatShortDate - rendering with year', () => {
  const { rerender } = utils!;

  rerender(
    <FormatShortDate year>{moment('01-01-2021', 'DD-MM-YYYY')}</FormatShortDate>,
  );

  expect(screen.getByText('01 Jan 2021')).toBeInTheDocument();
});
