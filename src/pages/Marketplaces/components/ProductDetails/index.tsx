import React from 'react';
import {
  MarketplacePriceRange,
  MarketplaceProduct,
} from 'pages/Marketplaces/types';
import ProductDetailsCard from 'components/ProductDetailsCard/ProductDetailsCard';
import { ProductAttributeRow } from 'components/ProductDetailsCard/ProductAttributesTable';
import FormatPrice from 'components/FormatPrice/FormatPrice';

type Props = {
  product: Partial<MarketplacePriceRange & MarketplaceProduct>;
};

export const ProductPageDetails: React.FC<Props> = ({ product }) => {
  let brand;

  const {
    productId,
    productName,
    maxPrice,
    minPrice,
    pictureUrl,
    reviewsCount,
    scoring,
    url,
  } = product || {};

  if ('brand' in product) {
    brand = product.brand;
  }

  const headline = { title: productName || '', url };
  const productAttributes: ProductAttributeRow[] | undefined = productId
    ? [
        { title: 'Brand', value: brand },
        { title: 'ID', value: productId },
        {
          title: 'Max. Price',
          value: <FormatPrice size="inherit" price={maxPrice} />,
        },
        {
          title: 'Min. Price',
          value: <FormatPrice size="inherit" price={minPrice} />,
        },
      ]
    : undefined;

  const reviews = productId
    ? { reviewsText: 'ratings', scoring, totalCount: reviewsCount }
    : undefined;

  return (
    <ProductDetailsCard
      headline={headline}
      pictureUrl={pictureUrl}
      productAttributes={productAttributes}
      reviews={reviews}
    />
  );
};
