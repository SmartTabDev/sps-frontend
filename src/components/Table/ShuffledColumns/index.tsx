import React from 'react';
import Link from '@mui/material/Link';
import TableCell from '@mui/material/TableCell';
import MainCell from 'components/Table/MainCell';
import {
  TableView, CATEGORY, RETAILER, SKU,
} from 'types/KPITable';
import getRetailerName from 'utils/config/getRetailerName';
import getCategoryName from 'utils/config/getCategoryName';
import { Product } from 'types/Product';
import { useSelector } from 'react-redux';

type Props = {
  product: Product;
  index: number;
  groupLength: number;
  view: TableView;
};

export const ShuffledColumns: React.FC<Props> = ({
  product,
  index,
  groupLength,
  view,
}) => {
  const {
    config: {
      kpi: { productRetailers = [], categories = [] },
    },
  } = useSelector((state: RootState) => state);

  return (
    <>
      {index === 0 && (
        <MainCell rowSpan={groupLength}>
          {view === RETAILER && getRetailerName(productRetailers, product)}
          {view === CATEGORY && getCategoryName(categories, product)}
          {view === SKU && (
            <Link href={product.url} target="_blank">
              {product.productname}
            </Link>
          )}
        </MainCell>
      )}
      {view !== SKU && (
        <TableCell>
          <Link href={product.url} target="_blank">
            {product.productname}
          </Link>
        </TableCell>
      )}
      {view !== RETAILER && (
        <TableCell>{getRetailerName(productRetailers, product)}</TableCell>
      )}
      {view !== CATEGORY && (
        <TableCell>{getCategoryName(categories, product)}</TableCell>
      )}
    </>
  );
};
