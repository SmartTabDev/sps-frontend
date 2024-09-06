export default interface ContentCompassProductInfo {
  productId?: string;
  productName?: string;
  brand?: string;
  ean?: string;
  minPrice?: number;
  maxPrice?: number;
  pictureUrl?: string;
  lastUpdatedAt?: string;
  scoring?: number;
  reviewsCount?: number;
}
