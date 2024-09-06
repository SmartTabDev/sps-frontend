import { EChartsOption } from 'echarts';

export const getOption = (
  data: Array<number>,
  XAxisData: Array<any>
): EChartsOption => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  legend: {
    data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'],
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
      axisTick: {
        show: false,
      },
      type: 'category',
      boundaryGap: false,
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
      axisLabel: {
        show: false,
      },
      type: 'value',
    },
  ],
  series: [
    {
      name: 'Line 1',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        color: '#5ACF8B',
      },
      emphasis: {
        focus: 'series',
      },
      data: [
        140, 232, 101, 264, 90, 340, 250, 140, 232, 101, 264, 90, 340, 250, 140,
        232, 101, 264, 90, 340, 250, 333, 121,
      ],
    },
    {
      name: 'Line 2',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        color: '#5793E6',
      },
      emphasis: {
        focus: 'series',
      },
      data: [
        120, 282, 111, 234, 220, 340, 310, 120, 282, 111, 234, 220, 340, 310,
        120, 282, 111, 234, 220, 340, 310, 243, 123,
      ],
    },
    {
      name: 'Line 3',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        color: '#7DD2EE',
      },
      emphasis: {
        focus: 'series',
      },
      data: [
        320, 132, 201, 334, 190, 130, 220, 320, 132, 201, 334, 190, 130, 220,
        320, 132, 201, 334, 190, 130, 220, 333, 271,
      ],
    },
    {
      name: 'Line 4',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        color: '#F1D379',
      },
      emphasis: {
        focus: 'series',
      },
      data: [
        220, 402, 231, 134, 190, 230, 120, 220, 402, 231, 134, 190, 230, 120,
        220, 402, 231, 134, 190, 230, 120, 432, 243,
      ],
    },
    {
      name: 'Line 5',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      label: {
        show: true,
        position: 'top',
      },
      areaStyle: {
        color: '#D68DF1',
      },
      emphasis: {
        focus: 'series',
      },
      data: [
        220, 302, 181, 234, 210, 290, 150, 220, 302, 181, 234, 210, 290, 150,
        220, 302, 181, 234, 210, 290, 150, 253, 321,
      ],
    },
  ],
});
