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
  total: number;
  limit: number;
  page: number;
  pageCount: number;
  offset: number;
  isLoading: boolean;
  handlePageChange: (event: any, value: number) => void;
}

const measures = ['Products_prm.count'];

export function useProductMonitorPagination(
  run?: ProductMonitorRun,
  filters?: ProductMonitorFilters
): Hook {
  const dispatch = useDispatch();
  const [total, setTotal] = useState<Hook['total']>(0);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const [page, setPage] = useState(1);

  const limit = 50;
  const pageCount = total ? Math.ceil(total / limit) : 0;
  const offset = page > 1 ? (page - 1) * limit : 0;

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
      window.scrollTo(0, 0);
    },
    [setPage]
  );

  const fetch = useCallback(
    async (
      runToFetch: ProductMonitorRun,
      categoryToFetch: ProductMonitorCategory,
      retailersToFetch: ProductMonitorRetailer[],
      brandsToFetch: string[],
      featuresToFetch?: ProductMonitorFeature[],
      priceRangeToFetch?: ProductMonitorPriceRange,
      productsToFetch?: string[],
      searchToFetch?: string
      //   prevRunToFetch?: ProductMonitorRun
    ) => {
      if (cubeAccessToken) {
        try {
          const res = await axios.post<{ data: any[] }>(
            `${process.env.REACT_APP_CUBE_JS_API}/load`,
            {
              query: {
                measures,
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

          const resCount = res.data.data[0]['Products_prm.count' as any];
          setTotal(resCount);
        } catch (error) {
          dispatch(handleRequestError(error, 'useProductMonitorPagination'));
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  useEffect(() => {
    if (run && filters && filters.category && filters.retailers) {
      fetch(
        run,
        filters.category,
        filters.retailers,
        filters.brands,
        filters.features,
        filters.priceRange,
        filters.products,
        filters.search
      );
    }
  }, [run, filters, fetch]);

  return {
    handlePageChange,
    page,
    total,
    limit,
    pageCount,
    offset,
    isLoading: false,
  };
}
