import { PriceCell } from 'types/SPSTable';
import { comparePrices } from './comparePrices';

const prevs: PriceCell[] = [
  {
    data: '599.00',
    kind: 'price',
    meta: {
      available: true,
      isNA: false,
      isHigher: false,
      isLower: false,
    },
  },
];

const currents: PriceCell[] = [{
  data: '699.00',
  kind: 'price',
  meta: {
    available: true,
    isNA: false,
    isHigher: false,
    isLower: false,
  },
}];

describe('comparePrices', () => {
  test('is lower price', () => {
    const result = comparePrices(prevs[0]!, currents[0]!, 'isLower');

    expect(result).toBe(false);
  });
});

describe('comparePrices', () => {
  test('is higher price', () => {
    const result = comparePrices(prevs[0]!, currents[0]!, 'isHigher');

    expect(result).toBe(true);
  });
});
