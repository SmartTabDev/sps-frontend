import getDimensionKeys from 'utils/cube/getDimensionKeys';
import keyMap from 'pages/SPS/components/Table/processing/keyMap';
import { Dimension } from 'reducers/productAvailability';
import { Filter, BinaryOperator } from '@cubejs-client/core';
import { newCubejsApi } from 'api';
// utils
import getCubeName from 'utils/getCubeName';
// types
import { SPSConfig } from 'types/AppConfig';

const createFilter =
  (cube: string) =>
  (operator: BinaryOperator = 'contains') =>
  (dimension: Dimension, values: string[]): Filter[] => {
    if (Array.isArray(values) && values.length > 0) {
      return [
        {
          dimension: `${cube}.${dimension}`,
          operator,
          values,
        },
      ];
    }
    return [];
  };

const variantsFilter = createFilter(getCubeName('Variants'));
const containsFilter = variantsFilter();
const equalsFilter = variantsFilter('equals');

const getValues =
  (key: string) =>
  (item: any): string =>
    String(item[key]);

type SPSConfigFilters = Pick<
  SPSConfig,
  'brands' | 'categories' | 'retailers' | 'products'
>;

export const createFilters = (filters: SPSConfigFilters): Filter[] => {
  const { retailers, brands, categories, products } = filters;
  const result = [
    ...containsFilter('retailername', retailers.map(getValues('name'))),
    ...containsFilter('brandname', brands.map(getValues('name'))),
    ...containsFilter('categoryname', categories.map(getValues('name'))),
    ...containsFilter('productname', products.map(getValues('name'))),
  ];

  return result;
};

const ignoreAll = <T extends keyof SPSConfigFilters>(
  all: SPSConfigFilters[T],
  chosen: SPSConfigFilters[T]
): SPSConfigFilters[T] => {
  if (all.length === chosen.length) {
    return [];
  }

  return chosen;
};

export const createIdFilters = (
  all: SPSConfigFilters,
  chosen: SPSConfigFilters
): Filter[] => {
  const brands = ignoreAll<'brands'>(all.brands, chosen.brands);
  const categories = ignoreAll<'categories'>(all.categories, chosen.categories);
  const retailers = ignoreAll<'retailers'>(all.retailers, chosen.retailers);
  const products = ignoreAll<'products'>(all.products, chosen.products);

  const idFilters = [
    ...equalsFilter('retailerid', retailers.map(getValues('id'))),
    ...equalsFilter('brandid', brands.map(getValues('id'))),
    ...equalsFilter('categoryid', categories.map(getValues('id'))),
    ...equalsFilter('productid', products.map(getValues('id'))),
  ];

  return idFilters;
};

export const getClientVariants = async (
  accessToken: string,
  regionCode: string | undefined,
  dateRange: [string, string],
  offset: number,
  limit: number,
  filters: Filter[]
): Promise<any> => {
  const Variants = getCubeName('Variants');

  const resultSet = await newCubejsApi(accessToken, regionCode).load({
    // , 'getClientVariants'
    dimensions: Object.keys(keyMap),
    timeDimensions: [
      {
        dimension: `${Variants}.createdat`,
        granularity: 'day',
        dateRange,
      },
    ],
    filters,
    order: {
      // should be specific to avoid duplicates
      [`${Variants}.rundate`]: 'asc',
      [`${Variants}.retailername`]: 'asc',
      [`${Variants}.productname`]: 'asc',
    },
    limit,
    offset,
  });

  const tablePivot = resultSet.tablePivot().filter(Boolean);
  const parsedData = tablePivot.map((data) => getDimensionKeys(data));

  return parsedData;
};
