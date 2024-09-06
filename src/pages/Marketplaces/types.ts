import {
  CeneoOfferRaw,
  CeneoPriceRangeRaw,
  CeneoProductRaw,
} from './ceneo/types';
import {
  IdealoOfferRaw,
  IdealoPriceRangeRaw,
  IdealoProductRaw,
} from './idealo/types';

// run

export type MarketplaceRun = {
  createdat: string;
};

// product

type IdealoProduct = UnifyProduct<IdealoProductRaw>;
type CeneoProduct = UnifyProduct<CeneoProductRaw>;

export type MarketplaceProductRaw = IdealoProductRaw | CeneoProductRaw;
export type MarketplaceProduct = IdealoProduct | CeneoProduct;

// price range

type IdealoPriceRange = UnifyProductName<IdealoPriceRangeRaw>;
type CeneoPriceRange = UnifyProductName<CeneoPriceRangeRaw>;

export type MarketplacePriceRangeRaw = IdealoPriceRangeRaw | CeneoPriceRangeRaw;
export type MarketplacePriceRange = IdealoPriceRange | CeneoPriceRange;

// offer

export type IdealoOffer = UnifyProductName<IdealoOfferRaw>;
export type CeneoOffer = UnifyProductName<CeneoOfferRaw>;

export type MarketplaceOfferRaw = IdealoOfferRaw | CeneoOfferRaw;
export type MarketplaceOffer = IdealoOffer | CeneoOffer;

// all product/offers/price-range data in single object

export type MarketplaceMergedProduct = Partial<MarketplaceProduct> &
  Partial<MarketplaceOffer> &
  Partial<MarketplacePriceRange>;

// map products, offers, price range to ListingProduct
export type MarketplaceListingProduct = {
  productId?: string;
  pictureUrl?: string;
  brand?: string;
  url?: string;
  buyboxPrice?: number;
  buyBoxRetailer?: string;
  clientPrice?: number;
  clientPosition?: number;
  minPrice?: number;
  maxPrice?: number;
  productName?: string;
  offersCount?: number;
  badges?: Pick<CeneoOffer, 'promo' | 'deliveryPrice' | 'type'>;
};

// make consistent names and change type

type UnifyProduct<P> = UnifyProductName<
  Omit<P, 'runTime' | 'idealoProductId' | 'ceneoProductId'> & {
    runTime: Date;
    productId?: string;
  }
>;

type UnifyProductName<P> = Omit<P, 'idealoProductName' | 'ceneoProductName'> & {
  productName?: string;
};
