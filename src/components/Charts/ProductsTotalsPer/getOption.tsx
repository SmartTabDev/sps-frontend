import { EChartsOption } from 'echarts';
import { TotalsPer } from 'reducers/productAvailability';

const getOption = (data: TotalsPer): EChartsOption => ({
  textStyle: {
    fontSize: 10,
    color: '#525F81',
    fontFamily: 'Lato, sans-serif',
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: '0%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: {
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
  yAxis: {
    type: 'category',
    data: data.names,
    axisTick: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: '#828282',
      },
    },
  },
  color: ['#828282', '#4BD9EC', '#286DCB'],
  legend: {
    right: '4%',
    icon: 'square',
    itemWidth: 10,
    itemHeight: 10,
    data: ['In stock', 'Out of stock', 'Void'],
    textStyle: {
      fontFamily: 'Lato, sans-serif',
      fontSize: 10,
      padding: [0, 0, 0, 5],
      color: '#525F81',
    },
  },
  series: [
    {
      name: 'Void',
      type: 'bar',
      stack: 'avaliability',
      label: {
        show: false,
      },
      barWidth: 6,
      data: data.void,

    },
    {
      name: 'Out of stock',
      type: 'bar',
      stack: 'avaliability',
      label: {
        show: false,
        position: 'insideRight',
      },
      barWidth: 6,
      data: data.outOfStock,

    },
    {
      name: 'In stock',
      type: 'bar',
      stack: 'avaliability',
      label: {
        show: false,
        position: 'insideRight',
      },
      barWidth: 6,
      data: data.inStock,
    },
  ],
});

export default getOption;
