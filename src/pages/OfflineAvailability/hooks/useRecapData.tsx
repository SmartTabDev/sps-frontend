import * as Cube from '@cubejs-client/core';
import * as React from 'react';
import * as Api from 'api';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import getCubeName from 'utils/getCubeName';
import { getUniqueValues } from 'utils/getUniqueValues';
import { groupByKeys } from 'pages/MarketRadar/utils/groupByKeys';
import { RecapCardType } from 'components/Recaps/utils/types';
import { ChartData, OAMItem } from '../types/Chart';
import { OAMFilters } from '../components/ExpandedFilters/ExpandedFilters';
import { createRecapChartData } from '../utils/createRecapChartData';
import { processData } from '../utils/processData';

type MainRecapDimension = 'retailer' | 'category';

const Products = getCubeName('Products', 'oam_aggregations');
const QUERY_HISTORY_LIMIT = 30000;

export function getQueryHistory(
  granularity: Cube.TimeDimensionGranularity,
  timeDimension: Cube.DateRange,
  mainDimension: MainRecapDimension,
  retailers: OAMFilters['selectedRetailers'],
  categories: OAMFilters['selectedCategories']
): Cube.Query {
  return {
    dimensions: [
      `${Products}.availability_sum`,
      `${Products}.${mainDimension}`,
      `${Products}.product_class`,
    ],
    order: {
      [`${Products}.date`]: 'asc',
      [`${Products}.${mainDimension}`]: 'asc',
    },
    timeDimensions: [
      {
        dimension: `${Products}.date`,
        granularity,
        dateRange: timeDimension,
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

type UseRecapDataArgs = {
  regionCode: string | undefined;
  granularity: Cube.TimeDimensionGranularity;
  timeDimension: Cube.DateRange | undefined;
  mainDimension: MainRecapDimension;
  filters: OAMFilters;
};

export function useRecapData({
  regionCode,
  granularity,
  timeDimension,
  mainDimension,
  filters,
}: UseRecapDataArgs): {
  isLoading: boolean;
  cards: RecapCardType[];
} {
  const { selectedRetailers: retailers, selectedCategories: categories } =
    filters;

  const dispatch = useDispatch();
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [cards, setCards] = React.useState<RecapCardType[]>([]);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetchRecapData = React.useCallback(
    async (
      regionCodeToFetch: string | undefined,
      granularityToFetch: Cube.TimeDimensionGranularity,
      timeDimensionToFetch: Cube.DateRange,
      mainDimensionToFetch: MainRecapDimension,
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
              mainDimensionToFetch,
              retailersToFetch,
              categoriesToFetch
            )
          );

          const rawData = res.rawData();

          const data = processData(rawData);

          const uniqueValues = getUniqueValues(data, mainDimensionToFetch);

          const valueByDateAndValue = groupByKeys<OAMItem>(
            data,
            [mainDimensionToFetch],
            'sum'
          );

          const valueByDateAndProductClassAndValue = groupByKeys<OAMItem>(
            data,
            ['product_class', mainDimensionToFetch],
            'sum'
          );

          const fetchedCards: RecapCardType[] = uniqueValues.map((item) => ({
            name: item,
            value: valueByDateAndValue[item],
            values: [
              {
                name: 'Flagship',
                value: String(valueByDateAndProductClassAndValue[`1-${item}`]),
              },
              {
                name: 'Core',
                value: String(valueByDateAndProductClassAndValue[`0-${item}`]),
              },
            ],
          }));

          setCards(fetchedCards);
          setLoading(false);
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchRecapData'));
          setLoading(false);
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  React.useEffect(() => {
    if (regionCode && granularity && timeDimension && mainDimension) {
      fetchRecapData(
        regionCode,
        granularity,
        timeDimension,
        mainDimension,
        retailers,
        categories
      );
    }
  }, [
    regionCode,
    granularity,
    timeDimension,
    mainDimension,
    fetchRecapData,
    retailers,
    categories,
  ]);

  return {
    isLoading,
    cards,
  };
}
