import { EChartsOption } from 'echarts';

export const getOption = (
  data: Array<any>,
  XAxisData: Array<any>
): EChartsOption => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    icon: 'rect',
    bottom: '0%',
    itemWidth: 10,
    itemHeight: 10,
  },
  grid: {
    left: '2%',
    right: '2%',
    bottom: '12%',
    containLabel: true,
  },
  xAxis: [
    {
      nameTextStyle: {
        color: '#FFFFFF',
      },
      splitNumber: 1,
      axisTick: {
        show: false,
      },
      axisLabel: { fontSize: 9, interval: 0, color: '#000' },
      type: 'category',
      data: XAxisData,
    },
  ],
  yAxis: [
    {
      type: 'value',
      position: 'right',
      axisLabel: {
        show: false,
      },
    },
  ],
  series: data.map((seriesOf) => ({
    ...seriesOf,
    barWidth: 12,
    type: 'bar',
    stack: 'stack',
    emphasis: {
      focus: 'series',
    },
  })),
});
