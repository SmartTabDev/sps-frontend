import React from 'react';
import { ProductLink } from 'types/AppConfig';
import BaseDataGrid from 'pages/Notifications/components/BaseDataGrid/BaseDataGrid';
import { GridSortDirection, GridSortModel } from '@mui/x-data-grid';
import productColumns from '../productColumns';

type Props = {
  products: ProductLink[];
};

const AllProducts: React.FC<Props> = (props) => {
  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: 'product',
      sort: 'asc' as GridSortDirection,
    },
  ]);

  const { products } = props;

  return (
    <BaseDataGrid
      rows={products}
      columns={productColumns}
      disableRowSelectionOnClick
      sortModel={sortModel}
      onSortModelChange={(model) => setSortModel(model)}
      height={60}
      initialState={{
        columns: {
          columnVisibilityModel: {
            id: false,
          },
        },
      }}
    />
  );
};

export default AllProducts;
