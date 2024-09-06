import { EChartsOption } from 'echarts';

export const getOption = (
  salesData: Array<number>,
  pricesData: Array<number>,
  xData: Array<any>
): EChartsOption => {
  return {
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
        data: xData,
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
      },
    ],
    series: [
      {
        name: 'price',
        type: 'line',
        step: 'end',
        data: pricesData,
        lineStyle: {
          width: 3,
          color: '#27AE60',
        },
        symbolSize: 8,
        showAllSymbol: false,
        connectNulls: false,
        z: 2,
      },
      {
        name: 'sales',
        type: 'line',
        step: 'end',
        data: salesData,
        lineStyle: {
          width: 3,
          color: '#27AE60',
          type: 'dashed',
        },
        symbolSize: 8,
        showAllSymbol: false,
        connectNulls: false,
        z: 2,
      },
    ],
    color: ['#27AE60', '#27AE60'],
  };
};
