import TableCell from '@mui/material/TableCell';
import React from 'react';
import {
  TableView, CATEGORY, RETAILER, SKU,
} from 'types/KPITable';

type Props = {
  view: TableView;
};

export const ShuffledTableHead: React.FC<Props> = ({ view }) => (
  <>
    {view === RETAILER && <TableCell>Retailer</TableCell>}
    {view === CATEGORY && <TableCell>Category</TableCell>}
    {view === SKU && <TableCell>Product</TableCell>}

    {view !== SKU && <TableCell>Product</TableCell>}
    {view !== RETAILER && <TableCell>Retailer</TableCell>}
    {view !== CATEGORY && <TableCell>Category</TableCell>}
  </>
);
