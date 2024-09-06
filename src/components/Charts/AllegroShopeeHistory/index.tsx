import React from 'react';
import Box from '@mui/material/Box';
import ReactEcharts from 'libs/echarts-next';
import { getOption } from './getOption';
import LinearLoader from '../../LinearLoader';

type Props = {
  salesData?: Array<number>;
  pricesData?: Array<number>;
  xData?: Array<any>;
  isLoading?: boolean;
  offerId: string | null;
};

export const AllegroShopeeHistory: React.FC<Props> = ({
  salesData = [],
  pricesData = [],
  xData = [],
  isLoading = false,
  offerId,
}) => (
  <div key={offerId}>
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
          option={getOption(salesData, pricesData, xData)}
        />
      </>
    )}
  </div>
);
