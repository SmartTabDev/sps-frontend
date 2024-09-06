import * as React from 'react';
import {
  GRID_AGGREGATION_FUNCTIONS,
  GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD,
  GridGroupNode,
  GridRowClassNameParams,
  GridColDef,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
  DataGridPremium,
  GridRenderCellParams,
} from '@mui/x-data-grid-premium';
import {
  DataGridNoDataCell,
  DataGridStatusCell,
} from 'components/DataGridStatusCell/DataGridStatusCell';
import { ContentCompassRow } from 'types/contentCompass/dataTable';
import StatusIcon from 'components/StatusIcon/StatusIcon';
import SkeletonCell from 'components/LoadableTableCell/components/SkeletonCell';
import { Typography } from '@mui/material';
import { getContentScoreLevelColor } from 'pages/ProductDetails/components/DataTable/utils/getContentScoreLevelColor';
import { Box, Stack, useTheme } from '@mui/system';
import * as aggregations from './aggregations';
import CustomToolbar from './CustomToolbar/CustomToolbar';

const renderSkeletonCell = () => (
  <Box my="18px" width="100%">
    <SkeletonCell minWidth="100%" />
  </Box>
);

const renderAggregationCell = (params: GridRenderCellParams) => {
  const prev = params.formattedValue?.prev;
  const current = params.formattedValue?.current;
  const { computedWidth } = params.colDef;

  if (current === undefined && prev === undefined) {
    return <DataGridNoDataCell sx={{ width: computedWidth }} />;
  }

  if (params.rowNode.depth === 0) {
    return (
      <Box
        sx={{ textAlign: 'center', width: computedWidth }}
      >{`${current} (${prev})`}</Box>
    );
  }

  return (
    <DataGridStatusCell
      $statusColor={getContentScoreLevelColor(current)}
      sx={{ width: computedWidth }}
    >
      <Typography
        fontSize="14px"
        fontWeight={700}
        align="center"
        sx={{ mr: '4px', color: 'inherit' }}
      >
        {current}
      </Typography>
      (
      <Typography
        fontSize="14px"
        fontWeight={700}
        align="center"
        sx={{ color: 'inherit' }}
      >
        {prev}
      </Typography>
      )
    </DataGridStatusCell>
  );
};

