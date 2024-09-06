import React from 'react';
import { TableCell, TableRow } from '@mui/material';
import NoData from 'components/NoData';

type NoDataRowProps = {
  colSpan: number;
};

export const NoDataRow: React.FC<NoDataRowProps> = ({ colSpan }) => {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        style={{
          textAlign: 'center',
          height: 300,
          border: 'none',
        }}
      >
        <NoData show showImage />
      </TableCell>
    </TableRow>
  );
};
