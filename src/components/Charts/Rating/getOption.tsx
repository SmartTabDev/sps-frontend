import { EChartsOption } from 'echarts';

// calculating rating for each X series
const calculateRatings = (data: Array<Array<number>>): Array<number> => {
  if (!data.length) {
    return [];
  }

  const arrayColumnSum = new Array(data[0]!.length).fill(0);
  const arithmeticAverage = new Array(data[0]!.length).fill(0);

  data.forEach((rowArray, row) => {
    rowArray.forEach((number, column) => {
      arrayColumnSum[column] += number;
      arithmeticAverage[column] += number * (row + 1);
    });
  });

  return arithmeticAverage.map((average, index) => {
    const result = average / arrayColumnSum[index];
    return Math.round(result * 100) / 100;
  });
};

const buildSeries = (data: Array<Array<number>>): Array<object> => {
  const series: Array<object> = [];

  data.forEach((ratingsNumberSeries) => {
    series.push({
      type: 'bar',
      barWidth: 10,
      stack: 'daily',
      data: ratingsNumberSeries,
    });
  });

  series.push({
    type: 'line',
    yAxisIndex: 1,
    data: calculateRatings(data),
    lineStyle: {
      color: '#BDBDBD',
      width: 2,
    },
    itemStyle: {
      color: '#BDBDBD',
    },
  });

  return [...series];
};

// calculating to have a round number which is dividing by 5
const calculateMaxYAxis = (data: Array<Array<number>>) => {
  if (!data.length) {
    return 0;
  }

  const arrayColumnSum = new Array(data[0]!.length).fill(0);
  data.forEach((rowArray) => {
    rowArray.forEach((number, column) => {
      arrayColumnSum[column] += number;
    });
  });

  return Math.ceil(Math.max(...arrayColumnSum) / 10) * 10;
};

export const getOption = (
  data: Array<Array<number>>,
  XAxisData: Array<any>,
): EChartsOption => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
    formatter: (params: any) => {
      const tooltipItems = Array.isArray(params) ? params : [params];
      return tooltipItems
        .reverse()
        .map((p) => `${p.marker} ${p.data} <br/>`)
        .join('');
    },
  },
  color: ['#EB5757', '#F2994A', '#F2C94C', '#4BD9EC', '#286DCB'],
  grid: {
    show: true,
    left: '20px',
    right: '30px',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: XAxisData,
      axisLabel: {
        rotate: XAxisData.length > 10 ? 45 : 0,
      },
      axisTick: {
        lineStyle: {
          width: 0,
        },
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      interval: calculateMaxYAxis(data) / 5,
      max: calculateMaxYAxis(data),
    },
    {
      type: 'value',
      min: 0,
      max: 5,
      interval: 1,
    },
  ],
  series: buildSeries(data),
});
