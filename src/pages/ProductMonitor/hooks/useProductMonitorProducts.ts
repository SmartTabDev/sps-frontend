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
  ProductStructure,
} from '../types';
import { getQueryFilters } from '../utils/getQueryFilters';

interface Hook {
  productsStructure: ProductStructure;
  productIds: string[];
}

function mapRowsToProductsId(rows: any[]): ProductStructure {
  const productsStructure: ProductStructure = {};

  rows.forEach((row) => {
    productsStructure[
      `${row['Products_prm.brand']}${row['Products_prm.name']}`
        .toUpperCase()
        .replace(/ /g, '')
    ] = row['Products_prm.id'];
  });

  return productsStructure;
}

export function useProductMonitorProducts(
  limit: number,
  offset: number,
  run?: ProductMonitorRun,
  filters?: ProductMonitorFilters
): Hook {
  const dispatch = useDispatch();
  const [productsStructure, setProductsStructure] = useState<
    Hook['productsStructure']
  >({});
  const [productIds, setProductIds] = useState<Hook['productIds']>([]);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetch = useCallback(
    async (
      dimensionsToFetch: string[],
      limitToFetch: number | undefined,
      offsetToFetch: number | undefined,
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
                limit: limitToFetch,
                offset: offsetToFetch,
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

          setProductIds(
            (rows || []).map((row) => String(row['Products_prm.id']))
          );
          setProductsStructure(mapRowsToProductsId(rows));
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchProductMonitorList'));
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  useEffect(() => {
    if (
      limit &&
      offset !== undefined &&
      run &&
      filters &&
      filters.category &&
      filters.retailers
    ) {
      fetch(
        ['Products_prm.name', 'Products_prm.brand', 'Products_prm.id'],
        limit,
        offset,
        run,
        filters.category,
        filters.retailers,
        filters.brands,
        filters.features,
        filters.priceRange,
        filters.search
      );
    }
  }, [limit, offset, run, filters, fetch]);

  return {
    productsStructure,
    productIds,
  };
}
