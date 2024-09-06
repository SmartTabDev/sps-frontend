import React from 'react';
import {
  DataGridProps,
  GridActionsCellItem,
  GridRenderCellParams,
  GridRowParams,
  GridSortDirection,
  GridSortModel,
} from '@mui/x-data-grid';
import Status, { StatusType } from 'components/Chips/Status';
import BaseDataGrid from 'pages/Notifications/components/BaseDataGrid/BaseDataGrid';
import { useHistory } from 'react-router';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';

type Props = {
  rows: DataGridProps['rows'];
  handleRemove: (id: number) => void;
  isLoading?: boolean;
};

const colorizeEmptyCount = (params: GridRenderCellParams) => {
  // style={params.value === 0 ? { color: 'rgb(59, 69, 94,.75)' } : {}}
  const { field, value } = params;

  const isEmpty = value === 0 || value === '-';

  const emptyChar = field === 'endDate' ? 'Never' : '-';

  return <span>{isEmpty ? emptyChar : value}</span>;
};

const NotificationsListTable: React.FC<Props> = ({
  rows,
  handleRemove,
  isLoading = false,
}) => {
  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: 'id',
      sort: 'asc' as GridSortDirection,
    },
  ]);

  const history = useHistory();

  const columns: DataGridProps['columns'] = React.useMemo(
    () => [
      {
        field: 'id',
        type: 'string',
        hide: true,
      },
      {
        field: 'name',
        headerName: 'Name',
        type: 'string',
        width: 200,
      },
      {
        field: 'description',
        headerName: 'Description',
        type: 'string',
        minWidth: 200,
        flex: 0.3,
      },
      {
        field: 'productsCount',
        headerName: 'Products',
        type: 'number',
        minWidth: 120,
        align: 'center',
        headerAlign: 'center',
        renderCell: colorizeEmptyCount,
      },
      {
        field: 'recipientsCount',
        headerName: 'Recipients',
        type: 'number',
        minWidth: 120,
        align: 'center',
        headerAlign: 'center',
        renderCell: colorizeEmptyCount,
      },
      {
        field: 'createDate',
        headerName: 'Starts',
        type: 'string',
        align: 'center',
        headerAlign: 'center',
        minWidth: 110,
      },
      {
        field: 'endDate',
        headerName: 'Ends',
        type: 'string',
        align: 'center',
        headerAlign: 'center',
        minWidth: 110,
        renderCell: colorizeEmptyCount,
      },
      {
        field: 'status',
        headerName: 'Status',
        type: 'singleSelect',
        valueOptions: ['active', 'inactive', 'expired'],
        width: 140,
        align: 'center',
        headerAlign: 'center',
        renderCell: (params: GridRenderCellParams) => (
          <Status type={params.value as StatusType} />
        ),
      },
      {
        field: 'actions',
        type: 'actions',
        width: 50,
        getActions: (params) => [
          <GridActionsCellItem
            label="Edit"
            showInMenu
            key="1"
            onClick={() =>
              history.push(`/price-analysis/alerts/edit/${params.id}`)
            }
          />,
          <GridActionsCellItem
            label="Remove"
            onClick={() => handleRemove(Number(params.id))}
            showInMenu
            key="2"
          />,
        ],
      },
    ],
    [handleRemove, history]
  );

  return (
    <BaseDataGrid
      rows={rows}
      columns={columns}
      getRowClassName={(params: GridRowParams) => `${params.row.status}`}
      disableRowSelectionOnClick
      height={80}
      loading={isLoading}
      onCellClick={({ field }, event) => {
        if (field === 'actions') {
          event.stopPropagation();
        }
      }}
      sortModel={sortModel}
      onSortModelChange={(model) => setSortModel(model)}
      hideFooter
      components={{
        NoRowsOverlay: () => (
          <Stack height="100%" alignItems="center" justifyContent="center">
            <Typography sx={{ color: '#3B455E' }}>
              Ready, set, alert! Create your first one.
            </Typography>
          </Stack>
        ),
      }}
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

export default NotificationsListTable;
