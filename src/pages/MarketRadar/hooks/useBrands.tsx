import * as Cube from '@cubejs-client/core';
import * as React from 'react';
import * as Api from 'api';
import getCubeName from 'utils/getCubeName';
import handleRequestError from 'reducers/auth/handleRequestError';
import { useDispatch, useSelector } from 'react-redux';
import { formatChartDate } from 'utils/dates/formatChartDate';
import { BrandData } from '../types/Chart';
import { getTopBrandNames } from '../utils/getTopBrandNames';
import { MarketRadarFilters } from '../components/ExpandedFilters/ExpandedFilters';

const Products = getCubeName('Products', 'aggregations');
const QUERY_HISTORY_LIMIT = 30000;

export function getQueryHistory(
  granularity: Cube.TimeDimensionGranularity,
  retailers: MarketRadarFilters['selectedRetailers'],
  categories: MarketRadarFilters['selectedCategories']
): Cube.Query {
  return {
    dimensions: [`${Products}.formattedbrand`, `${Products}.allcount`],
    order: {
      [`${Products}.runtime`]: 'asc',
      [`${Products}.count`]: 'desc',
    },
    timeDimensions: [
      {
        dimension: `${Products}.runtime`,
        granularity,
        dateRange: 'this month',
      },
    ],
    limit: QUERY_HISTORY_LIMIT,
    filters: [
      ...(retailers.length
        ? [
            {
              dimension: `${Products}.retailer`,
              operator: 'equals',
              values: retailers.map((v) => v.name),
            },
          ]
        : ([] as any)),
      ...(categories.length
        ? [
            {
              dimension: `${Products}.category`,
              operator: 'equals',
              values: categories.map((v) => v.name),
            },
          ]
        : ([] as any)),
    ],
  };
}

function processData(rawData: any[]): BrandData[] {
  return rawData.map((item) => ({
    brand: item?.[`${Products}.formattedbrand`],
    value: item?.[`${Products}.allcount`] || 0,
    runtime: item?.[`${Products}.runtime`],
    date: formatChartDate(item?.[`${Products}.runtime`]),
  }));
}

export function useBrands(
  regionCode: string | undefined,
  granularity: Cube.TimeDimensionGranularity,
  retailers: MarketRadarFilters['selectedRetailers'],
  categories: MarketRadarFilters['selectedCategories']
): {
  isLoading: boolean;
  brands: string[];
} {
  const dispatch = useDispatch();
  const [brands, setBrands] = React.useState<string[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetchBrands = React.useCallback(
    async (
      regionCodeToFetch: string | undefined,
      granularityToFetch: Cube.TimeDimensionGranularity,
      retailersToFetch: MarketRadarFilters['selectedRetailers'],
      categoriesToFetch: MarketRadarFilters['selectedCategories']
    ) => {
      if (cubeAccessToken) {
        setLoading(true);

        try {
          const res = await Api.newCubejsApi(
            cubeAccessToken,
            regionCodeToFetch
          ).load(
            getQueryHistory(
              granularityToFetch,
              retailersToFetch,
              categoriesToFetch
            )
          );

          const rawData = res.rawData();

          const data = processData(rawData);
          const brandCounts = new Map<string, number>();

          data.forEach((d) => {
            const { brand } = d;
            const count = brandCounts.get(brand) ?? 0;
            brandCounts.set(brand, count + d.value);
          });

          const entries = Array.from(brandCounts.entries()).sort(
            (a, b) => b[1] - a[1]
          );

          const topBrandNames = getTopBrandNames(entries, 10);

          setBrands(topBrandNames);

          setLoading(false);
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchBrands'));
          setLoading(false);
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  React.useEffect(() => {
    if (regionCode && granularity) {
      fetchBrands(regionCode, granularity, retailers, categories);
    }
  }, [regionCode, granularity, fetchBrands, retailers, categories]);

  return {
    brands,
    isLoading,
  };
}
