import {
  MarketplacePriceRangeBase,
  MarketplaceProductBase,
  MarketplaceOfferBase,
} from '../sharedTypes';

export interface IdealoProductRaw extends MarketplaceProductBase {
  idealoProductName: string;
  idealoProductId: string;
}

export interface IdealoPriceRangeRaw extends MarketplacePriceRangeBase {
  idealoProductName?: string;
}

export interface IdealoOfferRaw extends MarketplaceOfferBase {
  idealoProductName?: string;
  position?: number;
}
