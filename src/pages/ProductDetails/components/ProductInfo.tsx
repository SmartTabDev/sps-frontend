import React from 'react';
import ProductDetailsCard from 'components/ProductDetailsCard/ProductDetailsCard';
import { ProductAttributeRow } from 'components/ProductDetailsCard/ProductAttributesTable';
import FormatMinMaxPrice from 'components/FormatMinMaxPrice';
import { FormatShortDate } from 'components/FormatDate/FormatDate';
import moment from 'moment';
import ContentCompassProductInfo from '../types/ContentCompassProductInfo';

type Props = {
  product: ContentCompassProductInfo;
};

const ProductInfo: React.FC<Props> = ({ product }) => {
  const {
    productId,
    ean,
    productName,
    maxPrice,
    minPrice,
    pictureUrl,
    reviewsCount,
    scoring,
    brand,
    lastUpdatedAt,
  } = product || {};

  const headline = { title: productName || '' };
  const productAttributes: ProductAttributeRow[] | undefined = productId
    ? [
        { title: 'Brand', value: brand },
        { title: 'EAN', value: ean },
        {
          title: 'Min/Max Price',
          value: <FormatMinMaxPrice minPrice={minPrice} maxPrice={maxPrice} />,
        },
        {
          title: 'Last updated',
          value: (
            <FormatShortDate year>{moment(lastUpdatedAt)}</FormatShortDate>
          ),
        },
      ]
    : undefined;

  const reviews = productId
    ? { reviewsText: 'total ratings', scoring, totalCount: reviewsCount }
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

export default ProductInfo;
