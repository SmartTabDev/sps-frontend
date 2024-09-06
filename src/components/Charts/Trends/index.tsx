import React from 'react';
import Box from '@mui/material/Box';
import ReactEcharts from 'libs/echarts-next';
import LinearLoader from 'components/LinearLoader';
import { getOption } from './getOption';

type Props = {
  data?: Array<number>;
  XAxisData?: Array<any>;
  isLoading?: boolean;
};

export const Trends: React.FC<Props> = ({
  data = [],
  XAxisData = [],
  isLoading = false,
}) => (
  <div style={{ width: '100%' }}>
    {isLoading ? (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ height: '400px' }}
      >
        <LinearLoader width={300} />
      </Box>
    ) : (
      <>
        <ReactEcharts
          style={{ height: '400px' }}
          option={getOption(data, XAxisData)}
        />
      </>
    )}
  </div>
);
