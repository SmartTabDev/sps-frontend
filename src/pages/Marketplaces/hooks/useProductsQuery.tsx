import { useState, useContext, useEffect, useCallback } from 'react';
import { Filter, QueryOrder } from '@cubejs-client/core';
import { Marketplace } from 'reducers/auth/auth';
import getCubeName from 'utils/getCubeName';
import { useSelector } from 'react-redux';
import { ConfigContext } from 'contexts/ConfigContext';
import { cubejsApiRetry, newCubejsApi } from 'api';
import { MarketplaceProduct } from '../types';
import { Filters } from './filters/useCubeFilters';

const getProductKey = (key: string, marketplace: Marketplace): string => {
  if (key === 'productName') {
    return `${marketplace}ProductName`;
  }

  return key;
};

const initialState: any[] = [];

const getProductsQuery = (
  lastRunDate: string | undefined,
  marketplace: Marketplace,
  limit: number,
  offset: number,
  filters: Filters
) => {
  const Products = getCubeName('Products', marketplace);
  const Runs = getCubeName('Runs', marketplace);

  const { baseFilters, cubeFilters } = filters;

  const dimensions = [
    `${Products}.${marketplace}ProductId`,
    `${Products}.pictureUrl`,
    `${Products}.thumbnailUrl`,
    `${Products}.${marketplace}ProductName`,
    `${Products}.price`,
    `${Products}.buyBoxRetailer`,
    `${Products}.runTime`,
    `${Products}.url`,
    `${Products}.offersCount`,
    `${Products}.scoring`,
    `${Products}.reviewsCount`,
    `${Products}.clientPosition`,
    `${Products}.clientPrice`,
    `${Products}.minPrice`,
    `${Products}.maxPrice`,
    `${Products}.brand`,
  ].filter(Boolean);

  return {
    dimensions,
    timeDimensions: [
      {
        dimension: `${Products}.runTime`,
        dateRange: lastRunDate,
      },
    ],
    limit,
    offset,
    filters: cubeFilters,
    order: {
      ...(baseFilters.order && baseFilters.order.type
        ? {
            [`${Products}.${getProductKey(
              baseFilters.order.key,
              marketplace
            )}`]: baseFilters.order.type.toLowerCase() as QueryOrder,
          }
        : {}),
      [`${Runs}.runTime`]: 'desc' as const,
    },
  };
};

export function useProductsQuery(
  marketplace: Marketplace,
  lastRunDate: string,
  clientName: string | undefined,
  filters: Filters
): {
  products: (MarketplaceProduct | undefined)[];
  isLoading: boolean;
  noData: boolean;
  isMore: boolean;
  loadNext: () => void;
  reload: (filters: Filter[]) => void;
} {
  const { regionCode } = useContext(ConfigContext);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const [products, setProducts] = useState<any[]>(initialState);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const [isMore, setIsMore] = useState<boolean>(true);
  const [offset, setOffset] = useState<number>(0);
  const [limit] = useState<number>(25);

  const fetchData = useCallback(
    async (offsetToFetch: number) => {
      setLoading(true);

      const productsQuery = getProductsQuery(
        lastRunDate,
        marketplace,
        limit,
        offsetToFetch,
        filters
      );

      const api = newCubejsApi(
        cubeAccessToken,
        regionCode,
        String(offsetToFetch),
        {
          clientname: clientName,
        }
      );

      const rows = await cubejsApiRetry<any>(api, productsQuery);

      const updatedRows = rows.map((row) => ({
        ...row,
        productId: row[`${marketplace}ProductId`],
        productName: row[`${marketplace}ProductName`],
        runTime: new Date(row.runTime),
      }));

      if (updatedRows.length) {
        setProducts((prevArr) => [...prevArr, ...updatedRows]);
        setOffset((prevOffset) => prevOffset + updatedRows.length);
        setLoaded(true);
      }

      setLoading(false);
      setIsMore(updatedRows.length > 0);
    },
    [
      cubeAccessToken,
      regionCode,
      clientName,
      filters,
      limit,
      lastRunDate,
      marketplace,
    ]
  );

  const loadNext = useCallback(() => {
    if (cubeAccessToken && regionCode && lastRunDate && clientName && offset) {
      fetchData(offset);
    }
  }, [lastRunDate, clientName, fetchData, regionCode, cubeAccessToken, offset]);

  const reload = useCallback(() => {
    setProducts([]);
    setOffset(0);
  }, []);

  // initial fetch
  useEffect(() => {
    if (cubeAccessToken && regionCode && lastRunDate && clientName) {
      fetchData(0);
    }
  }, [lastRunDate, clientName, fetchData, regionCode, cubeAccessToken]);

  // reload on filters change
  useEffect(() => {
    reload();
  }, [filters, reload]);

  return {
    noData: products.length === 0 && isLoaded,
    isLoading,
    loadNext,
    reload,
    products,
    isMore,
  };
}
