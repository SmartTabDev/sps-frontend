import React from 'react';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/system';
import PriceBox from 'components/PriceBox/PriceBox';
import { MarketplaceListingProduct } from 'pages/Marketplaces/types';
import { StyledSkeleton } from './Skeleton';

interface Props {
  product?: MarketplaceListingProduct;
}

const ContentWraper = styled('div')`
  margin-top: -40px;
`;

const TableCellWrapper = styled(TableCell)`
  max-width: 100px;
`;

export const BuyBoxCell: React.FC<Props> = ({ product }) => (
  <TableCellWrapper>
    <ContentWraper>
      {product === undefined ? (
        <>
          <StyledSkeleton width={89} height={26} />
          <StyledSkeleton width={89} height={14} />
        </>
      ) : (
        <PriceBox
          price={product.buyboxPrice}
          retailer={product.buyBoxRetailer}
          retailerUrl={`//${product.buyBoxRetailer}`}
          priceSize="medium"
          noPaddings
        />
      )}
    </ContentWraper>
  </TableCellWrapper>
);
