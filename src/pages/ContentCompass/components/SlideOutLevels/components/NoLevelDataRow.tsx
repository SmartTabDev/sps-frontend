import { Typography } from '@mui/material';
import React from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useTheme } from '@mui/material/styles';

const NoLevelDataRow = () => {
  const { palette } = useTheme();
  return (
    <TableRow>
      <TableCell
        align="center"
        sx={{ verticalAlign: 'top', borderBottom: 'none' }}
      >
        <Typography lineHeight={1} fontWeight={500} fontSize="12px" noWrap>
          no data
        </Typography>
      </TableCell>
      <TableCell
        align="left"
        style={{ verticalAlign: 'top', borderBottom: 'none' }}
      >
        <Typography
          lineHeight={1}
          align="left"
          fontWeight={500}
          fontSize="12px"
          color={palette.blueGrey[400]}
        >
          data needs to be provided in the configuration
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default NoLevelDataRow;
