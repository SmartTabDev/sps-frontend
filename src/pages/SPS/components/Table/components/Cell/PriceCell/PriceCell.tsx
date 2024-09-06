import React, { useMemo } from 'react';
import { Box, styled } from '@mui/system';
import {
  BlockOutlined,
  CheckCircleSharp,
  NorthOutlined,
  RemoveSharp,
  SouthOutlined,
  StarBorderOutlined,
  StarSharp,
} from '@mui/icons-material';
import { formatPriceFn } from 'components/FormatPrice/FormatPrice';
import { Typography } from '@mui/material';
import BaseCell from '../BaseCell/BaseCell';

const higherPrice = {
  color: '#28A745',
  fontWeight: '700',
};

const lowerPrice = {
  color: '#EB5757',
  fontWeight: '700',
};

const getPriceValue = (price: number | string, isNA: boolean) => {
  let result = price;

  if (isNA) {
    result = 'N/A';
  }

  if (price === '0.00') {
    result = '—';
  }

  return result;
};

const DenseIconsWrapper = styled('div')`
  display: flex;
  width: 10px;
  position: absolute;
  right: -16px;
  top: 50%;
  transform: translateY(-50%);
  align-items: center;

  > div {
    display: flex;
  }

  svg {
    width: 12px;
    height: 12px;
    color: #5d81b4;
  }
`;

const DensePriceCellWrapper = styled('div')`
  display: grid;
  grid-template-rows: 0px 1fr 0px;
  justify-items: end;
`;

const ExpandPriceCellWrapper = styled('div')`
  display: grid;
  grid-template-rows: 20px 20px 20px;
  justify-items: end;
`;

const ExpandIconsWrapper = styled('div')`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(3, auto);

  svg {
    width: 10px;
    height: 10px;
    color: #5d81b4;
  }
`;

const StyledPriceCell = styled(BaseCell)`
  font-family: Lato;
  font-size: 12px;
`;

const PriceCell: React.FC<{
  isHigher: boolean;
  isLower: boolean;
  isNA: boolean;
  price: string | number;
  regularPrice?: string | number;
  available: boolean;
  isDense: boolean;
  isHighest?: boolean;
}> = ({
  available,
  isHigher,
  isLower,
  price,
  isNA,
  isDense,
  regularPrice,
  isHighest,
}) => {
  const isNotAvailable = useMemo(() => available === false, [available]);
  const priceValue = useMemo(() => getPriceValue(price, isNA), [price, isNA]);
  const regularPriceValue = formatPriceFn(regularPrice as number);

  const valueStyle = {
    ...(isHigher ? higherPrice : {}),
    ...(isLower ? lowerPrice : {}),
  };

  return (
    <StyledPriceCell>
      {isDense ? (
        <DensePriceCellWrapper>
          <div />
          <Box>
            <Box sx={valueStyle}>{priceValue}</Box>
            <DenseIconsWrapper>
              <div>
                {isHigher && <NorthOutlined />}
                {isLower && <SouthOutlined />}
              </div>
            </DenseIconsWrapper>
          </Box>
          <div />
        </DensePriceCellWrapper>
      ) : (
        <ExpandPriceCellWrapper>
          <Box sx={{ mt: '5px' }}>
            <Typography
              sx={{
                fontSize: '10px',
                color: 'rgba(93, 129, 180, 0.8)',
                fontWeight: 600,
              }}
            >
              {regularPriceValue !== '0,00' ? regularPriceValue : ''}
            </Typography>
          </Box>
          <Box sx={valueStyle}>{priceValue}</Box>
          <ExpandIconsWrapper>
            {isHighest === false && (
              <StarBorderOutlined sx={{ fill: 'rgba(152, 175, 207, 0.5)' }} />
            )}
            {isHighest === true && (
              <StarSharp sx={{ fill: 'rgba(93, 129, 180, 0.8)' }} />
            )}
            {isNotAvailable ? (
              <BlockOutlined sx={{ fill: 'rgba(152, 175, 207, 0.5)' }} />
            ) : (
              <CheckCircleSharp sx={{ fill: 'rgba(93, 129, 180, 0.8)' }} />
            )}
            {isHigher && (
              <NorthOutlined sx={{ fill: 'rgba(93, 129, 180, 0.8)' }} />
            )}
            {isLower && (
              <SouthOutlined sx={{ fill: 'rgba(93, 129, 180, 0.8)' }} />
            )}
            {!isLower && !isHigher && (
              <RemoveSharp sx={{ fill: 'rgba(152, 175, 207, 0.5)' }} />
            )}
          </ExpandIconsWrapper>
        </ExpandPriceCellWrapper>
      )}
    </StyledPriceCell>
  );
};

export default PriceCell;
