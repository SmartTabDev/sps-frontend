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

const Products = getCubeName('Products', 'prm', true);
const Variants = getCubeName('Variants', 'prm', true);

export function getQueryBrandsData(
  run: ProductMonitorRun,
  retailers: ProductMonitorRetailer[],
  category: ProductMonitorCategory
): Query {
  return {
    dimensions: [`${Products}.brand`, `${Variants}.runId`],
    filters: [
      {
        dimension: `${Variants}.runId`,
        operator: 'equals',
        values: [run.id.toString()],
      },
      {
        dimension: `${Products}.brand`,
        operator: 'set',
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
    ],
    order: {
      [`${Products}.brand`]: 'asc',
    },
  };
}

export function useProductMonitorBrands(
  regionCode: string | undefined,
  run?: ProductMonitorRun,
  retailers?: ProductMonitorRetailer[],
  category?: ProductMonitorCategory
): string[] {
  const dispatch = useDispatch();
  const [result, setResult] = useState<string[]>([]);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetch = useCallback(
    async (
      regionCode: string | undefined,
      runToFetch: ProductMonitorRun,
      retailersToFetch: ProductMonitorRetailer[],
      categoryToFetch: ProductMonitorCategory
    ) => {
      if (cubeAccessToken) {
        try {
          const res = await newCubejsApi(cubeAccessToken, regionCode).load(
            getQueryBrandsData(runToFetch, retailersToFetch, categoryToFetch)
          );
          const rows = res.rawData();
          const brands = rows.map(
            (row) => row[`${Products}.brand`]
          ) as string[];

          setResult(brands || []);
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchProductMonitorBrandsData'));
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  useEffect(() => {
    if (regionCode && run && category && retailers) {
      fetch(regionCode, run, retailers, category);
    }
  }, [regionCode, run, category, retailers, fetch]);

  return result;
}
