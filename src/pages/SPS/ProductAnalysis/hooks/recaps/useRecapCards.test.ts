import { renderHook } from '@testing-library/react-hooks';
import { Row, TableView } from 'types/SPSTable';
import { UiWrapper } from '__test__/test-utils-new';
import { BaseData } from '../usePriceAnalysisData/baseData/type';
import useRecapCards from './useRecapCards';

// base list
const baseData: BaseData = {
  products: {
    1767: {
      productid: 1767,
      productname: 'HW City Zakręcona opona Zestaw',
      retailers: [
        {
          retailerid: '1',
          retailername: 'Carrefour',
          runs: {
            '2021-09-17T00:00:00.000': {
              available: false,
              price: 99.99,
              regularPrice: 0,
            },
            '2021-09-18T00:00:00.000': {
              available: false,
              price: 99.99,
              regularPrice: 0,
            },
          },
          runsFormatted: {
            '2021-09-17T00:00:00.000': '99,99',
            '2021-09-18T00:00:00.000': '99,99',
          },
        },
        {
          retailerid: '2',
          retailername: 'Empik',
          runs: {
            '2021-09-17T00:00:00.000': {
              available: true,
              price: 124.99,
              regularPrice: 0,
            },
            '2021-09-18T00:00:00.000': {
              available: true,
              price: 124.99,
              regularPrice: 0,
            },
          },
          runsFormatted: {
            '2021-09-17T00:00:00.000': '124,99',
            '2021-09-18T00:00:00.000': '124,99',
          },
        },
      ],
    },
    1909: {
      productid: 1909,
      productname: 'HW TB PRZYSPIESZACZ Z NAPEDEM',
      retailers: [
        {
          retailerid: '1',
          retailername: 'Carrefour',
          runs: {
            '2021-09-17T00:00:00.000': {
              available: false,
              price: 55.99,
              regularPrice: 0,
            },
            '2021-09-18T00:00:00.000': {
              available: false,
              price: 55.99,
              regularPrice: 0,
            },
          },
          runsFormatted: {
            '2021-09-17T00:00:00.000': '55,99',
            '2021-09-18T00:00:00.000': '55,99',
          },
        },
        {
          retailerid: '2',
          retailername: 'Empik',
          runs: {
            '2021-09-17T00:00:00.000': {
              available: true,
              price: 66.99,
              regularPrice: 0,
            },
            '2021-09-18T00:00:00.000': {
              available: true,
              price: 66.99,
              regularPrice: 0,
            },
          },
          runsFormatted: {
            '2021-09-17T00:00:00.000': '66,99',
            '2021-09-18T00:00:00.000': '66,99',
          },
        },
        {
          retailerid: '3',
          retailername: 'Smyk',
          runs: {
            '2021-09-17T00:00:00.000': {
              available: true,
              price: 65.49,
              regularPrice: 0,
            },
            '2021-09-18T00:00:00.000': {
              available: true,
              price: 58.95,
              regularPrice: 0,
            },
          },
          runsFormatted: {
            '2021-09-17T00:00:00.000': '65,49',
            '2021-09-18T00:00:00.000': '58,95',
          },
        },
      ],
    },
  },
  productsOrder: [1767, 1909],
  runs: {
    Daily: ['2021-09-17T00:00:00.000', '2021-09-18T00:00:00.000'],
    Hourly: ['2021-09-17T05:00:00.000', '2021-09-18T05:00:00.000'],
  },
  runsBatches: {
    Daily: [['2021-09-17T00:00:00.000', '2021-09-18T00:00:00.000']],
    Hourly: [['2021-09-17T05:00:00.000', '2021-09-18T05:00:00.000']],
  },
};

