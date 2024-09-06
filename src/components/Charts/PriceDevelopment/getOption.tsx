import { EChartsOption } from 'echarts';

export const getOption = (
  data: Array<any>,
  XAxisData: Array<any>
): EChartsOption => ({
  textStyle: {
    fontFamily: 'Lato, sans-serif',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    icon: 'rect',
    bottom: '0%',
    itemWidth: 10,
    itemHeight: 10,
  },
  grid: {
    left: '3%',
    right: '3%',
    bottom: '12%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    axisTick: {
      show: false,
    },
    boundaryGap: false,
    data: XAxisData,
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      show: true,
    },
  },
  series: data.map((seriesOf) => ({
    ...seriesOf,
    showSymbol: false,
    type: 'line',
  })),
});
