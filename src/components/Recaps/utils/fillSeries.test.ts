import fillSeries from './fillSeries';
import { CardSeries } from './types';

const exampleSeries: CardSeries[] = [
  {
    name: '',
    data: [1, 2, 3],
  },
];

describe('Recap Cards Utils - fillSeries', () => {
  it('fills too short series to 7 default data points', () => {
    const result = fillSeries(exampleSeries);
    const [series] = result;
    expect(series?.data).toStrictEqual([0, 0, 0, 0, 1, 2, 3]);
  });

  it('omits series larger than needed', () => {
    const result = fillSeries(exampleSeries, 3);
    const [series] = result;
    expect(series?.data).toStrictEqual([1, 2, 3]);
  });

  it('allows to fill series with undefined values', () => {
    const result = fillSeries(exampleSeries, 5, true);
    const [series] = result;
    expect(series?.data).toStrictEqual([undefined, undefined, 1, 2, 3]);
  });
});
