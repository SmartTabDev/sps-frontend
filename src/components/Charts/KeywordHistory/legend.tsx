import React from 'react';
import Box from '@mui/material/Box';
import LegendLine from 'components/LegendLine';

export const Legend: React.FC = () => (
  <Box display="flex" flexWrap="wrap" ml={6} mt={2}>
    <Box marginRight={4} display="flex" alignItems="center">
      <LegendLine $color="#BDBDBD" $type="dashed" /> Top 20
    </Box>
    <Box marginRight={4} display="flex" alignItems="center">
      <LegendLine $color="#286DCB" /> Position
    </Box>
  </Box>
);
