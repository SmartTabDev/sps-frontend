import { screen, RenderResult } from '@testing-library/react';
import React from 'react';
import { render } from '__test__/test-utils-new';
import PriceBox from './PriceBox';

let utils: undefined | RenderResult;
const handleAction = jest.fn();

beforeEach(() => {
  utils = render(
    <PriceBox
      price={25}
      retailer="mediamarkt.pl"
      retailerUrl="https://mediamarkt.pl"
      label="-5,00 10%"
    />,
  );
});

afterEach(() => {
  handleAction.mockReset();
});

test('PriceBox - rendering price', () => {
  expect(screen.queryByText('25,00')).toBeInTheDocument();
});

test('PriceBox - rendering retailer', () => {
  expect(screen.queryByText('mediamarkt.pl')).toBeInTheDocument();
  expect(screen.queryByText('mediamarkt.pl')).toHaveAttribute('target');
});

test('PriceBox - rendering label', () => {
  expect(screen.queryByText('-5,00 10%')).toBeInTheDocument();
});

test('PriceBox - align left by default', () => {
  expect(screen.queryByText('25,00')?.parentElement).toHaveStyle(
    'text-align: left',
  );
});

test('PriceBox - align right', () => {
  const { rerender } = utils!;

  rerender(
    <PriceBox
      price={25}
      retailer="mediamarkt.pl"
      retailerUrl="https://mediamarkt.pl"
      label="-5,00 10%"
      disableLabel
      align="right"
    />,
  );

  expect(screen.queryByText('25,00')?.parentElement).toHaveStyle(
    'text-align: right',
  );
});

test('PriceBox - disable label', () => {
  const { rerender } = utils!;

  expect(screen.queryByText('-5,00 10%')).toBeInTheDocument();

  rerender(
    <PriceBox
      price={25}
      retailer="mediamarkt.pl"
      retailerUrl="https://mediamarkt.pl"
      label="-5,00 10%"
      disableLabel
    />,
  );

  expect(screen.queryByText('-5,00 10%')).not.toBeInTheDocument();
});

test('PriceBox - disable retailer', () => {
  const { rerender } = utils!;

  expect(screen.queryByText('mediamarkt.pl')).toBeInTheDocument();

  rerender(
    <PriceBox
      price={25}
      retailer="mediamarkt.pl"
      retailerUrl="https://mediamarkt.pl"
      label="-5,00 10%"
      disableRetailer
    />,
  );

  expect(screen.queryByText('mediamarkt.pl')).not.toBeInTheDocument();
});
