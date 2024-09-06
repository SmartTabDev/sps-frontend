import React from 'react';
import ReactEcharts from 'libs/echarts-next';
import { ChartData } from 'pages/RSPIndex/types/Chart';
import { getOption } from './getOption';

type Props = {
  data?: ChartData[];
  xAxisData: string[];
  isLoading?: boolean;
};

export const StackedLineChart: React.FC<Props> = ({
  data = [],
  xAxisData = [],
  isLoading = false,
}) => (
  <>
    <ReactEcharts
      style={{ height: '420px' }}
      option={getOption(data, xAxisData)}
    />
    {/* <Legend /> */}
  </>
);
