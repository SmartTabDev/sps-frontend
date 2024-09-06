import React from 'react';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/system';
import { useRouteMatch, Link } from 'react-router-dom';
import BaseLink from 'components/BaseLink/BaseLink';
import { MarketplaceListingProduct } from 'pages/Marketplaces/types';
import { StyledSkeleton } from './Skeleton';

const BuyBoxRetailer = styled('p')`
  font-size: 12px;
  margin-bottom: 3px;
`;

const ProductName = styled('span')`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 16px;
  white-space: initial;
`;

const SkeletonWrapper = styled('div')`
  padding-left: 16px;
  padding-right: 16px;
`;

const StyledTableCell = styled(TableCell)`
  vertical-align: top;
  max-width: 250px;
`;

const ProductNameSkeleton = () => (
  <SkeletonWrapper>
    <StyledSkeleton width={100} height={14} />
    <StyledSkeleton width={200} height={26} />
    <StyledSkeleton width={100} height={14} style={{ marginTop: 20 }} />
    <div style={{ display: 'flex', marginTop: 5 }}>
      <StyledSkeleton width={16} height={18} style={{ marginRight: 10 }} />
      <StyledSkeleton width={16} height={18} style={{ marginRight: 10 }} />
      <StyledSkeleton width={16} height={18} style={{ marginRight: 10 }} />
    </div>
  </SkeletonWrapper>
);

interface Props {
  product?: MarketplaceListingProduct;
}

export const ProductNameCell: React.FC<Props> = ({ product, children }) => {
  const match = useRouteMatch();

  return (
    <StyledTableCell>
      {product === undefined ? (
        <ProductNameSkeleton />
      ) : (
        <>
          {'brand' in product && (
            <BuyBoxRetailer>{product.brand}</BuyBoxRetailer>
          )}
          <Link
            to={`${match.url}/product/${product.productId}/price-drilldown`}
          >
            <ProductName>{product.productName}</ProductName>
          </Link>
          <br />
          ID: <BaseLink href={product.url}>{product.productId}</BaseLink>
          {children}
        </>
      )}
    </StyledTableCell>
  );
};
