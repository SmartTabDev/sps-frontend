import * as Cube from '@cubejs-client/core';
import * as React from 'react';
import * as Api from 'api';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import getCubeName from 'utils/getCubeName';
import { getUniqueValues } from 'utils/getUniqueValues';
import { TimeDimension } from 'types/Cube';
import { groupByKeys } from 'pages/MarketRadar/utils/groupByKeys';
import getRandomColor from 'utils/colors/getRandomColor';
import { ChartData, OAMItem } from '../types/Chart';
import { OAMFilters } from '../components/ExpandedFilters/ExpandedFilters';
import { createRecapChartData } from '../utils/createRecapChartData';
import { processData } from '../utils/processData';

const Products = getCubeName('Products', 'oam_aggregations');
const QUERY_HISTORY_LIMIT = 30000;

export function getQueryHistory(
  granularity: Cube.TimeDimensionGranularity,
  timeDimension: TimeDimension,
  retailers: OAMFilters['selectedRetailers'],
  categories: OAMFilters['selectedCategories']
): Cube.Query {
  return {
    dimensions: [`${Products}.availability_sum`, `${Products}.retailer`],
    order: {
      [`${Products}.date`]: 'asc',
      [`${Products}.retailer`]: 'asc',
      [`${Products}.availability_sum`]: 'asc',
    },
    timeDimensions: [
      {
        dimension: `${Products}.date`,
        granularity,
        dateRange: timeDimension.name,
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

export function useTotalChangeOverTime(
  regionCode: string | undefined,
  granularity: Cube.TimeDimensionGranularity,
  timeDimension: TimeDimension,
  retailers: OAMFilters['selectedRetailers'],
  categories: OAMFilters['selectedCategories']
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

  const fetchOAMAggregation = React.useCallback(
    async (
      regionCodeToFetch: string | undefined,
      granularityToFetch: Cube.TimeDimensionGranularity,
      timeDimensionToFetch: TimeDimension,
      retailersToFetch: OAMFilters['selectedRetailers'],
      categoriesToFetch: OAMFilters['selectedCategories']
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

          const valueByDateAndRetailer = groupByKeys<OAMItem>(
            data,
            ['date', 'retailer'],
            'sum'
          );

          const valueByDate = groupByKeys<OAMItem>(data, ['date'], 'sum');

          const chartData = createRecapChartData(
            valueByDateAndRetailer,
            uniqueRetailers,
            uniqueDates
          );

          setValues(chartData);
          setReducedValues([
            {
              color: getRandomColor(0),
              name: '',
              data: Object.values(valueByDate).map((value) => ({
                value,
              })),
            },
          ]);

          setDates(uniqueDates);
          setLoading(false);
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchOAMAggregation'));
          setLoading(false);
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  React.useEffect(() => {
    if (regionCode && granularity && timeDimension) {
      fetchOAMAggregation(
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
    fetchOAMAggregation,
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
