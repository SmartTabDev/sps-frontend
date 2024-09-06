import { Query } from '@cubejs-client/core';
import { newCubejsApi } from 'api';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import getCubeName from 'utils/getCubeName';

const Products = getCubeName('Products', 'shopee');

export function getQueryTotalProducts(
  runs: string[],
  brand: { name: string; id: number }[],
  prices?: [number, number] | null,
  badges?: { [key: string]: boolean },
  searchFilter?: string
): Query {
  return {
    measures: [`${Products}.count`],
    filters: [
      {
        dimension: `${Products}.runTime`,
        operator: 'equals',
        values: runs,
      },
      ...(searchFilter
        ? [
            {
              dimension: `${Products}.pageProductName`,
              operator: 'contains',
              values: [searchFilter],
            },
          ]
        : ([] as any)),
      ...(brand.length
        ? [
            {
              dimension: `${Products}.brand`,
              operator: 'equals',
              values: brand.map((v) => v.name),
            },
          ]
        : ([] as any)),
      ...(prices && prices[0] > 0
        ? [
            {
              dimension: `${Products}.price`,
              operator: 'gte',
              values: [String(prices[0])],
            },
          ]
        : []),
      ...(prices && prices[1] > 0
        ? [
            {
              dimension: `${Products}.price`,
              operator: 'lte',
              values: [String(prices[1])],
            },
          ]
        : []),
      // badges
      ...(badges && badges.bidding
        ? [
            {
              dimension: `${Products}.isSuperSeller`,
              operator: 'equals',
              values: ['true'],
            },
          ]
        : []),
      ...(badges && badges.freeShipping
        ? [
            {
              dimension: `${Products}.hasFreeDelivery`,
              operator: 'equals',
              values: ['true'],
            },
          ]
        : []),
    ],
  };
}

export function useTotalProducts(
  regionCode: string | undefined,
  runs: string[],
  brands?: { name: string; id: number }[],
  prices?: [number, number] | null,
  badges?: { [key: string]: boolean },
  searchFilter?: string
): { total: number | undefined; isTotalProductsLoading: boolean } {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number | undefined>(undefined);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetch = useCallback(
    async (
      regionCodeToFetch: string | undefined,
      runToFetch: string[],
      brandToFetch: { name: string; id: number }[],
      pricesToFetch?: [number, number] | null,
      badgesToFetch?: { [key: string]: boolean },
      searchFilterToFetch?: string
    ) => {
      if (cubeAccessToken) {
        setLoading(true);

        try {
          const res = await newCubejsApi(
            cubeAccessToken,
            regionCodeToFetch
          ).load(
            getQueryTotalProducts(
              runToFetch,
              brandToFetch,
              pricesToFetch,
              badgesToFetch,
              searchFilterToFetch
            )
          );
          const rows = res.rawData();
          setTotal(rows[0][`${Products}.count`]);
          setLoading(false);
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchTotalProducts'));
          setLoading(false);
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  useEffect(() => {
    if (regionCode && runs.length && brands) {
      fetch(regionCode, runs, brands, prices, badges, searchFilter);
    }
  }, [regionCode, runs, brands, prices, badges, searchFilter, fetch]);

  return {
    total,
    isTotalProductsLoading: isLoading,
  };
}