const dailyList: Row[] = [
  [
    {
      data: 'Product',
      kind: 'product',
    },
    {
      data: 'Retailer',
      kind: 'retailer',
    },
    {
      data: 'September 17 02:00',
      kind: 'date',
    },
    {
      data: 'September 18 02:00',
      kind: 'date',
    },
  ],
  [
    {
      data: 'HW City Zakręcona opona Zestaw',
      kind: 'retailer',
      meta: {
        textSize: 'normal',
        isOdd: true,
        isFirst: true,
        isLast: false,
      },
    },
    {
      data: 'Empik',
      kind: 'retailer',
      meta: {
        url: 'https://www.empik.com/hot-wheels-zakrecona-opona-zestaw-mattel,p1239416709,zabawki-p',
        textSize: 'normal',
        isOdd: true,
      },
    },
    {
      data: '124,99',
      kind: 'price',
      meta: {
        originalDate: '2021-09-17T00:00:00.000',
        originalPrice: '124,99',
        available: true,
        isLower: false,
        isHigher: false,
        isNA: false,
        isOdd: true,
      },
    },
    {
      data: '124,99',
      kind: 'price',
      meta: {
        originalDate: '2021-09-18T00:00:00.000',
        originalPrice: '124,99',
        available: true,
        isLower: false,
        isHigher: false,
        isNA: false,
        isOdd: true,
      },
    },
  ],
  [
    {
      data: 'HW TB PRZYSPIESZACZ Z NAPEDEM',
      kind: 'product',
      meta: {
        textSize: 'normal',
        isOdd: false,
        isFirst: true,
        isLast: false,
      },
    },
    {
      data: 'Empik',
      kind: 'retailer',
      meta: {
        url: 'https://www.empik.com/hot-wheels-przyspieszacz-z-napedem-track-builder-hot-wheels,p1222649947,zabawki-p',
        textSize: 'normal',
        isOdd: false,
      },
    },
    {
      data: '66,99',
      kind: 'price',
      meta: {
        originalDate: '2021-09-17T00:00:00.000',
        originalPrice: '66,99',
        available: true,
        isLower: false,
        isHigher: false,
        isNA: false,
        isOdd: false,
      },
    },
    {
      data: '66,99',
      kind: 'price',
      meta: {
        originalDate: '2021-09-18T00:00:00.000',
        originalPrice: '66,99',
        available: true,
        isLower: false,
        isHigher: false,
        isNA: false,
        isOdd: false,
      },
    },
  ],
  [
    {
      data: 'HW TB PRZYSPIESZACZ Z NAPEDEM',
      kind: 'retailer',
      meta: {
        textSize: 'normal',
        isOdd: false,
        isFirst: false,
        isLast: true,
      },
    },
    {
      data: 'Smyk',
      kind: 'retailer',
      meta: {
        url: 'https://www.smyk.com/p/hot-wheels-track-builder-przyspieszacz-z-napedem-zestaw-i6423926',
        textSize: 'normal',
        isOdd: false,
      },
    },
    {
      data: '65,49',
      kind: 'price',
      meta: {
        originalDate: '2021-09-17T00:00:00.000',
        originalPrice: '65,49',
        available: true,
        isLower: false,
        isHigher: false,
        isNA: false,
        isOdd: false,
      },
    },
    {
      data: '58,95',
      kind: 'price',
      meta: {
        originalDate: '2021-09-18T00:00:00.000',
        originalPrice: '58,95',
        available: true,
        isLower: true,
        isHigher: false,
        isNA: false,
        isOdd: false,
      },
    },
  ],
];

describe('usePriceAnalysisData Utils - useRecapCards', () => {
  it('return empty array for undefined values', () => {
    const { result } = renderHook(
      () => useRecapCards('Daily', undefined, [], 'PL'),
      {
        wrapper: UiWrapper,
      }
    );

    expect(result.current.oldCards).toStrictEqual([]);
  });

  type Hook = {
    view: TableView;
    baseData: BaseData;
    list: Row[];
  };

  it('uses correct run', () => {
    const { result } = renderHook(
      // rerender
      ({ view, baseData: _baseData, list }: Hook) =>
        useRecapCards(view, _baseData, list, 'PL'),
      {
        wrapper: UiWrapper,
        initialProps: {
          view: 'Daily',
          baseData,
          list: dailyList,
        },
      }
    );

    expect(result.current.oldCards[1]?.subtitle).toBe(33.33);
  });
});
