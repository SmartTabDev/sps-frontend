import * as Cube from '@cubejs-client/core';
import * as React from 'react';
import * as Api from 'api';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import getCubeName from 'utils/getCubeName';
import { formatChartDate } from 'utils/dates/formatChartDate';
import { getUniqueValues } from 'utils/getUniqueValues';
import { TimeDimension } from 'types/Cube';
import { ChartData, RSPIndexItem } from '../types/Chart';
import { RSPIndexFilters } from '../components/ExpandedFilters/ExpandedFilters';
import {
  createChartData,
  createReducedChartData,
} from '../utils/createChartData';

const RRPVariants = getCubeName('RRP_Variants', 'aggregations');

const QUERY_HISTORY_LIMIT = 30000;

export function getQueryHistory(
  granularity: Cube.TimeDimensionGranularity,
  timeDimension: TimeDimension,
  retailers: RSPIndexFilters['selectedRetailers'],
  categories: RSPIndexFilters['selectedCategories']
): Cube.Query {
  return {
    measures: [
      `${RRPVariants}.minRRPIndexM`,
      `${RRPVariants}.maxRRPIndexM`,
      `${RRPVariants}.avgRRPIndexM`,
    ],
    dimensions: [`${RRPVariants}.retailerName`],
    order: {
      [`${RRPVariants}.runtime`]: 'asc',
      [`${RRPVariants}.retailerName`]: 'asc',
    },
    timeDimensions: [
      {
        dimension: `${RRPVariants}.runtime`,
        granularity,
        dateRange: timeDimension.name,
      },
    ],
    limit: QUERY_HISTORY_LIMIT,
    filters: [
      ...(retailers.length
        ? [
            {
              dimension: `${RRPVariants}.retailerName`,
              operator: 'equals',
              values: retailers.map((v) => v.name),
            },
          ]
        : ([] as any)),
      ...(categories.length
        ? [
            {
              dimension: `${RRPVariants}.categoryName`,
              operator: 'equals',
              values: categories.map((v) => v.name),
            },
          ]
        : ([] as any)),
    ],
  };
}

function processData(rawData: any[]): RSPIndexItem[] {
  return rawData.map((item) => ({
    retailer: item?.[`${RRPVariants}.retailerName`],
    min: item?.[`${RRPVariants}.minRRPIndexM`],
    max: item?.[`${RRPVariants}.maxRRPIndexM`],
    avg: item?.[`${RRPVariants}.avgRRPIndexM`],
    runtime: item?.[`${RRPVariants}.runtime`],
    date: formatChartDate(item?.[`${RRPVariants}.runtime`]),
  }));
}

export function useRSPIndexPerStore(
  regionCode: string | undefined,
  granularity: Cube.TimeDimensionGranularity,
  timeDimension: TimeDimension,
  retailers: RSPIndexFilters['selectedRetailers'],
  categories: RSPIndexFilters['selectedCategories']
): {
  isLoading: boolean;
  dates: string[];
  values: ChartData[];
  reducedValues: ChartData[];
} {
  const dispatch = useDispatch();
  const [dates, setDates] = React.useState<string[]>([]);
  const [values, setValues] = React.useState<ChartData[]>([]);
  const [reducedValues, setReducedValues] = React.useState<ChartData[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetchRSPIndexPerStore = React.useCallback(
    async (
      regionCodeToFetch: string | undefined,
      granularityToFetch: Cube.TimeDimensionGranularity,
      timeDimensionToFetch: TimeDimension,
      retailersToFetch: RSPIndexFilters['selectedRetailers'],
      categoriesToFetch: RSPIndexFilters['selectedCategories']
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
              retailersToFetch,
              categoriesToFetch
            )
          );

          const rawData = res.rawData();

          const data = processData(rawData);

          const uniqueRetailers = getUniqueValues(data, 'retailer');
          const uniqueDates = getUniqueValues(data, 'date');

          const chartData = createChartData(data, uniqueRetailers);
          const reducedChartData = createReducedChartData(
            data,
            uniqueRetailers
          );

          setValues(chartData);
          setReducedValues(reducedChartData);
          setDates(uniqueDates);
          setLoading(false);
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchRSPIndexPerStore'));
          setLoading(false);
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  React.useEffect(() => {
    if (regionCode && granularity && timeDimension) {
      fetchRSPIndexPerStore(
        regionCode,
        granularity,
        timeDimension,
        retailers,
        categories
      );
    }
  }, [
    regionCode,
    granularity,
    timeDimension,
    fetchRSPIndexPerStore,
    retailers,
    categories,
  ]);

  return {
    dates,
    values,
    reducedValues,
    isLoading,
  };
}
