import { Filter, Query } from '@cubejs-client/core';
import { MarketplaceCubes } from 'pages/Marketplaces/hooks/utils/useMarketplaceCubes';
import { useMemo } from 'react';
import cubeContainsFilter from 'utils/cube/filters/contains';
import cubeEqualsFilter from 'utils/cube/filters/equals';

const usePositionRangeQuery = (
  cubes: MarketplaceCubes,
  runTime: string,
  ids: string[],
  clientRetailerName?: string,
): Query => {
  const { Products, Offers } = cubes;

  const query = useMemo(
    () => ({
      dimensions: [`${Products}.runTime`],
      measures: [`${Offers}.minPosition`, `${Offers}.maxPosition`],
      timeDimensions: [
        {
          dimension: `${Products}.runTime`,
          dateRange: runTime,
        },
      ],
      order: {
        [`${Offers}.minPosition`]: 'asc' as const,
      },
      filters: [
        cubeEqualsFilter(`${Products}.productId`, ids),
        clientRetailerName ? cubeContainsFilter(`${Offers}.retailer`, [clientRetailerName]) : undefined,
      ].filter(
        Boolean,
      ) as Filter[],
      limit: 1,
    }),
    [Products, Offers, runTime, ids, clientRetailerName],
  );

  return query;
};

export default usePositionRangeQuery;
