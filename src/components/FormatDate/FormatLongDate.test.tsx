import { screen, RenderResult } from '@testing-library/react';
import React from 'react';
import { render } from '__test__/test-utils-new';
import moment from 'moment';
import { FormatLongDate } from './FormatDate';

let utils: undefined | RenderResult;
const handleAction = jest.fn();

beforeEach(() => {
  utils = render(
    <FormatLongDate>{moment('01-01-2021', 'DD-MM-YYYY')}</FormatLongDate>,
  );
});

afterEach(() => {
  handleAction.mockReset();
});

test('FormatLongDate - rendering with minimum configuration', () => {
  expect(screen.getByText('01 January')).toBeInTheDocument();
});

test('FormatLongDate - rendering with year', () => {
  const { rerender } = utils!;

  rerender(
    <FormatLongDate year>{moment('01-01-2021', 'DD-MM-YYYY')}</FormatLongDate>,
  );

  expect(screen.getByText('01 January 2021')).toBeInTheDocument();
});
