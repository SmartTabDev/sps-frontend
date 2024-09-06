import { Query } from '@cubejs-client/core';
import { newCubejsApi } from 'api';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import getDimensionKeys from 'utils/cube/getDimensionKeys';
import getCubeName from 'utils/getCubeName';
import _ from 'lodash';

const Products = getCubeName('Products', 'allegro');

export function getQueryHistory(
  offerId: string,
  key: 'price' | 'unitsSold'
): Query {
  return {
    dimensions: [`${Products}.${key}`],
    timeDimensions: [
      {
        dimension: `${Products}.runTime`,
        granularity: 'day',
        dateRange: 'from 30 days ago to now',
      },
    ],
    filters: [
      {
        dimension: `${Products}.offerId`,
        operator: 'equals',
        values: [offerId],
      },
    ],
  };
}

export function getQuerySales(offerId: string): Query {
  return {
    dimensions: [`${Products}.unitsSold`],
    timeDimensions: [
      {
        dimension: `${Products}.runTime`,
        granularity: 'day',
        dateRange: 'from 30 days ago to now',
      },
    ],
    filters: [
      {
        dimension: `${Products}.offerId`,
        operator: 'equals',
        values: [offerId],
      },
    ],
  };
}

export type OfferHistory = {
  [key: string]: number;
}[];

export function useOfferHistory(
  regionCode: string | undefined,
  offerId: string | null
): {
  pricesHistory: OfferHistory | null;
  salesHistory: OfferHistory | null;
  isHistoryLoading: boolean;
} {
  const dispatch = useDispatch();
  const [isLoadingPrices, setLoadingPrices] = useState<boolean>(false);
  const [isLoadingSales, setLoadingSales] = useState<boolean>(false);
  const [pricesHistory, setPricesHistory] = useState<OfferHistory | null>(null);
  const [salesHistory, setSalesHistory] = useState<OfferHistory | null>(null);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetchPrices = useCallback(
    async (regionCodeToFetch: string | undefined, offerIdToFetch: string) => {
      if (cubeAccessToken) {
        setLoadingPrices(true);

        try {
          const res = await newCubejsApi(
            cubeAccessToken,
            regionCodeToFetch
          ).load(getQueryHistory(offerIdToFetch, 'price'));

          const rawData = res.rawData();

          const parsedData = rawData.map((data) => getDimensionKeys(data));
          const uniqDays = _.uniqBy(parsedData, 'runTime');

          const result = uniqDays.map(({ runTime, price }) => ({
            [moment(runTime).format('MMM DD')]: price,
          }));

          setPricesHistory(result);
          setLoadingPrices(false);
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchOfferList'));
          setLoadingPrices(false);
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  const fetchSales = useCallback(
    async (regionCodeToFetch: string | undefined, offerIdToFetch: string) => {
      if (cubeAccessToken) {
        setLoadingSales(true);

        try {
          const res = await newCubejsApi(
            cubeAccessToken,
            regionCodeToFetch
          ).load(getQueryHistory(offerIdToFetch, 'unitsSold'));

          const rawData = res.rawData();

          const parsedData = rawData.map((data) => getDimensionKeys(data));
          const uniqDays = _.uniqBy(parsedData, 'runTime');

          const result = uniqDays.map(({ runTime, unitsSold }) => ({
            [moment(runTime).format('MMM DD')]: unitsSold,
          }));

          setSalesHistory(result);
          setLoadingSales(false);
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchOfferList'));
          setLoadingSales(false);
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  useEffect(() => {
    if (regionCode && offerId) {
      fetchPrices(regionCode, offerId);
      fetchSales(regionCode, offerId);
    }
  }, [regionCode, offerId, fetchPrices, fetchSales]);

  return {
    pricesHistory,
    salesHistory,
    isHistoryLoading: isLoadingPrices || isLoadingSales,
  };
}
