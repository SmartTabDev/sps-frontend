import FormatPrice from 'components/FormatPrice/FormatPrice';
import React from 'react';

interface FormatMinMaxPriceProps {
  minPrice?: number;
  maxPrice?: number;
  divider?: string;
}

const FormatMinMaxPrice = ({
  minPrice,
  maxPrice,
  divider = '/',
}: FormatMinMaxPriceProps) => {
  return (
    <>
      <FormatPrice size="inherit" price={minPrice} />
      {` ${divider} `}
      <FormatPrice size="inherit" price={maxPrice} />
    </>
  );
};

export default FormatMinMaxPrice;
