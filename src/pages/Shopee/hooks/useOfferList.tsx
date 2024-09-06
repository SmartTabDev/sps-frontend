import { Query } from '@cubejs-client/core';
import { newCubejsApi } from 'api';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import getDimensionKeys from 'utils/cube/getDimensionKeys';
import getCubeName from 'utils/getCubeName';
import { ShopeeOffer } from '../types/ShopeeOffer';

const Products = getCubeName('Products', 'shopee');

export function getQueryOfferList(
  runs: string[],
  offset: number,
  brand: { name: string; id: number }[],
  prices?: [number, number] | null,
  badges?: { [key: string]: boolean },
  searchFilter?: string
): Query {
  return {
    dimensions: [
      `${Products}.price`,
      `${Products}.pageProductName`,
      `${Products}.productUrl`,
      `${Products}.url`, // required for pagination
      `${Products}.brand`,
      `${Products}.unitsSold`,
      `${Products}.isSuperSeller`,
      `${Products}.offerId`,
      `${Products}.shopId`,
      `${Products}.imageUrl`,
      `${Products}.hasFreeDelivery`,
    ],
    limit: 50,
    offset,
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
      // price range
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

export function useOfferList(
  regionCode: string | undefined,
  offset: number,
  runs: string[],
  brands?: { name: string; id: number }[],
  prices?: [number, number] | null,
  badges?: { [key: string]: boolean },
  searchFilter?: string
): { offers: ShopeeOffer[]; shopIds: string[]; isOfferListLoading: boolean } {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [offers, setOffers] = useState<ShopeeOffer[]>([]);
  const [shopIds, setShopIds] = useState<string[]>([]);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetch = useCallback(
    async (
      regionCodeToFetch: string | undefined,
      offsetToFetch: number,
      runToFetch: string[],
      brandToFetch: { name: string; id: number }[],
      pricesToFetch?: [number, number] | null,
      badgesToFetech?: { [key: string]: boolean },
      searchFilterToFetch?: string
    ) => {
      if (cubeAccessToken) {
        setLoading(true);

        try {
          const res = await newCubejsApi(
            cubeAccessToken,
            regionCodeToFetch
          ).load(
            getQueryOfferList(
              runToFetch,
              offsetToFetch,
              brandToFetch,
              pricesToFetch,
              badgesToFetech,
              searchFilterToFetch
            )
          );
          const rows = res.rawData();
          const data = rows.map(getDimensionKeys);
          setOffers(data as ShopeeOffer[]);
          setShopIds(data.map((item) => String(item.shopId)));
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
    if (regionCode && offset !== undefined && runs.length && brands) {
      fetch(regionCode, offset, runs, brands, prices, badges, searchFilter);
    }
  }, [regionCode, offset, runs, brands, prices, badges, searchFilter, fetch]);

  return {
    offers,
    isOfferListLoading: isLoading,
    shopIds,
  };
}
