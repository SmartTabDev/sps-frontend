import { RSPIndexItem } from '../types/Chart';
import { createChartData, createReducedChartData } from './createChartData';

describe('createChartData', () => {
  it('returns the expected chart data', () => {
    const data: RSPIndexItem[] = [
      {
        retailer: 'Retailer A',
        min: 1,
        max: 10,
        avg: 5,
        runtime: '',
        date: '',
      },
      {
        retailer: 'Retailer A',
        min: 2,
        max: 9,
        avg: 4.5,
        runtime: '',
        date: '',
      },
      {
        retailer: 'Retailer B',
        min: 3,
        max: 8,
        avg: 5.5,
        runtime: '',
        date: '',
      },
      {
        retailer: 'Retailer B',
        min: 4,
        max: 7,
        avg: 5.25,
        runtime: '',
        date: '',
      },
    ];
    const uniqueRetailers = ['Retailer A', 'Retailer B'];
    const expectedChartData = [
      {
        name: 'Retailer A',
        data: [
          { value: 5, min: 1, max: 10 },
          { value: 4.5, min: 2, max: 9 },
        ],
      },
      {
        name: 'Retailer B',
        data: [
          { value: 5.5, min: 3, max: 8 },
          { value: 5.25, min: 4, max: 7 },
        ],
      },
    ];
    const chartData = createChartData(data, uniqueRetailers);
    expect(chartData).toEqual(expectedChartData);
  });
});

describe('createReducedChartData', () => {
  it('returns the expected reduced chart data', () => {
    const data: RSPIndexItem[] = [
      {
        retailer: 'Retailer A',
        min: 1,
        max: 10,
        avg: 5,
        runtime: '',
        date: '',
      },
      {
        retailer: 'Retailer A',
        min: 2,
        max: 9,
        avg: 4.5,
        runtime: '',
        date: '',
      },
      {
        retailer: 'Retailer B',
        min: 3,
        max: 8,
        avg: 5.5,
        runtime: '',
        date: '',
      },
      {
        retailer: 'Retailer B',
        min: 4,
        max: 7,
        avg: 5.25,
        runtime: '',
        date: '',
      },
    ];
    const uniqueRetailers = ['Retailer A', 'Retailer B'];
    const expectedReducedChartData = [
      {
        name: 'Retailer A',
        data: [{ value: 4.75, min: 1, max: 10 }],
      },
      {
        name: 'Retailer B',
        data: [{ value: 5.375, min: 3, max: 8 }],
      },
    ];
    const reducedChartData = createReducedChartData(data, uniqueRetailers);
    expect(reducedChartData).toEqual(expectedReducedChartData);
  });
});
