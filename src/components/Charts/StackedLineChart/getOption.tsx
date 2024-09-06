import { SeriesOption, EChartsOption } from 'echarts';
import { ChartData } from 'pages/RSPIndex/types/Chart';
import { addTooltipShadow } from 'utils/charts/addTooltipShadow';
import getRandomColor from 'utils/colors/getRandomColor';

const createSeries = (data: ChartData[]): SeriesOption[] => {
  const series: SeriesOption[] = data.map((seriesOf, i) => {
    return {
      type: 'line',
      stack: '',
      itemStyle: {
        color: getRandomColor(i),
      },
      cursor: 'default',
      name: seriesOf.name,
      data: seriesOf.data.map((value) => ({
        value: value.value,
        min: value.min,
        max: value.max,
      })),
    };
  });

  return series.map(addTooltipShadow);
};

export const getOption = (
  data: ChartData[],
  xAxisData: string[]
): EChartsOption => {
  const legend = data.map((d) => d.name);

  const maximumValues: number[] = [];
  const minimumValues: number[] = [];

  data.forEach(({ data: values }) => {
    maximumValues.push(Math.max(...values.map((o) => o.value)));
    minimumValues.push(Math.min(...values.map((o) => o.value)));
  });

  const yAxisMax = Math.max(...maximumValues.map((value) => value)) + 5;
  const yAxisMin = Math.min(...minimumValues.map((value) => value)) - 5;

  return {
    tooltip: {
      trigger: 'item',
      formatter(params: any) {
        const { value: avg, data: obj, seriesName } = params;
        const { min, max } = obj;
        return `<span style="color: #525F81;"><span style="font-weight:bold">${seriesName}</span> <br/> Max: ${max}<br/> Min: ${min}<br/> Avg: ${avg}</span>`;
      },
    },
    legend: {
      data: legend,
      type: 'scroll',
      bottom: 0,
    },
    showLegendSymbol: false,
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      axisTick: {
        show: false,
      },
      axisPointer: {
        show: false,
      },
    },
    yAxis: {
      max: yAxisMax,
      min: yAxisMin,
      type: 'value',
      axisTick: {
        show: false,
      },
      axisLine: {
        show: true,
      },
    },
    series: createSeries(data),
  };
};
