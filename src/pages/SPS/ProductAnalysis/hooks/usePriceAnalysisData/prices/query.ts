import getCubeName from 'utils/getCubeName';
import { Query } from '@cubejs-client/core';

const Variants = getCubeName('Variants');

export function getQueryPricesHourly(
  dateRange: [string, string],
  currentFilters: any[]
): Query {
  return {
    dimensions: [
      `${Variants}.price`,
      `${Variants}.regularprice`,
      `${Variants}.productname`,
      `${Variants}.retailername`,
      `${Variants}.available`,
      `${Variants}.rundate`,
      `${Variants}.retailerid`,
      `${Variants}.productid`,
    ],
    timeDimensions: [
      {
        dimension: `${Variants}.rundate`,
        dateRange,
      },
    ],
    filters: currentFilters,
    order: {
      // should be specific to avoid duplicates
      [`${Variants}.productname`]: 'asc',
      [`${Variants}.retailername`]: 'asc',
      [`${Variants}.rundate`]: 'asc',
    },
    limit: 50000,
    // we are not using built-in offset and limit
    // queries are made only for visible columns of table
  };
}

export function getQueryPricesDaily(
  dateRange: [string, string],
  currentFilters: any[]
): Query {
  return {
    dimensions: [
      // `${Variants}.price`,
      `${Variants}.productname`,
      `${Variants}.retailername`,
      `${Variants}.available`,
      `${Variants}.productid`,
    ],
    timeDimensions: [
      {
        dimension: `${Variants}.rundate`,
        granularity: 'day',
        dateRange,
      },
    ],
    measures: [`${Variants}.minPrice`],
    filters: currentFilters,
    order: {
      // should be specific to avoid duplicates
      [`${Variants}.productname`]: 'asc',
      [`${Variants}.retailername`]: 'asc',
      [`${Variants}.rundate`]: 'asc',
    },
    limit: 50000,
    // we are not using built-in offset and limit
    // queries are made only for visible columns of table
  };
}
