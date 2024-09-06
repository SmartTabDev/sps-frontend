import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import handleRequestError from 'reducers/auth/handleRequestError';
import formatPrice from 'utils/formatPrice';
import axios from 'axios';
import {
  ProductMonitorCategory,
  ProductMonitorFilters,
  ProductMonitorList,
  ProductMonitorRetailer,
  ProductMonitorRun,
  ProductMonitorPriceRange,
  ProductMonitorFeature,
} from '../types';
import { getQueryFilters } from '../utils/getQueryFilters';

interface Hook {
  list: ProductMonitorList;
  productsId: Record<string, number>;
  isLoading: boolean;
}

function getPriceChange(
  priceA: number | undefined,
  priceB: number
): 'lower' | 'higher' | null {
  if (!priceA) {
    return null;
  }

  if (priceA === priceB) {
    return null;
  }

  return priceA > priceB ? 'lower' : 'higher';
}

function mapProductsStructureToList(
  products: Map<string, Product>,
  retailers: ProductMonitorRetailer[]
): ProductMonitorList {
  const list: ProductMonitorList = [];

  Array.from(products.values()).forEach((product) => {
    const prices = retailers.map((retailer) => {
      const retailerInProduct = product.prices[retailer.id];
      if (!retailerInProduct) {
        return null;
      }

      const { price, prevPrice } = retailerInProduct;

      if (!price) {
        return null;
      }

      return {
        url: retailerInProduct.url,
        price: formatPrice(price),
        change: getPriceChange(prevPrice, price),
        available: retailerInProduct.available,
      };
    });
    list.push([product.brand, String(product.name).toLowerCase(), ...prices]); // add a new row
  });

  return list;
}

function mapRowsToProductsId(rows: any[]): Record<string, number> {
  const productsId: Record<string, number> = {};

  rows.forEach((row) => {
    productsId[
      `${row['Products_prm.brand']}${row['Products_prm.name']}`
        .toUpperCase()
        .replace(/ /g, '')
    ] = row['Variants_prm.productId'];
  });

  return productsId;
}

interface Price {
  price?: number;
  prevPrice?: number;
  change?: 'higher' | 'lower' | null;
  available?: 1 | 0;
  url?: string;
}

type Product = {
  name: string;
  brand: string;
  prices: Record<string, Price>;
};

function mapRowsToProductsStructure(
  rows: any[],
  priceName: keyof Price,
  products = new Map<string, Product>()
): Map<string, Product> {
  rows.forEach((row) => {
    const productId = row['Variants_prm.productId'];
    const price = row['Variants_prm.price'];
    const available = row['Variants_prm.available'];
    const url = row['Variants_prm.url'];
    const product = products.get(productId);

    if (!product) {
      if (priceName === 'price') {
        // create new only for base price
        const newProduct: Product = {
          name: row['Products_prm.name'],
          brand: row['Products_prm.brand']?.toUpperCase(),
          prices: {
            [row['Variants_prm.retailerId']]: {
              [priceName]: price,
              available,
              url,
            },
          },
        };
        products.set(productId, newProduct);
      }
    } else {
      const retailer = product.prices[row['Variants_prm.retailerId']];
      if (!retailer) {
        if (priceName === 'price') {
          // create new only for base price
          product.prices[row['Variants_prm.retailerId']] = {
            [priceName]: price,
            available,
            url,
          };
        }
      } else {
        // for both price and prevPrice
        retailer[priceName] = price;
      }
    }
  });

  return products;
}

function buildSkeletonList(x: number, y: number): undefined[][] {
  return Array.from(Array(y)).map(() => Array.from(Array(x)));
}

const bigSkeletons = buildSkeletonList(30, 30);

const dimensions = [
  'Products_prm.name',
  'Products_prm.normalizedName',
  'Products_prm.brand',
  'Variants_prm.price',
  'Variants_prm.url',
  'Variants_prm.available',
  'Variants_prm.productId',
  'Variants_prm.retailerId',
];

export function useProductMonitorList(
  productIds: string[],
  run?: ProductMonitorRun,
  prevRun?: ProductMonitorRun,
  filters?: ProductMonitorFilters
): Hook {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [list, setList] = useState<Hook['list']>(bigSkeletons);
  const [productsId, setProductsId] = useState<Hook['productsId']>({});

  const cubeAccessToken = useSelector(
    (state: RootState) => state.auth.cubeAccessToken
  );

  const fetch = useCallback(
    async (
      productIdsToFetch: string[],
      runToFetch: ProductMonitorRun,
      categoryToFetch: ProductMonitorCategory,
      retailersToFetch: ProductMonitorRetailer[],
      brandsToFetch: string[],
      featuresToFetch?: ProductMonitorFeature[],
      priceRangeToFetch?: ProductMonitorPriceRange,
      searchToFetch?: string,
      prevRunToFetch?: ProductMonitorRun
    ) => {
      if (cubeAccessToken) {
        try {
          setIsLoading(true);
          setList(bigSkeletons);
          const res = await axios.post<{ data: any[] }>(
            `${process.env.REACT_APP_CUBE_JS_API}/load`,
            {
              query: {
                dimensions,
                ...getQueryFilters(
                  runToFetch,
                  categoryToFetch,
                  retailersToFetch,
                  brandsToFetch,
                  priceRangeToFetch,
                  featuresToFetch,
                  productIdsToFetch,
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
          const products = mapRowsToProductsStructure(rows, 'price');

          if (prevRunToFetch) {
            const prevRes = await axios.post<{ data: any[] }>(
              `${process.env.REACT_APP_CUBE_JS_API}/load`,
              {
                query: {
                  dimensions,
                  ...getQueryFilters(
                    prevRunToFetch,
                    categoryToFetch,
                    retailersToFetch,
                    brandsToFetch,
                    priceRangeToFetch,
                    featuresToFetch,
                    productIdsToFetch,
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
            const prevRows = prevRes.data.data;

            mapRowsToProductsStructure(prevRows, 'prevPrice', products);
          }
          setList(() => [
            ['Brand', 'Product', ...retailersToFetch.map((r) => r.name)],
            ...mapProductsStructureToList(products, retailersToFetch),
          ]);
          setProductsId(mapRowsToProductsId(rows));
          setIsLoading(false);
        } catch (error) {
          dispatch(handleRequestError(error, 'fetchProductMonitorList'));
          setIsLoading(false);
        }
      }
    },
    [cubeAccessToken, dispatch]
  );

  useEffect(() => {
    if (productIds && run && filters && filters.category && filters.retailers) {
      fetch(
        productIds,
        run,
        filters.category,
        filters.retailers,
        filters.brands,
        filters.features,
        filters.priceRange,
        filters.search,
        prevRun
      );
    } else {
      setList(bigSkeletons);
    }
  }, [productIds, run, prevRun, filters, fetch]);

  return {
    list,
    productsId,
    isLoading,
  };
}
