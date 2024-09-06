import { EChartsOption } from 'echarts';

export const getOption = (
  data: Array<number>,
  XAxisData: Array<any>
): EChartsOption => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  legend: {
    show: false,
  },
  grid: {
    left: '2%',
    right: '2%',
    bottom: '2%',
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
      data: [
        '05/11/22',
        '06/11/22',
        '07/11/22',
        '08/11/22',
        '09/11/22',
        '10/11/22',
        '11/11/22',
        '12/11/22',
        '13/11/22',
        '14/11/22',
        '15/11/22',
        '16/11/22',
        '17/11/22',
        '18/11/22',
        '19/11/22',
        '20/11/22',
        '21/11/22',
        '22/11/22',
        '23/11/22',
        '24/11/22',
        '25/11/22',
        '26/11/22',
        '27/11/22',
      ],
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
  series: [
    {
      color: '#27AE60',
      barWidth: 20,
      name: 'Email',
      type: 'bar',
      stack: 'Ad',
      emphasis: {
        focus: 'series',
      },
      data: [
        120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120,
        132, 101, 134, 90, 230, 210, 230, 210,
      ],
    },
  ],
});
