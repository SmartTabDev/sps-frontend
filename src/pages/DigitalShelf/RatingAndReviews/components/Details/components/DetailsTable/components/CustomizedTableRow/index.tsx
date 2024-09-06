import React from 'react';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import RatingCell from 'components/Table/RatingCell';
import { StyledTableRow } from 'components/Table/StyledTableRow';
import MainCell from 'components/Table/MainCell';
import { Counter } from 'components/Counter';
import { useSelector } from 'react-redux';
import { RETAILER, CATEGORY, SKU } from 'types/KPITable';
import { Product } from 'types/Product';
import getCategoryName from 'utils/config/getCategoryName';
import getRetailerName from 'utils/config/getRetailerName';

type TableBodyProps = {
  $isGroupOdd?: boolean;
  isLastRow: boolean;
  isFirstRow: boolean;
  numberOfRows: number;
  ratingDetail: Product;
};

export const CustomizedTableRow: React.FC<TableBodyProps> = ({
  $isGroupOdd,
  ratingDetail,
  isLastRow,
  isFirstRow,
  numberOfRows,
}) => {
  const {
    config: {
      kpi: { productRetailers = [], categories = [] },
    },
    ratingAndReviews: { view },
  } = useSelector((state: RootState) => state);

  return (
    <>
      <StyledTableRow
        $isFirst={isFirstRow}
        $isLast={isLastRow}
        $isGroupOdd={$isGroupOdd}
        $noMiddleBorder
      >
        {isFirstRow && (
          <MainCell rowSpan={numberOfRows}>
            {view === RETAILER && getRetailerName(productRetailers, ratingDetail)}
            {view === CATEGORY && getCategoryName(categories, ratingDetail)}
            {view === SKU && (
              <Link href={ratingDetail.url} target="_blank">
                {ratingDetail.productname}
              </Link>
            )}
          </MainCell>
        )}

        {view !== SKU && (
          <TableCell>
            <Link href={ratingDetail.url} target="_blank">
              {ratingDetail.productname}
            </Link>
          </TableCell>
        )}
        {view !== RETAILER && (
          <TableCell>{getRetailerName(productRetailers, ratingDetail)}</TableCell>
        )}
        {view !== CATEGORY && (
          <TableCell>{getCategoryName(categories, ratingDetail)}</TableCell>
        )}

        <TableCell>
          <Counter change={0} fontSize={12}>
            <Typography>{ratingDetail.reviewcount}</Typography>
          </Counter>
        </TableCell>

        <RatingCell rating={ratingDetail.rating} />
      </StyledTableRow>
    </>
  );
};
