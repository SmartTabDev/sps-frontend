import { Query } from '@cubejs-client/core';
import { MarketplaceCubes } from 'pages/Marketplaces/hooks/utils/useMarketplaceCubes';
import { useMemo } from 'react';
import cubeEqualsFilter from 'utils/cube/filters/equals';
import cubeSetFilter from 'utils/cube/filters/set';

const useBrandsQuery = (cubes: MarketplaceCubes, runTime: string, ids: string[]): Query => {
  const { Products } = cubes;

  const query = useMemo(
    () => ({
      dimensions: [`${Products}.runTime`, `${Products}.brand`],
      timeDimensions: [
        {
          dimension: `${Products}.runTime`,
          dateRange: runTime,
        },
      ],
      filters: [
        cubeEqualsFilter(`${Products}.productId`, ids),
        cubeSetFilter(`${Products}.brand`),
      ],
      order: {
        [`${Products}.brand`]: 'asc' as const,
      },
    }),
    [Products, runTime, ids],
  );

  return query;
};

export default useBrandsQuery;
