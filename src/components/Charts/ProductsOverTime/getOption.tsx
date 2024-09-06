import { EChartsOption } from 'echarts';
import { TotalsOverTime } from 'reducers/productAvailability';

const getOption = (data: TotalsOverTime): EChartsOption => ({
  textStyle: {
    fontSize: 10,
    color: '#525F81',
    fontFamily: 'Lato, sans-serif',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985',
      },
    },
  },
  grid: {
    left: '20px',
    right: '40px',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: data.dates,
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontWeight: 'bold',
        align: 'right',
      },
      axisLine: {
        lineStyle: {
          color: '#828282',
        },
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontWeight: 'bold',
      },
      axisLine: {
        lineStyle: {
          color: '#828282',
        },
      },
    },
  ],
  color: ['#286DCB', '#4BD9EC', '#828282'],
  legend: {
    right: '5%',
    icon: 'square',
    itemWidth: 10,
    itemHeight: 10,
    data: ['In stock', 'Out of stock', 'Void'],
    textStyle: {
      fontSize: 10,
      padding: [0, 0, 0, 5],
      color: '#525F81',
    },
  },
  series: [
    {
      name: 'In stock',
      type: 'line',
      stack: 'total',
      areaStyle: {},
      data: data.inStock,
    },
    {
      name: 'Out of stock',
      type: 'line',
      stack: 'total',
      areaStyle: {},
      data: data.outOfStock,
    },
    {
      name: 'Void',
      type: 'line',
      stack: 'total',
      areaStyle: {},
      data: data.void,
    },
  ],
});

export default getOption;
