import { getTopBrandNames } from './getTopBrandNames';

describe('getTopBrandNames', () => {
  const brandData: [string, number][] = [
    ['Brand A', 5],
    ['Brand B', 10],
    ['Brand C', 3],
    ['Brand D', 7],
  ];

  it('returns an array of top brand names up to the limit', () => {
    const result = getTopBrandNames(brandData, 2);
    expect(result).toEqual(['Brand B', 'Brand D']);
  });

  it('returns all brand names if limit is greater than or equal to the number of brands', () => {
    const result = getTopBrandNames(brandData, 4);
    expect(result).toEqual(['Brand B', 'Brand D', 'Brand A', 'Brand C']);
  });

  it('handles empty data', () => {
    const result = getTopBrandNames([], 3);
    expect(result).toEqual([]);
  });

  it('handles data with duplicate values (returns more than limit)', () => {
    const duplicateValuesBrandData: [string, number][] = [
      ['Brand A', 5],
      ['Brand B', 10],
      ['Brand C', 10],
      ['Brand D', 7],
    ];
    const result = getTopBrandNames(duplicateValuesBrandData, 2);
    expect(result).toEqual(['Brand B', 'Brand C', 'Brand D']);
  });
});
