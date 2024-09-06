import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { useTheme } from '@mui/material/styles';

interface LevelRowProps {
  color: string;
}

const LevelRow: FC<LevelRowProps> = ({ color, children }) => {
  const { palette } = useTheme();
  return (
    <TableRow>
      <TableCell align="center" sx={{ borderBottom: 'none' }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box bgcolor={color} width="15px" height="15px" />
        </Box>
      </TableCell>
      <TableCell align="left" sx={{ borderBottom: 'none' }}>
        <Typography
          lineHeight={1}
          align="left"
          fontWeight={500}
          fontSize="14px"
          color={palette.blueGrey[400]}
        >
          {children}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default LevelRow;
