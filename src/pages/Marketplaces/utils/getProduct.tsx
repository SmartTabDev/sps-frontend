import pick from 'lodash/pick';
import {
  MarketplaceProduct,
  MarketplaceOffer,
  MarketplaceListingProduct,
} from '../types';
import { matchMarketplaceRecord } from './matchMarketplaceRecord';

type Product = {
  productName?: string;
  [key: string]: any;
};

type ProductData = {
  product: MarketplaceProduct | undefined;
  clientOffer: MarketplaceOffer | undefined;
};

export const getProduct = (
  products: (MarketplaceProduct | undefined)[],
  productId: string | undefined,
  clientOffers: (MarketplaceOffer | undefined)[]
): ProductData => {
  const product = products.find((p) => p?.productId === productId);
  const matchProduct = matchMarketplaceRecord<Product>(
    'productName',
    product?.productName
  );
  const clientOffer = clientOffers.find(matchProduct);

  return {
    product,
    clientOffer,
  };
};

export const getListingProducts = (
  products: (MarketplaceProduct | undefined)[],
  clientOffers: (MarketplaceOffer | undefined)[]
): MarketplaceListingProduct[] => {
  const listing = products.map((product) => {
    const matchProduct = matchMarketplaceRecord<Product>(
      'productName',
      product?.productName
    );
    const clientOffer = clientOffers.find(matchProduct);

    return {
      productId: product?.productId,
      pictureUrl: product?.pictureUrl,
      url: product?.url,
      brand: product && 'brand' in product ? product?.brand : '',
      buyboxPrice: product?.price,
      buyBoxRetailer: product?.buyBoxRetailer,
      clientPrice: product?.clientPrice,
      clientPosition: product?.clientPosition,
      minPrice: product?.minPrice,
      maxPrice: product?.maxPrice,
      productName: product?.productName,
      offersCount: Number(product?.offersCount),
      badges: pick(clientOffer, 'deliveryPrice', 'type', 'promo', 'position'),
    };
  });

  return listing;
};
