import cubeContainsFilter from 'utils/cube/filters/contains';
import cubeEqualsFilter from 'utils/cube/filters/equals';
import cubeSetFilter from 'utils/cube/filters/set';
import { ExpandedFilters } from 'pages/Marketplaces/components/Filters/Filters';
import { Filter } from '@cubejs-client/core';
import { Marketplace } from 'reducers/auth/auth';
import { TableOrder } from '../../../../hooks/useTableOrder';
import { MarketplaceCubes } from '../utils/useMarketplaceCubes';

type BaseFilters = {
  search: string | null;
  order: TableOrder;
  ids: string[];
};

export type Filters = {
  cubeFilters: Filter[];
  initialFilter: Filter | undefined;
  baseFilters: BaseFilters;
};

export const createExpandedFilters = (
  cubes: MarketplaceCubes,
  clientRetailerName: string,
  data: ExpandedFilters,
  brands: string[],
  allBrandsCount: number
): Filter[] => {
  const { Products, Offers } = cubes;
  const { priceRange, positionRange, badges } = data;

  return [
    // price range
    priceRange.min > 0
      ? {
          dimension: `${Products}.minPrice`,
          operator: 'gte',
          values: [String(priceRange.min)],
        }
      : undefined,
    priceRange.max > 0
      ? {
          dimension: `${Products}.maxPrice`,
          operator: 'lte',
          values: [String(priceRange.max)],
        }
      : undefined,
    priceRange.min > 0 ? cubeSetFilter(`${Products}.minPosition`) : undefined,
    priceRange.max > 0 ? cubeSetFilter(`${Products}.maxPosition`) : undefined,

    // position range
    positionRange.min >= 0 && positionRange.max > 0
      ? {
          dimension: `${Products}.clientPosition`,
          operator: 'gte',
          values: [String(positionRange.min)],
        }
      : undefined,
    positionRange.min >= 0 && positionRange.max > 0
      ? {
          dimension: `${Products}.clientPosition`,
          operator: 'lte',
          values: [String(positionRange.max)],
        }
      : undefined,
    positionRange.min >= 0 && positionRange.max > 0
      ? cubeSetFilter(`${Products}.clientPosition`)
      : undefined,

    // brands
    allBrandsCount !== brands.length && brands.length > 0
      ? cubeContainsFilter(`${Products}.brand`, brands)
      : undefined,

    // badges
    badges.bidding
      ? cubeContainsFilter(`${Offers}.type`, ['bidded'])
      : undefined,
    badges.freeShipping
      ? {
          dimension: `${Offers}.deliveryPrice`,
          operator: 'equals',
          values: [String(0)],
        }
      : undefined,
    badges.trophy
      ? {
          dimension: `${Offers}.position`,
          operator: 'lte',
          values: [String(2)],
        }
      : undefined,
    badges.promotion
      ? {
          dimension: `${Offers}.promo`,
          operator: 'equals',
          values: ['true'],
        }
      : undefined,

    // it should be one client offer per product
    // it's a hack to return list products instead of list of offers
    Object.values(badges).find((b) => b === true)
      ? {
          dimension: `${Offers}.retailer`,
          operator: 'contains',
          values: [clientRetailerName],
        }
      : undefined,
  ].filter(Boolean) as Filter[];
};

// filter client products
// using id's instead of cube context (access to older scraped data for new clients)
export const createIdsFilter = (
  cubes: MarketplaceCubes,
  ids: string[]
): Filter | undefined => {
  const { Products } = cubes;

  return ids.length
    ? cubeEqualsFilter(`${Products}.productId`, ids)
    : undefined;
};

export const createBaseFilters = (
  cubes: MarketplaceCubes,
  marketplace: Marketplace,
  data: BaseFilters
): Filter[] => {
  const { Products } = cubes;
  const { search, order } = data;
  const searchValue = search || '';

  return [
    // client position
    order.key === 'clientPosition'
      ? cubeSetFilter(`${Products}.clientPosition`)
      : undefined,

    // client price
    order.key === 'clientPrice'
      ? cubeSetFilter(`${Products}.clientPrice`)
      : undefined,

    // search
    searchValue.length > 0
      ? cubeContainsFilter(`${Products}.${marketplace}ProductName`, [
          searchValue,
        ])
      : undefined,
  ].filter(Boolean) as Filter[];
};
