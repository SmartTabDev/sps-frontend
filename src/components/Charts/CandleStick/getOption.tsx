import { EChartsOption, SeriesOption } from 'echarts';
import { ChartData } from 'pages/RSPIndex/types/Chart';
import { addTooltipShadow } from 'utils/charts/addTooltipShadow';
import getRandomColor from 'utils/colors/getRandomColor';

type CandlestickData = [
  number, // min
  number, // max
  number, // open (same as min)
  number, // close (same as max)
  number // value
];

export const createSeries = (data: ChartData[]): SeriesOption[] => {
  const series: SeriesOption[] = data.map((item, i) => {
    const numEmptyArrays = i;
    const emptyArrays = Array(numEmptyArrays).fill([]);
    const candlestickData: CandlestickData = [
      item?.data[0]?.min || 0,
      item?.data[0]?.max || 0,
      item?.data[0]?.min || 0,
      item?.data[0]?.max || 0,
      item?.data[0]?.value || 0,
    ];

    const seriesData: SeriesOption = {
      silent: true,
      name: item?.name || '',
      type: 'candlestick',
      data: [...emptyArrays, candlestickData],
      barWidth: '20%',
      itemStyle: {
        color: getRandomColor(i),
        borderColor: undefined,
        borderColor0: undefined,
      },
    };

    return seriesData;
  });

  return series.map(addTooltipShadow);
};

export const getOption = (data: ChartData[]): EChartsOption => {
  const retailers = data.map((i) => i.name);

  const option: EChartsOption = {
    legend: {
      type: 'scroll',
      bottom: '0',
      selectedMode: false,
    },
    xAxis: {
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
        interval: 0,
      },
      data: retailers,
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        return (
          `<span style="color: #525F81;">` +
          `<span style="font-weight:bold">${params[0].seriesName}</span> <br/>` +
          `Max: ${params[0].value[2]}<br/>` +
          `Min: ${params[0].value[1]}<br/>` +
          `Avg: ${params[0].value[5].toFixed(0)}<br/>` +
          `</span>`
        );
      },
    },
    yAxis: {
      axisLine: {
        show: true,
      },
    },
    series: createSeries(data),
  };

  return option;
};
