import React from 'react';
import Box from '@mui/material/Box';
import ReactEcharts from 'libs/echarts-next';
import LinearLoader from 'components/LinearLoader';
import {
  AdditionalOptions,
  getRadarChart,
  OptionIndicator,
  OptionItem,
} from './getRadarChart';

type Props = {
  indicator: OptionIndicator[];
  items?: OptionItem[];
  isLoading?: boolean;
  loadingText?: string;
  loaderWidth?: string | number;
  height?: string | number;
  additionalOptions?: AdditionalOptions;
};

export const RadarChart: React.FC<Props> = ({
  items = [],
  isLoading = false,
  loadingText,
  loaderWidth,
  indicator,
  additionalOptions,
  height = '700px',
}) => (
  <div style={{ width: '100%', height }}>
    {isLoading ? (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        style={{ height }}
      >
        <LinearLoader width={loaderWidth} text={loadingText} />
      </Box>
    ) : (
      <>
        <ReactEcharts
          style={{ height }}
          option={getRadarChart(items, indicator, additionalOptions)}
        />
      </>
    )}
  </div>
);
