import React from 'react';
import ReactEcharts from 'libs/echarts-next';
import Box from '@mui/material/Box';
import { getOption } from './getOption';
import { Legend } from './legend';
import LinearLoader from '../../LinearLoader';

type Props = {
  data?: Array<Array<number>>;
  XAxisData?: Array<any>;
  isLoading?: boolean;
};

export const RatingOverTime: React.FC<Props> = ({
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
        style={{ height: '334px' }}
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
