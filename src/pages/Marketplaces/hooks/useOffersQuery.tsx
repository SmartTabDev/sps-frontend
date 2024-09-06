import { useMemo, useEffect } from 'react';
import getCubeName from 'utils/getCubeName';
import { Query } from '@cubejs-client/core';
import { Marketplace } from 'reducers/auth/auth';
import { getRetailerName } from '../utils/getRetailerName';
import { useCubeJsAPI } from './useCubeJsAPI';
import { MarketplaceOffer } from '../types';

const mapRetailerNames = (row: MarketplaceOffer): MarketplaceOffer => ({
  ...row,
  retailer: getRetailerName(row?.retailer || ''),
});

type Hook = {
  offers: (MarketplaceOffer | undefined)[];
  isOffersLoading: boolean;
};

export function useOffersQuery(
  marketplace?: Marketplace,
  productId?: string,
  lastRunDate?: string,
): Hook {
  const Products = getCubeName('Products', marketplace);
  const Offers = getCubeName('Offers', marketplace);
  const Runs = getCubeName('Runs', marketplace);

  const offersQuery = useMemo<Query>(() => {
    const dimensions = [
      `${Offers}.${marketplace}ProductId`,
      `${Offers}.price`,
      `${Offers}.retailer`,
      `${Offers}.description`,
      `${Offers}.available`,
      `${Offers}.scoring`,
      `${Offers}.reviewsCount`,
      `${Offers}.deliveryPrice`,
      `${Offers}.buyNow`,
      `${Offers}.type`,
      `${Offers}.goToShopUrl`,
      `${Offers}.position`,
      marketplace === 'ceneo' ? `${Offers}.hasTrustedReviews` : '',
      marketplace === 'ceneo' ? `${Offers}.hasPOK` : '',
      marketplace === 'ceneo' ? `${Offers}.promo` : '',
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
        [`${Offers}.postion`]: 'asc',
        [`${Runs}.runTime`]: 'desc',
      },
      filters: [
        {
          dimension: `${Products}.${marketplace}ProductId`,
          operator: 'contains',
          values: [productId!],
        },
      ],
    };
  }, [lastRunDate, productId, marketplace, Offers, Products, Runs]);

  const { list: offers, fetchData, isLoading } = useCubeJsAPI<
    MarketplaceOffer,
    MarketplaceOffer
  >('offers', offersQuery, [], mapRetailerNames);

  useEffect(() => {
    if (Boolean(lastRunDate) && Boolean(productId)) {
      fetchData();
    }
  }, [lastRunDate, productId, fetchData]);

  return {
    offers,
    isOffersLoading: isLoading,
  };
}
