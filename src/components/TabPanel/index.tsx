import React from 'react';
import { Box } from '@mui/material';

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;
  if (value !== index) {
    return null;
  }
  return (
    <Box
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </Box>
  );
};
