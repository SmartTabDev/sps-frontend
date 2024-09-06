import React from 'react';
import { styled, css } from '@mui/system';

const nf = new Intl.NumberFormat('pl-PL', {
  style: 'decimal',
  minimumFractionDigits: 2,
});

type Size = 'tiny' | 'small' | 'small-medium' | 'medium' | 'big' | 'inherit';

const Price = styled('span', {
  shouldForwardProp: (props) => props !== '$size',
})<{ $size: Size }>`
  font-size: inherit;
  font-weight: inherit;

  ${({ $size }) =>
    $size === 'tiny' &&
    css`
      font-size: 10px;
    `}

  ${({ $size }) =>
    $size === 'small' &&
    css`
      font-size: 12px;
      font-weight: 700;
    `}

  ${({ $size }) =>
    $size === 'small-medium' &&
    css`
      font-size: 16px;
      font-weight: 700;
    `}

  ${({ $size }) =>
    $size === 'medium' &&
    css`
      font-size: 18px;
      font-weight: 700;
    `}

    ${({ $size }) =>
    $size === 'big' &&
    css`
      font-size: 22px;
      font-weight: 700;
    `}
`;

export const StyledNA = styled('span')`
  color: ${({ theme }) => theme.palette.grey[400]};
`;

export type FormatPriceProps = {
  price?: number;
  size: Size;
  showPlus?: boolean;
};

export const formatPriceFn = (price: number): string => {
  const result = nf.format(price).replace('.', ',');
  return result;
};

const FormatPrice: React.FC<FormatPriceProps> = ({ price, size, showPlus }) => (
  <Price $size={size}>
    {showPlus && Math.sign(price || 0) === 1 && '+'}
    {price && !Number.isNaN(price) ? (
      formatPriceFn(price as number)
    ) : (
      <StyledNA>N/A</StyledNA>
    )}
  </Price>
);

export default FormatPrice;