const renderStyledStatusCell = (params: GridRenderCellParams) => {
  const prev = params.formattedValue?.prev;
  const current = params.formattedValue?.current;
  const { computedWidth } = params.colDef;

  if (current === undefined && prev === undefined) {
    return <DataGridNoDataCell sx={{ width: computedWidth }} />;
  }

  if (params.rowNode.depth === 0 || params.rowNode.depth === 1) {
    return renderAggregationCell(params);
  }

  return (
    <DataGridStatusCell
      sx={{
        width: computedWidth,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      }}
      $statusColor={current === 1 ? 'passed' : 'failed'}
    >
      <Stack direction="row" my="0px" py="0px">
        <Box
          sx={{
            width: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <StatusIcon match={current} size="large" statusSize="small" />
        </Box>
        <Box>/</Box>
        <Box
          sx={{
            width: 30,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <StatusIcon match={prev} size="small" />
        </Box>
      </Stack>
    </DataGridStatusCell>
  );
};

type DataTableProps = {
  apiRef: ReturnType<typeof useGridApiRef>;
  rows: ContentCompassRow[];
  loading?: boolean;
};

export default function DataTable(props: DataTableProps) {
  const { apiRef, loading, rows } = props;
  const theme = useTheme();

  const columns: GridColDef<
    ContentCompassRow,
    {
      prev: number | undefined;
      current: number | undefined;
    }
  >[] = [
    {
      field: 'product',
      headerName: '',
      groupable: false,
      width: 300,
      headerAlign: 'center',
      hideSortIcons: true,
      disableReorder: true,
      sortable: false,
    },
    {
      field: 'brand',
      headerName: 'Brand',
      headerAlign: 'center',
    },
    {
      field: 'retailer',
      headerName: 'Retailer',
      headerAlign: 'center',
    },
    {
      field: 'contentScore',
      headerName: 'Content Score',
      minWidth: 100,
      headerAlign: 'center',
      valueGetter: (params) => {
        return {
          prev: params.row.contentScorePrev,
          current: params.row.contentScore,
        };
      },
      renderCell: loading ? renderSkeletonCell : renderAggregationCell,
    },
    {
      field: 'productListed',
      headerName: 'Product listed',
      flex: 1,
      minWidth: 100,
      headerAlign: 'center',
      valueGetter: (params) => {
        return {
          prev: params.row.productListedPrev,
          current: params.row.productListed,
        };
      },
      renderCell: loading ? renderSkeletonCell : renderStyledStatusCell,
    },
    {
      field: 'richContent',
      headerName: 'Rich content',
      flex: 1,
      minWidth: 100,
      headerAlign: 'center',
      valueGetter: (params) => {
        return {
          prev: params.row.richContentPrev,
          current: params.row.richContent,
        };
      },
      renderCell: loading ? renderSkeletonCell : renderStyledStatusCell,
    },
    {
      field: 'packshotMatch',
      headerName: 'Packshot match',
      flex: 1,
      minWidth: 100,
      headerAlign: 'center',
      valueGetter: (params) => {
        return {
          prev: params.row.packshotMatchPrev,
          current: params.row.packshotMatch,
        };
      },
      renderCell: loading ? renderSkeletonCell : renderStyledStatusCell,
    },
    {
      field: 'bulletpoints',
      headerName: 'Bulletpoints',
      flex: 1,
      minWidth: 100,
      headerAlign: 'center',
      valueGetter: (params) => {
        return {
          prev: params.row.bulletpointsPrev,
          current: params.row.bulletpoints,
        };
      },
      renderCell: loading ? renderSkeletonCell : renderStyledStatusCell,
    },
    {
      field: 'keywords',
      headerName: 'Keywords',
      flex: 1,
      minWidth: 100,
      headerAlign: 'center',
      valueGetter: (params) => {
        return {
          prev: params.row.keywordsPrev,
          current: params.row.keywords,
        };
      },
      renderCell: loading ? renderSkeletonCell : renderStyledStatusCell,
    },
    {
      field: 'images',
      headerName: 'Images',
      flex: 1,
      minWidth: 100,
      headerAlign: 'center',
      valueGetter: (params) => {
        return {
          prev: params.row.imagesPrev,
          current: params.row.images,
        };
      },
      renderCell: loading ? renderSkeletonCell : renderStyledStatusCell,
    },
    {
      field: 'video',
      headerName: 'Video',
      flex: 1,
      minWidth: 100,
      headerAlign: 'center',
      valueGetter: (params) => {
        return {
          prev: params.row.videoPrev,
          current: params.row.video,
        };
      },
      renderCell: loading ? renderSkeletonCell : renderStyledStatusCell,
    },
    {
      field: 'ratings',
      headerName: 'Ratings',
      flex: 1,
      minWidth: 100,
      headerAlign: 'center',
      valueGetter: (params) => {
        return {
          prev: params.row.ratingsPrev,
          current: params.row.ratings,
        };
      },
      renderCell: loading ? renderSkeletonCell : renderStyledStatusCell,
    },
    {
      field: 'reviews',
      headerName: 'Reviews',
      flex: 1,
      minWidth: 100,
      headerAlign: 'center',
      valueGetter: (params) => {
        return {
          prev: params.row.reviewsPrev,
          current: params.row.reviews,
        };
      },
      renderCell: loading ? renderSkeletonCell : renderStyledStatusCell,
    },
  ];

  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      columns: {
        columnVisibilityModel: {
          product: false,
        },
      },
      rowGrouping: {
        model: ['brand', 'retailer'],
      },
      aggregation: {
        model: {
          bulletpoints: 'bulletpoints',
          contentScore: 'contentScore',
          images: 'images',
          keywords: 'keywords',
          packshotMatch: 'packshotMatch',
          productListed: 'productListed',
          ratings: 'ratings',
          reviews: 'reviews',
          richContent: 'richContent',
          video: 'video',
        },
      },
      pinnedColumns: { left: [GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD] },
    },
    rowGroupingModel: ['brand', 'retailer'],
  });

  return (
    <div style={{ height: 'calc(100vh - 168px)', width: '100%' }}>
      <DataGridPremium
        columns={columns}
        rows={rows}
        apiRef={apiRef}
        aggregationFunctions={{
          ...GRID_AGGREGATION_FUNCTIONS,
          ...aggregations,
        }}
        disableRowSelectionOnClick
        disableColumnMenu
        getAggregationPosition={(groupNode: GridGroupNode) =>
          groupNode == null ? null : 'inline'
        }
        getRowClassName={(params: GridRowClassNameParams) => {
          return String(params.id).split('/').length === 2 ? `featuredRow` : '';
        }}
        getRowHeight={() => 'auto'}
        groupingColDef={{ leafField: 'product', hideDescendantCount: true }}
        hideFooter
        initialState={initialState}
        // eslint-disable-next-line no-constant-condition
        slots={false ? { toolbar: CustomToolbar } : {}}
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            whiteSpace: 'normal',
            lineHeight: 'normal',
            textAlign: 'center',
          },

          '& .MuiDataGrid-columnHeaders': {
            maxHeight: '168px !important',
            borderColor: 'transparent',
          },

          '& .MuiDataGrid-columnHeaderTitleContainerContent': {
            height: '100%',
            alignItems: 'flex-start',
            paddingTop: '16px',
          },

          '& .MuiDataGrid-aggregationColumnHeader': {
            flexDirection: 'row',
          },

          '& .MuiDataGrid-pinnedColumnHeaders--left': {
            borderTopLeftRadius: theme.shape.borderRadius * 2.5,
          },

          '& .MuiDataGrid-pinnedColumns--left': {
            borderBottomLeftRadius: theme.shape.borderRadius * 2.5,

            '.MuiDataGrid-cell': {
              '.MuiBox-root': {
                fontWeight: '500',
                fontSize: '12px',
                lineHeight: '14px',
              },

              '.MuiDataGrid-groupingCriteriaCell': {
                fontWeight: '800',
                fontSize: '14px',
                lineHeight: '17px',
              },
            },
          },
        }}
      />
    </div>
  );
}
