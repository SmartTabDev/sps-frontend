import { Query } from '@cubejs-client/core';
import { newCubejsApi } from 'api';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import getDimensionKeys from 'utils/cube/getDimensionKeys';
import getCubeName from 'utils/getCubeName';

const Sellers = getCubeName('Sellers', 'shopee');

export function getQuerySellers(shopIds: string[]): Query {
  return {
    dimensions: [`${Sellers}.name`, `${Sellers}.shopId`],
    filters: [
      {
        dimension: `${Sellers}.shopId`,
        operator: 'equals',
        values: shopIds,
      },
    ],
  };
}

export type ShopeeSellers = Record<string, string>;

export function useSellers(
  regionCode: string | undefined,
  shopIds: string[]
): { sellers: ShopeeSellers; isSellerListLoading: boolean } {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [sellers, setSellers] = useState<ShopeeSellers>({});

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetch = useCallback(
    async (regionCodeToFetch: string | undefined, shopIdsToFetch: string[]) => {
      if (cubeAccessToken) {
        setLoading(true);

        try {
          const res = await newCubejsApi(
            cubeAccessToken,
            regionCodeToFetch
          ).load(getQuerySellers(shopIdsToFetch));
          const rows = res.rawData();
          const data = rows.map(getDimensionKeys);
          const fetchedSellers: ShopeeSellers = {};

          data.forEach(({ name, shopId }) => {
            fetchedSellers[shopId] = name;
          });

          setSellers(fetchedSellers);
          setLoading(false);
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchOfferList'));
          setLoading(false);
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  useEffect(() => {
    if (regionCode && shopIds.length) {
      fetch(regionCode, shopIds);
    }
  }, [regionCode, shopIds, fetch]);

  return {
    sellers,
    isSellerListLoading: isLoading,
  };
}
