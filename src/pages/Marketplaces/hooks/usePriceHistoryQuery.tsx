import { useMemo, useState, useEffect, useCallback } from 'react';
import getCubeName from 'utils/getCubeName';
import { Series, Query } from '@cubejs-client/core';
import { newCubejsApi } from 'api';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import split from 'lodash/split';
import { Marketplace } from 'reducers/auth/auth';
import { getRetailerName } from '../utils/getRetailerName';

type SeriesType = Series<{
  x: string;
  category: string;
  value: number;
}>;

type Hook = {
  data: (SeriesType | undefined)[];
  retailers: string[];
  isLoading: boolean;
};

export function usePriceHistoryQuery(
  regionCode: string | undefined,
  marketplace?: Marketplace,
  productId?: string
): Hook {
  const Products = getCubeName('Products', marketplace);
  const Offers = getCubeName('Offers', marketplace);

  const [retailers, setRetailers] = useState<string[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [series, setSeries] = useState<SeriesType[]>([]);
  const accessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const offersQuery = useMemo<Query>(
    () => ({
      measures: [`${Offers}.minPrice`],
      dimensions: [`${Offers}.retailer`, `${Offers}.description`],
      timeDimensions: [
        {
          dimension: `${Products}.runTime`,
          dateRange: 'from 30 days ago to now',
          granularity: 'day',
        },
      ],
      order: {
        [`${Offers}.retailer`]: 'asc',
      },
      filters: [
        {
          dimension: `${Products}.${marketplace}ProductId`,
          operator: 'contains',
          values: [productId!],
        },
        {
          dimension: `${Offers}.retailer`,
          operator: 'set',
        },
      ],
    }),
    [productId, Offers, Products, marketplace]
  );

  const fetchData = useCallback(
    async (_regionCode: string | undefined) => {
      setLoading(true);
      const resultSet = await newCubejsApi(accessToken, _regionCode).load(
        offersQuery
      );
      const data = resultSet.series<{
        x: string;
        category: string;
        value: number;
      }>({
        x: [`${Products}.runTime`],
        y: [
          `${Offers}.retailer`,
          `${Offers}.minPrice`,
          `${Offers}.description`,
        ],
        // fillMissingDates: false,
      });

      const priceHistoryRetailers = data
        .map((v) => get(v, 'key'))
        .map((v) => split(v, ','))
        .map((v) =>
          [getRetailerName(get(v, '[0]', '')), get(v, '[1]')].join(',')
        );

      setRetailers(priceHistoryRetailers);
      setSeries(data);
      setLoading(false);
    },
    [accessToken, offersQuery, setRetailers, setLoading, Offers, Products]
  );

  useEffect(() => {
    if (productId) {
      fetchData(regionCode);
    }
  }, [productId, regionCode, fetchData]);

  return { data: series, retailers, isLoading };
}
