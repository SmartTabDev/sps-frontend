import React from 'react';
import { styled } from '@mui/system';
import Skeleton from '@mui/material/Skeleton';
import { formatPercentage } from '../../utils/formatPercentage';
import { formatPriceFn } from '../FormatPrice/FormatPrice';
import { getPercentage } from '../../utils/getPercentage';
import Position from '../Position/Position';
import PriceBox from '../PriceBox/PriceBox';

const Wrapper = styled('div')`
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: center;
  margin-top: 5px;
`;

export type PriceRangeProps = {
  minPrice?: number;
  minPriceRetailer?: string;
  minPriceRetailerUrl?: string;
  maxPrice?: number;
  maxPriceRetailer?: string;
  maxPriceRetailerUrl?: string;
  clientPrice?: number;
  offers: number;
  position?: number;
  isLoading?: boolean;
  labels?: boolean;
  tooltipValue?: string;
};

const PriceRangeSkeleton = () => (
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginRight: '5px',
      }}
    >
      <Skeleton width={21} height={18} />
      <Skeleton width={36} height={18} />
    </div>
    <div>
      <Skeleton width={255} height={18} />
    </div>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '5px',
      }}
    >
      <Skeleton width={21} height={18} />
      <Skeleton width={36} height={18} />
    </div>
  </div>
);

const getLabel = (theirPrice?: number, ourPrice?: number) => `${theirPrice && ourPrice ? formatPriceFn(theirPrice - ourPrice) : ''}  ${theirPrice && ourPrice
  ? formatPercentage(Math.abs(getPercentage(theirPrice, ourPrice) - 100))
  : ''
}`;

const PriceRange: React.FC<PriceRangeProps> = ({
  minPrice,
  minPriceRetailer,
  minPriceRetailerUrl,
  maxPrice,
  maxPriceRetailer,
  maxPriceRetailerUrl,
  clientPrice,
  offers,
  position,
  labels = true,
  isLoading = false,
  tooltipValue = '',
}) => (
  <Wrapper>
    {isLoading ? (
      <PriceRangeSkeleton />
    )
      : (
        <>
          <PriceBox
            price={minPrice}
            retailer={minPriceRetailer}
            retailerUrl={minPriceRetailerUrl}
            align="right"
            label={labels ? getLabel(minPrice, clientPrice) : ''}
            disableLabel={!maxPrice || !clientPrice}
          />
          <Position amount={offers} place={position} tooltipValue={tooltipValue} />
          <PriceBox
            price={maxPrice}
            retailer={maxPriceRetailer}
            retailerUrl={maxPriceRetailerUrl}
            label={labels ? getLabel(maxPrice, clientPrice) : ''}
            disableLabel={!maxPrice || !clientPrice}
          />
        </>
      )}
  </Wrapper>
);

export default PriceRange;
