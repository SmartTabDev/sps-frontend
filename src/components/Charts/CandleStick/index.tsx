import React from 'react';
import ReactEcharts from 'libs/echarts-next';
import { ChartData } from 'pages/RSPIndex/types/Chart';
import { getOption } from './getOption';

type Props = {
  data?: ChartData[];
  isLoading?: boolean;
};

export const CandleStickChart: React.FC<Props> = ({
  data = [],
  isLoading = false,
}) => <ReactEcharts style={{ height: '420px' }} option={getOption(data)} />;
