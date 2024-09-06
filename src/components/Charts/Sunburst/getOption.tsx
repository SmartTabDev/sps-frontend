import { EChartsOption } from 'echarts';

export const getOption = (data: Array<any>): EChartsOption => ({
  series: {
    type: 'sunburst',
    data,
    radius: [60, '94%'],
    itemStyle: {
      borderRadius: 7,
      borderWidth: 2,
    },
    label: {
      overflow: 'truncate',
    },
    levels: [
      {},
      {
        label: {
          show: true,
        },
      },
      {
        label: {
          show: false,
        },
      },
      {
        label: {
          show: false,
        },
      },
    ],
  },
});
