import { useEffect, useMemo } from 'react';
import getCubeName from 'utils/getCubeName';
import { Query } from '@cubejs-client/core';
import { Marketplace } from 'reducers/auth/auth';
import { useCubeJsAPI } from './useCubeJsAPI';
import {
  MarketplaceOffer,
  MarketplaceOfferRaw,
} from '../types';

type Hook = {
  isLoading: boolean;
  list: (MarketplaceOffer | undefined)[];
};

function unifyData(row: MarketplaceOfferRaw): MarketplaceOffer {
  if ('ceneoProductName' in row) {
    return {
      ...row,
      productName: row?.ceneoProductName || '',
    };
  }

  if ('idealoProductName' in row) {
    return {
      ...row,
      productName: row?.idealoProductName || '',
    };
  }

  return row;
}

export function useClientOfferQuery(
  marketplace: Marketplace,
  lastRunDate: string,
  clientRetailerName: string,
): Hook {
  const Products = getCubeName('Products', marketplace);
  const Offers = getCubeName('Offers', marketplace);
  const Runs = getCubeName('Runs', marketplace);

  const clientOfferQuery = useMemo<Query>(() => {
    const dimensions = [
      `${Products}.${marketplace}ProductName`,
      `${Offers}.price`,
      `${Offers}.buyNow`,
      `${Offers}.deliveryPrice`,
      `${Offers}.retailer`,
      `${Offers}.type`,
      `${Offers}.position`,
      marketplace === 'ceneo' ? `${Offers}.hasPOK` : '',
      marketplace === 'ceneo' ? `${Offers}.hasTrustedReviews` : '',
      marketplace === 'ceneo' ? `${Offers}.promo` : '',
    ];

    return {
      dimensions: dimensions.filter(Boolean),
      timeDimensions: [
        {
          dimension: `${Products}.runTime`,
          dateRange: lastRunDate,
        },
      ],
      order: {
        [`${Products}.${marketplace}ProductName`]: 'asc',
        [`${Runs}.runTime`]: 'desc',
      },
      filters: [
        {
          dimension: `${Offers}.retailer`,
          operator: 'contains',
          values: [clientRetailerName],
        },
      ],
    };
  }, [lastRunDate, clientRetailerName, marketplace, Products, Offers, Runs]);

  const { list = [], isLoading, fetchData } = useCubeJsAPI<
    MarketplaceOfferRaw,
    MarketplaceOffer
  >('clientOffer', clientOfferQuery, [], unifyData);

  useEffect(() => {
    if (
      Boolean(lastRunDate)
      && Boolean(clientRetailerName)
    ) {
      fetchData();
    }
  }, [lastRunDate, clientRetailerName, fetchData]);

  return {
    list,
    isLoading,
  };
}
