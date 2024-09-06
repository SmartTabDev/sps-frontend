import { MarketplaceProductBase, MarketplacePriceRangeBase, MarketplaceOfferBase } from '../sharedTypes';

export interface CeneoProductRaw extends MarketplaceProductBase {
  brand: string;
  ceneoProductName: string;
  ceneoProductId: string;
}

export interface CeneoPriceRangeRaw extends MarketplacePriceRangeBase {
  ceneoProductName?: string;
}

export interface CeneoOfferRaw extends MarketplaceOfferBase {
  ceneoProductName?: string;
  buyNow?: boolean;
  deliveryPrice?: number;
  hasTrustedReviews?: boolean;
  hasPOK?: boolean;
  promo?: boolean;
  type?: string;
  position: number;
}
