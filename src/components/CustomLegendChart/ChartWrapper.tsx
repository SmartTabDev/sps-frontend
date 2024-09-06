import React from 'react';
import ReactEcharts from 'libs/echarts-next';
import { FullWidthLinearLoader } from 'components/LinearLoader';
import { EChartsOption } from 'echarts';

type Props = {
  isLoading: boolean;
  data: any[];
  getOption: (data: any) => EChartsOption;
  renderLegend?: (echarts?: echarts.ECharts) => JSX.Element;
  Title?: React.ComponentType<any>;
  legendOrder?: string | number;
};
const ChartWrapper: React.FC<Props> = ({
  isLoading,
  data,
  getOption,
  renderLegend,
  legendOrder,
  Title,
}) => (isLoading === false ? (
  <ReactEcharts
    option={getOption(data)}
    renderLegend={renderLegend}
    Title={Title}
    legendOrder={legendOrder}
  />
) : (
  <FullWidthLinearLoader width={300} text="Building your chart" />
));

export default ChartWrapper;
