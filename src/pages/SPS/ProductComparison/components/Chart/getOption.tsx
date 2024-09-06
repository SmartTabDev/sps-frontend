import { EChartOption } from 'echarts';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import xAxisFormatter from 'pages/SPS/utils/chart/xAxisFormatter';
import optionDefaults from 'pages/SPS/utils/chart/optionDefaults';
import { OptionProps } from './types';

const productsTooltipFormatter = (
  params: EChartOption.Tooltip.Format | EChartOption.Tooltip.Format[],
): string => {
  const paramsArray = Array.isArray(params) ? params : [params];

  const result = sortBy(paramsArray, 'value')
    .map((item) => {
      const {
        name, seriesName, value, marker,
      } = item;

      return `${marker} ${seriesName} - ${name} - ${value || 'N/A'} <br/>`;
    })
    .reverse()
    .join('');

  return result;
};

const getOption = (isDaily: boolean) => ({
  xAxis,
  colors,
  series,
}: OptionProps & { isDaily: boolean }): EChartOption<EChartOption.SeriesLine> => (xAxis
  ? {
    ...optionDefaults,
    tooltip: {
      ...optionDefaults.tooltip,
      formatter: productsTooltipFormatter,
    },
    xAxis: {
      ...optionDefaults.xAxis,
      ...xAxis,
      axisLabel: {
        ...get(optionDefaults.xAxis, 'axisLabel', {}),
        formatter: xAxisFormatter(isDaily, (xAxis.data || []) as string[]),
      },
    },
    color: colors,
    series,
  }
  : {
    title: {
      text: 'Sorry there is not enough data to build chart.',
    },
  });

export default getOption;
