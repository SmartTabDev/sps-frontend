import * as Cube from '@cubejs-client/core';
import * as React from 'react';
import * as Api from 'api';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import getCubeName from 'utils/getCubeName';
import { getUniqueValues } from 'utils/getUniqueValues';
import { TimeDimension } from 'types/Cube';
import { groupByKeys } from 'pages/MarketRadar/utils/groupByKeys';
import { snakeCase } from 'lodash';
import getRandomColor from 'utils/colors/getRandomColor';
import { GroupedChartData, OAMItem } from '../types/Chart';
import { OAMFilters } from '../components/ExpandedFilters/ExpandedFilters';
import { processData } from '../utils/processData';

const Products = getCubeName('Products', 'oam_aggregations');
const QUERY_HISTORY_LIMIT = 30000;

export function getQueryHistory(
  granularity: Cube.TimeDimensionGranularity,
  timeDimension: TimeDimension,
  nameDimension: keyof OAMItem,
  groupDimension: keyof OAMItem,
  retailers: OAMFilters['selectedRetailers'],
  categories: OAMFilters['selectedCategories']
): Cube.Query {
  return {
    dimensions: [
      `${Products}.availability_sum`,
      `${Products}.${snakeCase(nameDimension)}`,
      `${Products}.${snakeCase(groupDimension)}`,
    ],
    order: {
      [`${Products}.date`]: 'asc',
      [`${Products}.${groupDimension}`]: 'asc',
      [`${Products}.${nameDimension}`]: 'asc',
      [`${Products}.availability_sum`]: 'desc',
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

export function useTotalChangeOverTimeByTwoDimensions(
  regionCode: string | undefined,
  granularity: Cube.TimeDimensionGranularity,
  timeDimension: TimeDimension,
  nameDimension: keyof OAMItem,
  groupDimension: keyof OAMItem,
  retailers: OAMFilters['selectedRetailers'],
  categories: OAMFilters['selectedCategories']
): {
  isLoading: boolean;
  dates: string[];
  values: GroupedChartData[];
} {
  const dispatch = useDispatch();
  const [dates, setDates] = React.useState<string[]>([]);
  const [values, setValues] = React.useState<GroupedChartData[]>([]);
  const [isLoading, setLoading] = React.useState<boolean>(true);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetchOAMAggregation = React.useCallback(
    async (
      regionCodeToFetch: string | undefined,
      granularityToFetch: Cube.TimeDimensionGranularity,
      timeDimensionToFetch: TimeDimension,
      nameDimensionToFetch: keyof OAMItem,
      groupDimensionToFetch: keyof OAMItem,
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
              nameDimensionToFetch,
              groupDimensionToFetch,
              retailersToFetch,
              categoriesToFetch
            )
          );

          const rawData = res.rawData();

          const data = processData(rawData);

          const uniqueNames = getUniqueValues(
            data,
            nameDimensionToFetch
          ) as string[];
          const uniqueGroups = getUniqueValues(
            data,
            groupDimensionToFetch
          ) as string[];
          const uniqueDates = getUniqueValues(data, 'date');

          const valueByDimensions = groupByKeys<OAMItem>(
            data,
            ['date', nameDimensionToFetch, groupDimensionToFetch],
            'sum'
          );

          const groupedChartData: GroupedChartData[] = [];

          uniqueGroups.forEach((group) => {
            uniqueNames.forEach((name, index) => {
              const chartData: GroupedChartData = {
                color: getRandomColor(index),
                data: [],
                name,
                group,
              };

              chartData.data = uniqueDates.map((date) => {
                const cKey = `${date}-${name}-${group}`;
                return valueByDimensions[cKey] || 0;
              });

              groupedChartData.push(chartData);
            });
          });

          setValues(groupedChartData);

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
        nameDimension,
        groupDimension,
        retailers,
        categories
      );
    }
  }, [
    regionCode,
    granularity,
    timeDimension,
    nameDimension,
    groupDimension,
    fetchOAMAggregation,
    retailers,
    categories,
  ]);

  return {
    dates,
    values,
    isLoading,
  };
}
