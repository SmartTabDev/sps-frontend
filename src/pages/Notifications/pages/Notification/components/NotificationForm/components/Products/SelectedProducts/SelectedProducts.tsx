import BaseDataGrid from 'pages/Notifications/components/BaseDataGrid/BaseDataGrid';
import React from 'react';
import {
  ConfigBrand,
  ConfigCategory,
  ConfigRetailer,
  ProductLink,
} from 'types/AppConfig';
import { FilterDispatch } from 'hooks/useExpandedFilters';
import {
  GridRowSelectionModel,
  GridSortDirection,
  GridSortModel,
} from '@mui/x-data-grid';
import { Box } from '@mui/system';
import productColumns from '../productColumns';
import Filters, { NotificationProductFilters } from './Filters';

type Props = {
  products: ProductLink[];
  retailers: ConfigRetailer[];
  categories: ConfigCategory[];
  brands: ConfigBrand[];
  filterDispatch: FilterDispatch<NotificationProductFilters>;
  filterState: NotificationProductFilters;
  selectedProducts: GridRowSelectionModel;
  setSelectedProducts: (newSelectionModel: GridRowSelectionModel) => void;
};

const SelectedProducts: React.FC<Props> = (props) => {
  const {
    products,
    retailers,
    categories,
    brands,
    filterDispatch,
    filterState,
    selectedProducts,
    setSelectedProducts,
  } = props;

  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: 'product',
      sort: 'asc' as GridSortDirection,
    },
  ]);

  return (
    <>
      <Filters
        retailers={retailers}
        categories={categories}
        brands={brands}
        filterDispatch={filterDispatch}
        filterState={filterState}
      />
      <Box sx={{ marginTop: '20px' }}>
        <BaseDataGrid
          rows={products}
          columns={productColumns}
          checkboxSelection
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          onRowSelectionModelChange={(newSelectionModel) => {
            setSelectedProducts(newSelectionModel);
          }}
          rowSelectionModel={selectedProducts}
          height={52}
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
        />
      </Box>
    </>
  );
};

export default SelectedProducts;
