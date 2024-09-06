import { EChartsOption } from 'echarts';

export const getOption = (
  data: Array<number>,
  XAxisData: Array<any>,
): EChartsOption => ({
  tooltip: {
    trigger: 'axis',
  },
  grid: {
    left: '2%',
    right: '2%',
    bottom: '15%',
    containLabel: true,
  },
  xAxis: [
    {
      data: XAxisData,
      axisTick: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: '#cccccc',
        },
      },
      axisLabel: {
        fontWeight: 'bold',
        color: '#525F81',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      max: 25,
      interval: 5,
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontWeight: 'bold',
        color: '#525F81',
      },
      inverse: true,
      axisLine: {
        lineStyle: {
          color: '#cccccc',
        },
      },
    },
  ],
  series: [
    {
      name: 'Position',
      type: 'line',
      step: 'end',
      data,
      lineStyle: {
        width: 4,
      },
      symbolSize: 8,
      showAllSymbol: false,
      connectNulls: false,
      z: 2,
      markLine: {
        symbol: '',
        data: [
          {
            name: 'First Page',
            yAxis: 20,
          },
        ],
        lineStyle: {
          type: 'dashed',
          width: 3,
          color: '#BDBDBD',
        },
        label: {
          show: false,
        },
        silent: true,
      },
    },
  ],
  color: ['#286DCB'],
});
