import React from 'react';
import { DataGrid, DataGridProps } from '@mui/x-data-grid';
import { styled } from '@mui/system';

const StyledDataGrid = styled(DataGrid)({
  '& .expired, & .expired span': {
    color: 'rgba(82, 95, 129, 0.5) !important',
  },
});

type Props = {
  rows: DataGridProps['rows'];
  columns: DataGridProps['columns'];
  height?: number;
} & Omit<Partial<DataGridProps>, 'sx'>;

const BaseDataGrid: React.FC<Props> = ({ rows, columns, height, ...props }) => {
  const currentHeight = height ? `${height}vh` : '50vh';

  return (
    <div style={{ height: currentHeight, width: '100%' }}>
      <StyledDataGrid
        rows={rows}
        columns={columns}
        disableColumnMenu
        hideFooterSelectedRowCount
        {...props}
      />
    </div>
  );
};

export default BaseDataGrid;
