import { Query, QueryOrder } from '@cubejs-client/core';
import { newCubejsApi } from 'api';
import { OrderType } from 'components/OrderButton';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import getDimensionKeys from 'utils/cube/getDimensionKeys';
import getCubeName from 'utils/getCubeName';
import { AllegroOffer } from '../types/AllegroOffer';

const Products = getCubeName('Products', 'allegro');

export function getQueryOfferList(
  runs: string[],
  offset: number,
  orderKey: string,
  orderType: string,
  brand: { name: string; id: number }[],
  prices?: [number, number] | null,
  badges?: { [key: string]: boolean },
  searchFilter?: string
): Query {
  return {
    order: {
      [`${Products}.${orderKey}`]: orderType as QueryOrder,
    },
    dimensions: [
      `${Products}.price`,
      `${Products}.productName`,
      `${Products}.pageProductName`,
      `${Products}.seller`,
      `${Products}.productUrl`,
      `${Products}.url`, // required for pagination
      `${Products}.brand`,
      `${Products}.position`,
      `${Products}.unitsSold`,
      `${Products}.isPromoted`,
      `${Products}.isSuperSeller`,
      `${Products}.offerId`,
      `${Products}.imageUrl`,
      `${Products}.isSuperPrice`,
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
      ...(badges && badges.trophy
        ? [
            {
              dimension: `${Products}.isSuperPrice`,
              operator: 'equals',
              values: ['true'],
            },
          ]
        : []),
      ...(badges && badges.isSponsored
        ? [
            {
              dimension: `${Products}.isPromoted`,
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
  orderKey: string,
  orderType: OrderType,
  runs: string[],
  brands?: { name: string; id: number }[],
  prices?: [number, number] | null,
  badges?: { [key: string]: boolean },
  searchFilter?: string
): { offers: AllegroOffer[]; isOfferListLoading: boolean } {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [offers, setOffers] = useState<AllegroOffer[]>([]);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetch = useCallback(
    async (
      regionCodeToFetch: string | undefined,
      offsetToFetch: number,
      orderKeyToFetch: string,
      orderTypeToFetch: string,
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
          ).load({
            ...getQueryOfferList(
              runToFetch,
              offsetToFetch,
              orderKeyToFetch,
              orderTypeToFetch,
              brandToFetch,
              pricesToFetch,
              badgesToFetech,
              searchFilterToFetch
            ),
          });
          const rows = res.rawData();
          const data = rows.map(getDimensionKeys);
          setOffers(data as AllegroOffer[]);
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
      fetch(
        regionCode,
        offset,
        orderKey,
        orderType,
        runs,
        brands,
        prices,
        badges,
        searchFilter
      );
    }
  }, [
    regionCode,
    offset,
    orderKey,
    orderType,
    runs,
    brands,
    prices,
    badges,
    searchFilter,
    fetch,
  ]);

  return {
    offers,
    isOfferListLoading: isLoading,
  };
}
