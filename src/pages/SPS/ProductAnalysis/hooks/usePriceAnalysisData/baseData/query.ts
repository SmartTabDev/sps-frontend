import { Query } from '@cubejs-client/core';
import { getDayStartDate } from 'utils/dates/moment/getTimeframe';
import getCubeName from 'utils/getCubeName';

const Variants = getCubeName('Variants');

export function getQueryProducts(
  dateRange: [string, string],
  filters: any[]
): Query {
  const startDate = getDayStartDate(dateRange[0]);

  return {
    dimensions: [
      `${Variants}.productname`,
      `${Variants}.productid`,
      `${Variants}.retailername`,
      `${Variants}.retailerid`,
    ],
    timeDimensions: [
      {
        dimension: `${Variants}.rundate`,
        dateRange: [startDate, dateRange[1]],
      },
    ],
    filters,
    order: {
      [`${Variants}.productname`]: 'asc',
      [`${Variants}.retailername`]: 'asc',
    },
  };
}

export function getQueryCountProducts(
  dateRange: [string, string],
  filters: any[]
): Query {
  const startDate = getDayStartDate(dateRange[0]);

  return {
    measures: [`${Variants}.count`],
    timeDimensions: [
      {
        dimension: `${Variants}.rundate`,
        dateRange: [startDate, dateRange[1]],
      },
    ],
    filters,
  };
}

const Runs = getCubeName('Runs');

export function getQueryRuns(
  dateRange: [string, string],
  isDaily: boolean
): Query {
  return {
    dimensions: isDaily ? [] : [`${Runs}.createdat`],
    timeDimensions: [
      {
        dimension: `${Runs}.createdat`,
        dateRange: [dateRange[0], dateRange[1]],
        ...(isDaily ? { granularity: 'day' } : {}),
      },
    ],
  };
}
