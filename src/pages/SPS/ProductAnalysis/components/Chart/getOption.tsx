import { EChartOption } from 'echarts';
import xAxisFormatter from 'pages/SPS/utils/chart/xAxisFormatter';
import optionDefaults from 'pages/SPS/utils/chart/optionDefaults';
import get from 'lodash/get';
import { OptionProps } from './types';

const getOption = (isDaily: boolean) => ({
  legend,
  xAxis,
  colors,
  series,
  yAxis,
  tooltip,
  grid,
  dataZoom,
}: OptionProps & {
  isDaily: boolean;
}): EChartOption<EChartOption.SeriesLine> => ({
  ...optionDefaults,
  legend,
  xAxis: {
    ...optionDefaults.xAxis,
    ...xAxis,
    axisLabel: {
      ...get(optionDefaults.xAxis, 'axisLabel', {}),
      formatter: xAxisFormatter(isDaily, (xAxis?.data || []) as string[]),
    },
  },
  yAxis: {
    ...optionDefaults.yAxis,
    ...yAxis,
  },
  color: colors,
  series,
  tooltip: {
    ...optionDefaults.tooltip,
    ...tooltip,
  },
  grid: {
    ...optionDefaults.grid,
    ...grid,
  },
  ...(dataZoom ? { dataZoom } : {}) as any,
});

export default getOption;
