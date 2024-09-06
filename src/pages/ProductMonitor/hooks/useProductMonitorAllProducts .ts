import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import axios from 'axios';
import {
  ProductMonitorCategory,
  ProductMonitorFilters,
  ProductMonitorRetailer,
  ProductMonitorRun,
  ProductMonitorPriceRange,
  ProductMonitorFeature,
} from '../types';
import { getQueryFilters } from '../utils/getQueryFilters';

interface Hook {
  allProductIds: string[];
}

export function useProductMonitorAllProducts(
  run?: ProductMonitorRun,
  filters?: ProductMonitorFilters
): Hook {
  const dispatch = useDispatch();
  const [allProductIds, setAllProductIds] = useState<Hook['allProductIds']>([]);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetch = useCallback(
    async (
      dimensionsToFetch: string[],
      runToFetch: ProductMonitorRun,
      categoryToFetch: ProductMonitorCategory,
      retailersToFetch: ProductMonitorRetailer[],
      brandsToFetch: string[],
      featuresToFetch?: ProductMonitorFeature[],
      priceRangeToFetch?: ProductMonitorPriceRange,
      searchToFetch?: string
    ) => {
      if (cubeAccessToken) {
        try {
          const res = await axios.post<{ data: any[] }>(
            `${process.env.REACT_APP_CUBE_JS_API}/load`,
            {
              query: {
                dimensions: dimensionsToFetch,
                ...getQueryFilters(
                  runToFetch,
                  categoryToFetch,
                  retailersToFetch,
                  brandsToFetch,
                  priceRangeToFetch,
                  featuresToFetch,
                  undefined, // no filter by products
                  searchToFetch
                ),
              },
            },
            {
              headers: {
                'Content-type': 'application/json',
                Authorization: cubeAccessToken,
              },
            }
          );

          const rows = res.data.data;

          setAllProductIds(
            (rows || []).map((row) => String(row['Products_prm.id']))
          );
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchProductMonitorList'));
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  useEffect(() => {
    if (run && filters && filters.category && filters.retailers) {
      fetch(
        ['Products_prm.id'],
        run,
        filters.category,
        filters.retailers,
        filters.brands,
        filters.features,
        filters.priceRange,
        filters.search
      );
    }
  }, [run, filters, fetch]);

  return {
    allProductIds,
  };
}
