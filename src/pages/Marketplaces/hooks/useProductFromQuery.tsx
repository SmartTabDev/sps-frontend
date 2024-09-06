import { useMemo } from 'react';
import { Marketplace } from 'reducers/auth/auth';
import { getProduct } from 'pages/Marketplaces/utils/getProduct';
import { MarketplaceMergedProduct } from '../types';
import { useProductQuery } from './useProductQuery';

export const useProductFromQuery = (
  marketplace: Marketplace | undefined,
  productId: string,
  lastRunDate: string,
  clientName: string
): MarketplaceMergedProduct => {
  const productFromQuery = useProductQuery(
    marketplace,
    productId,
    lastRunDate,
    clientName
  );

  const productFromQueryArray = useMemo(() => {
    return [productFromQuery];
  }, [productFromQuery]);

  const { product, clientOffer } = getProduct(
    productFromQueryArray,
    productId,
    []
  );

  const queryProduct = useMemo(
    () => ({ ...product, ...clientOffer }),
    [product, clientOffer]
  );

  return queryProduct;
};
