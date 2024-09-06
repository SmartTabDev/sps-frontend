import { Query } from '@cubejs-client/core';
import intersectionBy from 'lodash/intersectionBy';

import {
  ProductMonitorCategory,
  ProductMonitorRetailer,
  ProductMonitorRun,
  ProductMonitorPriceRange,
  ProductMonitorFeature,
} from '../types';

const intersectFeatures = (features: ProductMonitorFeature[]) => {
  const arrays = features.map((item) => item.values);
  const intersectArrays = intersectionBy(...arrays, 'productId');
  const result = intersectArrays.map((f) => String(f.productId));

  return result;
};

export function getQueryFilters(
  run: ProductMonitorRun,
  category: ProductMonitorCategory,
  retailers: ProductMonitorRetailer[],
  brands: string[],
  priceRange?: ProductMonitorPriceRange,
  features?: ProductMonitorFeature[],
  products?: string[],
  search?: string
): Query {
  return {
    filters: [
      {
        dimension: 'Variants_prm.runId',
        operator: 'equals',
        values: [run.id.toString()],
      },
      {
        dimension: 'Variants_prm.categoryId',
        operator: 'equals',
        values: [category.id.toString()],
      },
      {
        dimension: 'Variants_prm.retailerId',
        operator: 'equals',
        values: retailers.map((retailer) => retailer.id.toString()),
      },
      {
        dimension: 'Variants_prm.productId',
        operator: 'notEquals',
        values: ['99999'],
      },
      {
        dimension: 'Products_prm.name',
        operator: 'set',
      },
      {
        dimension: 'Variants_prm.productId',
        operator: 'set',
      },
      ...((brands && brands.length
        ? [
            {
              dimension: 'Products_prm.brand',
              operator: 'equals',
              values: brands,
            },
          ]
        : []) as any),
      ...(priceRange &&
      priceRange.minPrice &&
      priceRange.maxPrice &&
      priceRange.minPrice !== priceRange.maxPrice
        ? [
            {
              dimension: 'Variants_prm.price',
              operator: 'gte',
              values: [String(priceRange.minPrice)],
            },
            {
              dimension: 'Variants_prm.price',
              operator: 'lte',
              values: [String(priceRange.maxPrice)],
            },
          ]
        : []),
      ...(features && features.length
        ? [
            {
              dimension: 'Variants_prm.productId',
              operator: 'equals',
              values: intersectFeatures(features),
            },
          ]
        : []),
      ...(search && search.length
        ? [
            {
              dimension: 'Products_prm.name',
              operator: 'contains',
              values: [search],
            },
          ]
        : []),
      ...(products && products.length
        ? [
            {
              dimension: 'Products_prm.id',
              operator: 'equals',
              values: products,
            },
          ]
        : []),
    ],
    order: {
      'Products_prm.brand': 'asc',
      'Products_prm.name': 'asc',
    },
  };
}
