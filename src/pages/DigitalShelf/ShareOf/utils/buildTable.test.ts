import {
  ConfigCategory,
  ConfigKeyword,
  ConfigRetailer,
  ConfigSearchTerm,
} from 'types/AppConfig';
import { CategoryProduct } from 'types/CategoryProduct';
import { KeywordProduct } from 'types/KeywordProduct';
import { buildTable } from './buildTable';

const retailers: ConfigRetailer[] = [{ name: 'DOZ', url: '', id: 1 }];

const config: ConfigKeyword[] | ConfigCategory[] = [{ name: 'Keyword', id: 1 }];

const products: KeywordProduct[] | CategoryProduct[] = [
  {
    name: 'no-spa product',
    retailerid: 1,
    keywordid: 1,
    available: true,
    createdat: '',
    imgurl: '',
    keywordname: '',
    keywordurl: '',
    oldprice: 0,
    position: 0,
    price: 0,
    retailername: '',
    rundate: '',
    url: '',
    producturl: '',
  },
  {
    name: 'essentiale product',
    retailerid: 1,
    keywordid: 1,
    available: true,
    createdat: '',
    imgurl: '',
    keywordname: '',
    keywordurl: '',
    oldprice: 0,
    position: 0,
    price: 0,
    retailername: '',
    rundate: '',
    url: '',
    producturl: '',
  },
];

const searchTerms: ConfigSearchTerm[] = [{ name: 'no-spa', id: 1 }];

describe('build table', () => {
  test('it returns empty table', () => {
    const result = buildTable([], [], [], [], 'Search term', 'keywordid');

    expect(result.table).toStrictEqual([
      [{ data: 'Search term' }, { data: 'Avg %' }],
    ]);
  });

  test('it returns table with retailers', () => {
    const result = buildTable(
      retailers,
      [],
      [],
      [],
      'Search term',
      'keywordid',
    );

    expect(result.table).toStrictEqual([
      [
        { data: 'Search term' },
        { data: 'Avg %' },
        {
          data: 'DOZ',
          meta: {
            color: '#286DCB',
            id: 1,
            type: 'retailer',
            value: 0,
          },
        },
      ],
    ]);
  });

  test('it returns table with keyword and retailer', () => {
    const result = buildTable(
      retailers,
      config,
      [],
      [],
      'Search term',
      'keywordid',
    );

    expect(result.table).toStrictEqual([
      [
        { data: 'Search term' },
        { data: 'Avg %' },
        {
          data: 'DOZ',
          meta: {
            color: '#286DCB',
            id: 1,
            type: 'retailer',
            value: 0,
          },
        },
      ],
      [
        {
          data: 'Keyword',
          meta: {
            id: 1,
          },
        },
        {
          data: '',
          meta: {
            color: {
              background: 'rgba(115, 165, 231, 0.25)',
              color: '#3B455E',
            },
            type: 'avg',
            value: 0,
          },
        },
        {
          data: '',
          meta: {
            background: undefined,
            color: undefined,
            position: undefined,
            type: 'cell',
            value: undefined,
          },
        },
      ],
    ]);
  });

  test('it match one of two products', () => {
    const result = buildTable(
      retailers,
      config,
      products,
      searchTerms,
      'Search term',
      'keywordid',
    );

    expect(result.columnsAvg).toStrictEqual([
      {
        id: 1,
        value: 50,
      },
    ]);

    expect(result.rowsAvg).toStrictEqual([
      {
        id: 1,
        value: 50,
      },
    ]);

    expect(result.avg).toBe(50);
  });
});
