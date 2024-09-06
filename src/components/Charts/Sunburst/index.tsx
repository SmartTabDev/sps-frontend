import React from 'react';
import ReactEcharts from 'libs/echarts-next';
import { Box } from '@mui/system';
import { getOption } from './getOption';

type Props = {
  data?: Array<number>;
};

export const SunburstChart: React.FC<Props> = ({ data = [] }) => (
  <Box
    sx={{
      width: '100%',
    }}
  >
    <ReactEcharts style={{ height: '700px' }} option={getOption(data)} />
  </Box>
);
