import * as Cube from '@cubejs-client/core';
import * as React from 'react';
import * as Api from 'api';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import getCubeName from 'utils/getCubeName';
import { formatChartDate } from 'utils/dates/formatChartDate';
import { getUniqueValues } from 'utils/getUniqueValues';
import { getUniqueNames } from '../utils/getUniqueNames';
import { BrandData, ChartData } from '../types/Chart';
import { MarketRadarFilters } from '../components/ExpandedFilters/ExpandedFilters';
import { groupByKeys, GroupByKeysCalc } from '../utils/groupByKeys';

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
    measures: [`${Products}.avgPrice`],
    dimensions: [`${Products}.formattedbrand`, `${Products}.avcount`],
    order: {
      [`${Products}.runtime`]: 'asc',
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
    weight: item?.[`${Products}.avcount`],
    brand: item?.[`${Products}.formattedbrand`],
    value: item?.[`${Products}.avgPrice`] || 0,
    runtime: item?.[`${Products}.runtime`],
    date: formatChartDate(item?.[`${Products}.runtime`]),
  }));
}

export function useOfferPriceDevelopment(
  regionCode: string | undefined,
  granularity: Cube.TimeDimensionGranularity,
  timeDimension: MarketRadarFilters['timeDimension'],
  brands: string[],
  retailers: MarketRadarFilters['selectedRetailers'],
  categories: MarketRadarFilters['selectedCategories'],
  calc: GroupByKeysCalc = 'avg'
): {
  isLoading: boolean;
  dates: string[];
  values: ChartData[];
} {
  const dispatch = useDispatch();
  const [dates, setDates] = React.useState<string[]>([]);
  const [values, setValues] = React.useState<ChartData[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetchOfferPriceDevelopment = React.useCallback(
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

          const uniqueDates = getUniqueValues<BrandData, 'date'>(data, 'date');
          const uniqueBrands = getUniqueNames(data.map((d) => d.brand));

          const valueByDateAndBrand = groupByKeys<BrandData>(
            data,
            ['date', 'brand'],
            calc
          );

          const chartData: ChartData[] = uniqueBrands.map((brand) => {
            const dataForDates: number[] = uniqueDates.map((date) => {
              const key = `${date}-${brand}`;
              const value = valueByDateAndBrand[key] ?? 0;
              return value;
            });

            return {
              name: brand,
              data: dataForDates.map((v) => Number(v.toFixed(2))),
            };
          });

          setDates(uniqueDates);
          setValues(chartData);

          setLoading(false);
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchOfferPriceDevelopment'));
          setLoading(false);
        }
      }
    },
    [cubeAccessToken, dispatch, calc]
  );

  React.useEffect(() => {
    if (regionCode && granularity && timeDimension && brands.length) {
      fetchOfferPriceDevelopment(
        regionCode,
        granularity,
        timeDimension,
        brands,
        retailers,
        categories
      );
    }
  }, [
    regionCode,
    granularity,
    timeDimension,
    fetchOfferPriceDevelopment,
    brands,
    retailers,
    categories,
  ]);

  return {
    dates,
    values,
    isLoading,
  };
}
