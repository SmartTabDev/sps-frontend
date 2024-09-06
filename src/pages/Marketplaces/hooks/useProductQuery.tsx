import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import getCubeName from 'utils/getCubeName';
import { Query } from '@cubejs-client/core';
import { Marketplace } from 'reducers/auth/auth';
import { cubejsApiRetry, newCubejsApi } from 'api';
import { useSelector } from 'react-redux';
import { ConfigContext } from 'contexts/ConfigContext';
import { MarketplaceProduct } from '../types';

export function useProductQuery(
  marketplace?: Marketplace,
  id?: string,
  lastRunDate?: string,
  clientName?: string
): MarketplaceProduct | undefined {
  const { regionCode } = useContext(ConfigContext);

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const Products = getCubeName('Products', marketplace);
  const Runs = getCubeName('Runs', marketplace);
  const [product, setProduct] = useState<MarketplaceProduct | undefined>();

  const productsQuery = useMemo<Query>(() => {
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
      marketplace === 'ceneo' ? `${Products}.brand` : '',
    ];

    return {
      dimensions: dimensions.filter(Boolean),
      timeDimensions: [
        {
          dimension: `${Products}.runTime`,
          dateRange: lastRunDate!,
        },
      ],
      order: {
        [`${Products}.${marketplace}ProductName`]: 'asc',
        [`${Runs}.runTime`]: 'desc',
      },
      filters: [
        {
          dimension: `${Products}.${marketplace}ProductId`,
          operator: 'equals',
          values: [id!],
        },
      ],
    };
  }, [lastRunDate, id, Products, Runs, marketplace]);

  const fetchData = useCallback(async () => {
    const api = newCubejsApi(cubeAccessToken, regionCode, 'useProductQuery', {
      clientName,
    });

    const rows = await cubejsApiRetry<any>(api, productsQuery);
    const item = rows[0];

    if (item) {
      const productId = item[`${marketplace}ProductId`];
      const productName = item[`${marketplace}ProductName`];

      setProduct({
        ...rows[0],
        productId,
        productName,
        runTime: new Date(item.runTime),
      });
    }
  }, [cubeAccessToken, regionCode, productsQuery, clientName, marketplace]);

  useEffect(() => {
    if (
      cubeAccessToken &&
      regionCode &&
      Boolean(lastRunDate) &&
      Boolean(id) &&
      clientName
    ) {
      fetchData();
    }
  }, [lastRunDate, id, clientName, fetchData, regionCode, cubeAccessToken]);

  return product;
}
