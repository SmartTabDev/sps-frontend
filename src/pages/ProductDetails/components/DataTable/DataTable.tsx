import React from 'react';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  ContentCompassRow,
  ContentCompassRowCurrentValues,
} from 'types/contentCompass/dataTable';
import StatusIcon from 'components/StatusIcon/StatusIcon';
import { DataGridStatusCell } from 'components/DataGridStatusCell/DataGridStatusCell';
import { Box, Typography } from '@mui/material';
import SkeletonCell from 'components/LoadableTableCell/components/SkeletonCell';
import { getContentScoreLevelColor } from './utils/getContentScoreLevelColor';
import { getStatusCellColor } from './utils/getStatusCellColor';

const renderSkeletonCell = () => (
  <Box my="18px" width="100%">
    <SkeletonCell minWidth="100%" />
  </Box>
);

const renderRetailerCell = (
  params: GridRenderCellParams<ContentCompassRow>
) => {
  return params.row.retailer;
};

const renderContentScoreCell = (
  params: GridRenderCellParams<ContentCompassRowCurrentValues>
) => (
  <DataGridStatusCell
    $statusColor={getContentScoreLevelColor(params.row.contentScore)}
    $empty={
      params.row.productListed === 0 || params.row.contentScore === undefined
    }
    sx={{ width: params.colDef.computedWidth }}
  >
    <Typography fontSize="14px" fontWeight={700} align="center">
      {params.row.contentScore}
    </Typography>
  </DataGridStatusCell>
);

const renderProductListedCell = (
  params: GridRenderCellParams<ContentCompassRowCurrentValues>
) => {
  const { productListed } = params.row;

  return (
    <DataGridStatusCell
      $statusColor={productListed ? 'passed' : 'failed'}
      sx={{ width: params.colDef.computedWidth }}
    >
      <StatusIcon match={productListed} size="large" />
    </DataGridStatusCell>
  );
};

const renderStyledStatusCell = (
  params: GridRenderCellParams<ContentCompassRowCurrentValues>
) => {
  const { productListed } = params.row;
  const currentField = params.field as keyof ContentCompassRowCurrentValues;
  const currentCellValue = params.row[currentField];

  return (
    <DataGridStatusCell
      $statusColor={getStatusCellColor(currentCellValue)}
      $empty={productListed === 0 || currentCellValue === undefined}
      sx={{ width: params.colDef.computedWidth }}
    >
      {productListed === 1 && (
        <StatusIcon match={currentCellValue} size="large" />
      )}
    </DataGridStatusCell>
  );
};

interface DataTableProps {
  rows: ContentCompassRow[];
  loading?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ rows, loading }) => {
  const columns: GridColDef<ContentCompassRow>[] = [
    {
      field: 'retailer',
      headerName: 'Retailer',
      width: 400,
      flex: 2,
      renderCell: loading ? renderSkeletonCell : renderRetailerCell,
    },
    {
      field: 'contentScore',
      headerName: 'Content Score',
      headerAlign: 'center',
      align: 'center',
      width: 200,
      flex: 1,
      renderCell: loading ? renderSkeletonCell : renderContentScoreCell,
    },
    {
      field: 'productListed',
      headerName: 'Product listed',
      headerAlign: 'center',
      align: 'center',
      width: 200,
      flex: 1,
      renderCell: loading ? renderSkeletonCell : renderProductListedCell,
    },
    {
      field: 'richContent',
      headerName: 'Rich content',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: loading ? renderSkeletonCell : renderStyledStatusCell,
    },
    {
      field: 'packshotMatch',
      headerName: 'Packshot Match',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: loading ? renderSkeletonCell : renderStyledStatusCell,
    },
    {
      field: 'bulletpoints',
      headerName: 'Bulletpoints',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: loading ? renderSkeletonCell : renderStyledStatusCell,
    },
    {
      field: 'keywords',
      headerName: 'Keywords',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: loading ? renderSkeletonCell : renderStyledStatusCell,
    },
    {
      field: 'images',
      headerName: 'Images',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: loading ? renderSkeletonCell : renderStyledStatusCell,
    },
    {
      field: 'video',
      headerName: 'Video',
      width: 200,
      headerAlign: 'center',
      align: 'center',
      flex: 1,
      renderCell: loading ? renderSkeletonCell : renderStyledStatusCell,
    },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      disableRowSelectionOnClick
      disableColumnMenu
      getRowHeight={() => 'auto'}
      autoHeight
      hideFooter
      sx={{
        padding: '16px 20px',

        '& .MuiDataGrid-columnHeaderTitleContainer': {
          alignItems: 'baseline',

          '& .MuiDataGrid-iconButtonContainer': {
            position: 'relative',
            top: '3.5px',
          },
        },

        '& .MuiDataGrid-columnHeaderTitleContainer::first-child .MuiDataGrid-columnHeaderTitle':
          {
            paddingLeft: '6px',
          },

        '& .MuiDataGrid-columnHeaderTitle': {
          whiteSpace: 'normal',
          lineHeight: 'normal',
          textAlign: 'center',
        },

        '& .MuiDataGrid-columnHeader': {
          height: 'unset !important',
        },

        '& .MuiDataGrid-columnHeaders': {
          maxHeight: '168px !important',
        },
      }}
    />
  );
};

export default DataTable;
