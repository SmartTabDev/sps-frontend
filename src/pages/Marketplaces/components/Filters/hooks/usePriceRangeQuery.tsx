import { Filter, Query } from '@cubejs-client/core';
import { MarketplaceCubes } from 'pages/Marketplaces/hooks/utils/useMarketplaceCubes';
import { useMemo } from 'react';
import cubeEqualsFilter from 'utils/cube/filters/equals';

const usePriceRangeQuery = (
  cubes: MarketplaceCubes,
  runTime: string,
  ids: string[],
): Query => {
  const { Products, Offers } = cubes;

  const query = useMemo(
    () => ({
      dimensions: [`${Products}.runTime`],
      measures: [`${Offers}.minPrice`, `${Offers}.maxPrice`],
      timeDimensions: [
        {
          dimension: `${Products}.runTime`,
          dateRange: runTime,
        },
      ],
      order: {
        [`${Offers}.minPrice`]: 'asc' as const,
      },
      filters: [
        cubeEqualsFilter(`${Products}.productId`, ids),
      ].filter(Boolean) as Filter[],
      limit: 1,
    }),
    [Products, Offers, runTime, ids],
  );

  return query;
};

export default usePriceRangeQuery;
