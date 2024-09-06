/* eslint-disable camelcase */
import { ProductDescription } from 'api/hooks/useProductDescriptionQuery';
import ContentCompassProductInfo from '../types/ContentCompassProductInfo';
import { convertRatingToPercentage } from './convertRatingToPercentage';

export const convertProductDescriptionFromApiToProductInfo = (
  productDescription?: ProductDescription,
  productId?: string
): ContentCompassProductInfo => {
  if (!productDescription) return {};

  const {
    brand,
    ean,
    last_updated,
    max_price,
    min_price,
    name,
    rating,
    total_ratings,
    image,
  } = productDescription;

  return {
    brand,
    ean,
    lastUpdatedAt: last_updated,
    maxPrice: max_price,
    minPrice: min_price,
    productName: name,
    reviewsCount: total_ratings,
    scoring: convertRatingToPercentage(rating),
    productId,
    pictureUrl: image,
  };
};
