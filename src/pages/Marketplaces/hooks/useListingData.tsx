import uniqBy from 'lodash/uniqBy';
import { Marketplace } from 'reducers/auth/auth';
import { useMemo } from 'react';
import { Filter } from '@cubejs-client/core';
import { useClientOfferQuery } from './useClientOfferQuery';
import { MarketplaceOffer, MarketplaceProduct } from '../types';
import { useProductsQuery } from './useProductsQuery';
import { RunsQueryData } from './useRunsQuery';
import { Filters } from './filters/useCubeFilters';

export type ListingData = {
  runTime: string;
  uniqueProducts: (MarketplaceProduct | undefined)[];
  clientOffers: (MarketplaceOffer | undefined)[];
  loadNext: () => void;
  reload: (filters: Filter[]) => void;
  isMore: boolean;
  isLoading: boolean;
  noData: boolean;
};

// return main listing
export function useListingData(
  marketplace: Marketplace,
  clientRetailerName: string,
  filters: Filters,
  runs: RunsQueryData
): ListingData {
  const { lastRun: runTime = '', isLoading: runsLoading } = runs;
  const {
    products,
    isLoading: productsLoading,
    noData,
    isMore,
    loadNext,
    reload,
  } = useProductsQuery(marketplace, runTime, clientRetailerName, filters);
  const { list: clientOffers, isLoading: clientOffersLoading } =
    useClientOfferQuery(marketplace, runTime, clientRetailerName);

  const uniqueProducts = useMemo(
    () => uniqBy(products, `${marketplace}ProductId`),
    [products, marketplace]
  );

  const isLoading = clientOffersLoading || productsLoading || runsLoading;

  return {
    noData,
    isMore,
    loadNext,
    reload,
    clientOffers,
    uniqueProducts,
    isLoading,
    runTime,
  };
}
