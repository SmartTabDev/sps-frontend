import React from 'react';
import Box from '@mui/material/Box';
import ReactEcharts from 'libs/echarts-next';
import { getOption } from './getOption';
import { Legend } from './legend';
import LinearLoader from '../../LinearLoader';

type Props = {
  data?: Array<number>;
  XAxisData?: Array<any>;
  isLoading?: boolean;
};

export const KeywordHistory: React.FC<Props> = ({
  data = [],
  XAxisData = [],
  isLoading = false,
}) => (
  <div>
    {isLoading ? (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ height: '300px' }}
      >
        <LinearLoader width={300} />
      </Box>
    ) : (
      <>
        <ReactEcharts
          style={{ height: '300px' }}
          option={getOption(data, XAxisData)}
        />
        <Legend />
      </>
    )}
  </div>
);
