import { Query } from '@cubejs-client/core';
import { newCubejsApi } from 'api';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import getDimensionKeys from 'utils/cube/getDimensionKeys';
import getCubeName from 'utils/getCubeName';

const Products = getCubeName('Products', 'allegro');

export function getQueryBrands(runs: string[]): Query {
  return {
    dimensions: [`${Products}.brand`],
    filters: [
      {
        dimension: `${Products}.runTime`,
        operator: 'equals',
        values: runs,
      },
      {
        dimension: `${Products}.brand`,
        operator: 'set',
      },
    ],
  };
}

export function getQueryPrices(runs: string[]): Query {
  return {
    measures: [`${Products}.minPrice`, `${Products}.maxPrice`],
    filters: [
      {
        dimension: `${Products}.runTime`,
        operator: 'equals',
        values: runs,
      },
    ],
  };
}

export function useFilterList(
  regionCode: string | undefined,
  runs: string[]
): {
  brands: { name: string; id: number }[];
  prices: [number, number] | null;
  isFilterListLoading: boolean;
} {
  const dispatch = useDispatch();
  const [isLoadingBrands, setLoadingBrands] = useState<boolean>(false);
  const [isLoadingPrices, setLoadingPrices] = useState<boolean>(false);
  const [brands, setBrands] = useState<{ name: string; id: number }[]>([]);
  const [prices, setPrices] = useState<[number, number] | null>(null);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetchBrands = useCallback(
    async (regionCodeToFetch: string | undefined, runToFetch: string[]) => {
      if (cubeAccessToken) {
        setLoadingBrands(true);

        try {
          const res = await newCubejsApi(
            cubeAccessToken,
            regionCodeToFetch
          ).load(getQueryBrands(runToFetch));
          const rows = res.rawData();

          const data = rows
            .map(getDimensionKeys)
            .map((x) => ({ name: x.brand, id: 0 }));

          setBrands(data as { name: string; id: number }[]);
          setLoadingBrands(false);
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchOfferList'));
          setLoadingBrands(false);
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  const fetchPrices = useCallback(
    async (regionCodeToFetch: string | undefined, runToFetch: string[]) => {
      if (cubeAccessToken) {
        setLoadingPrices(true);

        try {
          const res = await newCubejsApi(
            cubeAccessToken,
            regionCodeToFetch
          ).load(getQueryPrices(runToFetch));
          const rows = res.rawData();
          const data = rows.map(getDimensionKeys);

          const { minPrice } = data[0];
          const { maxPrice } = data[0];
          setPrices([minPrice, maxPrice]);
          setLoadingPrices(false);
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchOfferList'));
          setLoadingPrices(false);
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  useEffect(() => {
    if (regionCode && runs.length) {
      fetchBrands(regionCode, runs);
      fetchPrices(regionCode, runs);
    }
  }, [regionCode, runs, fetchBrands, fetchPrices]);

  return {
    brands,
    prices,
    isFilterListLoading: isLoadingBrands || isLoadingPrices,
  };
}
