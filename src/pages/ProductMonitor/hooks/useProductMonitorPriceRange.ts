import { Query } from '@cubejs-client/core';
import { newCubejsApi } from 'api';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import getCubeName from 'utils/getCubeName';
import {
  ProductMonitorCategory,
  ProductMonitorRetailer,
  ProductMonitorRun,
} from '../types';

const Variants = getCubeName('Variants', 'prm', true);
const Products = getCubeName('Products', 'prm', true);

export function getQueryPriceRange(
  run: ProductMonitorRun,
  retailers: ProductMonitorRetailer[],
  category: ProductMonitorCategory,
  brands: string[]
): Query {
  return {
    measures: [`${Variants}.minPrice`, `${Variants}.maxPrice`],
    filters: [
      {
        dimension: `${Variants}.runId`,
        operator: 'equals',
        values: [run.id.toString()],
      },
      {
        dimension: `${Variants}.categoryId`,
        operator: 'equals',
        values: [category.id.toString()],
      },
      {
        dimension: `${Variants}.retailerId`,
        operator: 'equals',
        values: retailers.map((retailer) => retailer.id.toString()),
      },
      {
        dimension: `${Variants}.price`,
        operator: 'set',
      },
      {
        dimension: `${Variants}.price`,
        operator: 'gt',
        values: ['0'],
      },
      {
        dimension: `${Products}.brand`,
        operator: 'equals',
        values: brands,
      },
    ],
  };
}

export function useProductMonitorPriceRange(
  regionCode: string | undefined,
  run?: ProductMonitorRun,
  retailers?: ProductMonitorRetailer[],
  category?: ProductMonitorCategory,
  brands?: string[]
): { minPrice: number; maxPrice: number } | undefined {
  const dispatch = useDispatch();
  const [result, setResult] = useState<{
    minPrice: number;
    maxPrice: number;
  }>();

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetch = useCallback(
    async (
      regionCode: string | undefined,
      runToFetch: ProductMonitorRun,
      retailersToFetch: ProductMonitorRetailer[],
      categoryToFetch: ProductMonitorCategory,
      brandsToFetch: string[]
    ) => {
      if (cubeAccessToken) {
        try {
          const res = await newCubejsApi(cubeAccessToken, regionCode).load(
            getQueryPriceRange(
              runToFetch,
              retailersToFetch,
              categoryToFetch,
              brandsToFetch
            )
          );
          const rows = res.rawData();
          const minPrice = rows[0][`${Variants}.minPrice`];
          const maxPrice = rows[0][`${Variants}.maxPrice`];

          setResult({
            minPrice,
            maxPrice,
          });
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchProductMonitorPriceRange'));
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  useEffect(() => {
    if (regionCode && run && category && retailers && brands) {
      fetch(regionCode, run, retailers, category, brands);
    }
  }, [regionCode, run, category, retailers, brands, fetch]);

  return result;
}
