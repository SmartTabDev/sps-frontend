import * as Cube from '@cubejs-client/core';
import * as React from 'react';
import * as Api from 'api';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import getCubeName from 'utils/getCubeName';
import { OptionIndicator } from 'components/Charts/RadarChart/getRadarChart';
import { formatChartDate } from 'utils/dates/formatChartDate';
import { getUniqueNames } from '../utils/getUniqueNames';
import { BrandData, ChartData, RetailersMaxCount } from '../types/Chart';
import { MarketRadarFilters } from '../components/ExpandedFilters/ExpandedFilters';
import { groupByKeys } from '../utils/groupByKeys';

const Products = getCubeName('Products', 'aggregations');
const QUERY_HISTORY_LIMIT = 30000;

export function getQueryHistory(
  granularity: Cube.TimeDimensionGranularity,
  timeDimension: MarketRadarFilters['timeDimension'],
  brands: string[],
  retailers: MarketRadarFilters['selectedRetailers'],
  categories: MarketRadarFilters['selectedCategories']
): Cube.Query {
  return {
    dimensions: [
      `${Products}.formattedbrand`,
      `${Products}.retailer`,
      `${Products}.allcount`,
    ],
    order: {
      [`${Products}.runtime`]: 'asc',
      [`${Products}.count`]: 'desc',
    },
    timeDimensions: [
      {
        dimension: `${Products}.runtime`,
        granularity,
        dateRange: timeDimension.name,
      },
    ],
    limit: QUERY_HISTORY_LIMIT,
    filters: [
      {
        dimension: `${Products}.formattedbrand`,
        operator: 'equals',
        values: brands,
      },
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
    retailer: item?.[`${Products}.retailer`],
    date: formatChartDate(item?.[`${Products}.runtime`]),
  }));
}

export function useDistributionGraph(
  regionCode: string | undefined,
  granularity: Cube.TimeDimensionGranularity,
  timeDimension: MarketRadarFilters['timeDimension'],
  brands: string[],
  retailers: MarketRadarFilters['selectedRetailers'],
  categories: MarketRadarFilters['selectedCategories'],
  allRetailers: MarketRadarFilters['selectedRetailers']
): {
  isLoading: boolean;
  values: ChartData[];
  allRetailersMax: OptionIndicator[];
} {
  const dispatch = useDispatch();
  const [values, setValues] = React.useState<ChartData[]>([]);
  const [retailersMaxCount, setRetailersMaxCount] =
    React.useState<RetailersMaxCount>([]);
  const [isLoading, setLoading] = React.useState<boolean>(false);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetchData = React.useCallback(
    async (
      regionCodeToFetch: string | undefined,
      granularityToFetch: Cube.TimeDimensionGranularity,
      timeDimensionToFetch: MarketRadarFilters['timeDimension'],
      brandsToFetch: string[],
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
              timeDimensionToFetch,
              brandsToFetch,
              retailersToFetch,
              categoriesToFetch
            )
          );

          const rawData = res.rawData();

          const data = processData(rawData);

          const uniqueBrands = getUniqueNames(data.map((d) => d.brand));

          const valueByRetailerAndBrand = groupByKeys<BrandData>(
            data,
            ['retailer', 'brand'],
            'sum'
          );

          const maxPerRetailer: RetailersMaxCount = allRetailers.map((ur) => ({
            name: ur.name || '',
            max: 0,
          }));

          const chartData: ChartData[] = uniqueBrands.map((brand) => {
            const dataForRetailers: number[] = allRetailers.map((retailer) => {
              const key = `${retailer.name}-${brand}`;
              const value = valueByRetailerAndBrand[key] ?? 0;

              const max = maxPerRetailer.find((m) => m.name === retailer.name);

              if (max && value > max.max!) {
                max.max = value;
              }

              return value;
            });

            return {
              name: brand,
              data: dataForRetailers,
            };
          });

          setRetailersMaxCount(maxPerRetailer);
          setValues(chartData);

          setLoading(false);
        } catch (error) {
          dispatch(handleRequestError(error, 'fetch useDistributionGraph'));
          setLoading(false);
        }
      }
    },
    [cubeAccessToken, dispatch, allRetailers]
  );

  React.useEffect(() => {
    if (regionCode && granularity && timeDimension && brands.length) {
      fetchData(
        regionCode,
        granularity,
        timeDimension,
        brands,
        retailers,
        categories
      );
    }
  }, [regionCode, granularity, fetchData, brands, retailers, categories]);

  const allRetailersMax = allRetailers.map((r) => {
    const max = retailersMaxCount.find((rmc) => rmc.name === r.name)?.max;
    return {
      name: r.name,
      max: max ?? 0,
    };
  });

  return {
    allRetailersMax,
    values,
    isLoading,
  };
}
