import { DataGridProps } from '@mui/x-data-grid';
import {
  ConfigBrand,
  ConfigCategory,
  ConfigProduct,
  ConfigRetailer,
} from 'types/AppConfig';

const productColumns: DataGridProps['columns'] = [
  {
    field: 'id',
    type: 'string',
  },
  {
    field: 'product',
    headerName: 'Product name',
    type: 'string',
    valueFormatter: ({ value }) => (value as ConfigProduct)?.name || 'N/A',
    sortComparator: (_v1, _v2) => {
      if (_v1 && _v2) {
        return (_v1 as ConfigProduct).name.localeCompare(
          (_v2 as ConfigProduct).name
        );
      }

      return 0;
    },
    width: 150,
    flex: 0.25,
  },
  {
    field: 'retailer',
    headerName: 'Retailer',
    type: 'string',
    valueFormatter: ({ value }) => (value as ConfigRetailer)?.name || 'N/A',
    sortComparator: (_v1, _v2) => {
      if (_v1 && _v2) {
        return (_v1 as ConfigRetailer).name.localeCompare(
          (_v2 as ConfigRetailer).name
        );
      }

      return 0;
    },
    width: 150,
    flex: 0.25,
  },
  {
    field: 'category',
    headerName: 'Category',
    type: 'string',
    valueFormatter: ({ value }) => (value as ConfigCategory)?.name || 'N/A',
    sortComparator: (_v1, _v2) => {
      if (_v1 && _v2) {
        return (_v1 as ConfigCategory).name.localeCompare(
          (_v2 as ConfigCategory).name
        );
      }

      return 0;
    },
    width: 150,
    flex: 0.25,
  },
  {
    field: 'brand',
    headerName: 'Brand',
    type: 'string',
    valueFormatter: ({ value }) => (value as ConfigBrand)?.name || 'N/A',
    sortComparator: (_v1, _v2) => {
      if (_v1 && _v2) {
        return (_v1 as ConfigBrand).name.localeCompare(
          (_v2 as ConfigBrand).name
        );
      }

      return 0;
    },
    width: 150,
    flex: 0.25,
  },
];

export default productColumns;
