import React from 'react';
import TableCell from '@mui/material/TableCell';
import PriceRange from 'components/PriceRange/PriceRange';
import { styled } from '@mui/system';
import { MarketplaceListingProduct } from 'pages/Marketplaces/types';

interface Props {
  product?: MarketplaceListingProduct;
  isLoading: boolean;
}

const StyledTableCell = styled(TableCell)`
  vertical-align: top;
  min-width: 500px;
  padding-top: 40px;
`;

export const PositionCell: React.FC<Props> = ({ product, isLoading }) => (
  <StyledTableCell>
    <PriceRange
      minPrice={product?.minPrice}
      minPriceRetailer=""
      minPriceRetailerUrl=""
      maxPrice={product?.maxPrice}
      maxPriceRetailer=""
      maxPriceRetailerUrl=""
      clientPrice={product?.clientPrice}
      offers={product?.offersCount || 0}
      position={
        product?.clientPosition !== undefined
        && product?.clientPosition !== null
          ? product?.clientPosition + 1
          : product?.clientPosition
      }
      isLoading={isLoading}
    />
  </StyledTableCell>
);
