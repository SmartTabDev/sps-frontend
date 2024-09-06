export interface MarketplaceProductBase {
  buyBoxRetailer: string;
  offersCount: number;
  pictureUrl: string;
  price?: number;
  reviewsCount: number;
  runTime: string;
  scoring: number;
  url: string;
  clientPrice: number;
  minPrice: number;
  maxPrice: number;
  clientPosition: number;
}

export interface MarketplacePriceRangeBase {
  minPrice: number;
  maxPrice: number;
}

export type MarketplaceOfferBase = {
  productName: string;
  retailer: string;
  price: number;
  description: string;
  available: boolean;
  scoring: number;
  reviewsCount: number;
  type?: string;
  goToShopUrl: string;
}
