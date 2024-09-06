import React from 'react';
import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/system';
import PriceBox from 'components/PriceBox/PriceBox';
import { StyledSkeleton } from './Skeleton';

interface Props {
  price?: number;
  isLoading: boolean;
}

const ContentWrapper = styled('div')`
  margin-top: -40px;
  display: flex;
  justify-content: flex-end;
`;

const StyledTableCell = styled(TableCell)`
  min-width: 150px;
`;

export const PriceCell: React.FC<Props> = ({ price, isLoading }) => (
  <StyledTableCell>
    <ContentWrapper>
      {isLoading ? (
        <StyledSkeleton width={110} height={20} />
      ) : (
        <PriceBox
          priceSize="big"
          price={price}
          disableRetailer
          align="right"
          noPaddings
        />
      )}
    </ContentWrapper>
  </StyledTableCell>
);
