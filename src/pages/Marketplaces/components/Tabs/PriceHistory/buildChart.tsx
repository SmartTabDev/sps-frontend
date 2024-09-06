import getRandomColor from 'utils/colors/getRandomColor';
import getColor from 'utils/colors/getColor';
import { Series } from '@cubejs-client/core';
import optionDefaults from 'pages/SPS/utils/chart/optionDefaults';
import xAxisFormatter from 'pages/SPS/utils/chart/xAxisFormatter';
import get from 'lodash/get';
import { getRetailerName } from 'pages/Marketplaces/utils/getRetailerName';

const buildChart = (
  data: Series<{
    x: string;
    category: string;
    value: number;
  }>[]
): any => {
  const [xAxisData] = data || [];

  if (data === undefined || !data.length || !xAxisData) {
    return {};
  }

  const color: string[] = [];

  const xAxis = {
    data: xAxisData.series.map((s) => s.x || ''),
  };

  const formatedSeries = data.map((single, index) => {
    const splittedKeys = single.key.split(',');
    const retailerName = getRetailerName(splittedKeys[0] || '');
    const name = [retailerName, splittedKeys[1]].join(',') || '';
    color.push(getColor(retailerName!) || getRandomColor(index));

    return {
      name,
      type: 'line',
      step: 'end',
      data: single.series.map((s) => ({
        name,
        value: s.value !== 0 ? s.value : null,
      })),
      lineStyle: {
        width: 4,
      },
      showSymbol: false,
      connectNulls: false,
      z: 2,
    };
  });

  return {
    ...optionDefaults,
    color,
    xAxis: {
      ...optionDefaults.xAxis,
      ...xAxis,
      type: 'category',
      axisLabel: {
        ...get(optionDefaults.xAxis, 'axisLabel', {}),
        formatter: xAxisFormatter(true, xAxis.data),
      },
    },
    series: formatedSeries,
    grid: {
      left: '5%',
      bottom: '20%',
      right: '200px',
    },
    tooltip: {
      ...optionDefaults.tooltip,
      className:
        formatedSeries.length >= 10 ? 'scrollable-echarts-tooltip' : '',
      enterable: formatedSeries.length >= 10,
      showDelay: 0,
      extraCssText: 'z-index: 9999;',
      position: (a: any, b: any) => {
        return ['70px', b.length >= 10 ? '-60%' : '-30%'];
      },
      appendToBody: true,
    },
    legend: {
      show: true,
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
      data: formatedSeries.map(({ name }) => ({ name })),
      pageIconInactiveColor: '#E0E0E0',
      pageIconColor: '#2F80ED',
      textStyle: {
        fontSize: 12,
      },
      formatter: (name: any) => getRetailerName(name.split(',')[0] || ''),
    },
  };
};

export default buildChart;
