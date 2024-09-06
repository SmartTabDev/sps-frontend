import { groupByKeys } from './groupByKeys';

describe('groupByKeys', () => {
  const testData = [
    {
      brand: 'Brand 1',
      formattedBrand: 'brand-1',
      value: 10,
      runtime: '',
      date: '2022-01-01',
      retailer: 'Retailer A',
    },
    {
      brand: 'Brand 1',
      formattedBrand: 'brand-1',
      value: 30,
      runtime: '',
      date: '2022-01-01',
      retailer: 'Retailer B',
    },
    {
      brand: 'Brand 2',
      formattedBrand: 'brand-2',
      value: 20,
      runtime: '',
      date: '2022-01-01',
      retailer: 'Retailer A',
    },
    {
      brand: 'Brand 1',
      formattedBrand: 'brand-1',
      value: 30,
      runtime: '',
      date: '2022-01-02',
      retailer: 'Retailer A',
    },
    {
      brand: 'Brand 2',
      formattedBrand: 'brand-2',
      value: 40,
      runtime: '',
      date: '2022-01-02',
      retailer: 'Retailer A',
    },
  ];

  it('should group by single key and calculate sum', () => {
    const result = groupByKeys(testData, ['date'], 'sum');
    expect(result).toEqual({
      '2022-01-01': 60,
      '2022-01-02': 70,
    });
  });

  it('should group by single key and calculate average', () => {
    const result = groupByKeys(testData, ['date'], 'avg');
    expect(result).toEqual({
      '2022-01-01': 20,
      '2022-01-02': 35,
    });
  });

  it('should group by multiple keys and calculate sum', () => {
    const result = groupByKeys(testData, ['date', 'formattedBrand'], 'sum');
    expect(result).toEqual({
      '2022-01-01-brand-1': 40,
      '2022-01-01-brand-2': 20,
      '2022-01-02-brand-1': 30,
      '2022-01-02-brand-2': 40,
    });
  });

  it('should group by multiple keys and calculate average', () => {
    const result = groupByKeys(testData, ['date', 'formattedBrand'], 'avg');
    expect(result).toEqual({
      '2022-01-01-brand-1': 20,
      '2022-01-01-brand-2': 20,
      '2022-01-02-brand-1': 30,
      '2022-01-02-brand-2': 40,
    });
  });
});
