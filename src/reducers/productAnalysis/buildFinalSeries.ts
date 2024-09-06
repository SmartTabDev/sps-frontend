import getRandomColor from 'utils/colors/getRandomColor';
import getColor from 'utils/colors/getColor';
import { ResultSet } from '@cubejs-client/core';
import getCubeName from 'utils/getCubeName';
import uniq from 'lodash/uniq';

const buildRRPSeries = ({
  xAxisData,
  RRP,
}: {
  xAxisData: any[];
  RRP: number;
}) => ({
  name: 'RRP',
  type: 'line',
  data: xAxisData.map((_v, i) => ({
    value: RRP,
    symbol: i === 0 ? 'circle' : 'none',
    symbolSize: 0.1,
    hoverAnimation: false,
    itemStyle: {
      color: '#BDBDBD',
    },
    label:
        i === 0
          ? {
            show: true,
            position: 'top',
            align: 'left',
            formatter: '{a}',
            distance: 5,
            color: '#BDBDBD',
          }
          : {},
  })),
  symbol: 'none',
  lineStyle: {
    color: '#BDBDBD',
    type: 'dashed',
    width: 4,
  },
  z: 0,
} as any);

const buildSeries = (resultSet: ResultSet<any>) => {
  const Variants = getCubeName('Variants');
  const color: string[] = [];

  const rawData = resultSet.rawData();

  const dates = uniq(rawData.map((item) => item[`${Variants}.rundate`]));
  const retailers = uniq(
    rawData.map((item) => item[`${Variants}.retailername`]),
  );

  const filledDates = dates.map((date) => ({
    [date]: retailers.map((retailer) => ({
      retailer,
      price: (rawData.find(
        (item) => item[`${Variants}.rundate`] === date
            && item[`${Variants}.retailername`] === retailer,
      ) || {})[`${Variants}.price`],
    })),
  }));

  const flatData = filledDates.flatMap((data) => Object.values(data)).flatMap((x) => x);

  const series = retailers.map((retailer) => ({
    key: retailer,
    retailer,
    series: flatData
      .filter((item: any) => item.retailer === retailer)
      .map((item: any) => ({ value: item.price })),
  }));

  const xAxis = {
    type: 'category',
    data: dates,
  };

  const formatedSeries = series.map((single, index) => {
    const name = single.key;
    color.push(getColor(name!) || getRandomColor(index));

    return {
      name,
      type: 'line',
      step: 'end',
      data: single.series.map((s) => s.value),
      lineStyle: {
        width: 4,
      },
      symbolSize: 8,
      showAllSymbol: false,
      connectNulls: false,
      z: 2,
    };
  });

  return {
    xAxis,
    series: formatedSeries,
    color,
  };
};

const buildFinalSeries = (resultSet: any, rrp?: number) => {
  const { xAxis, series, color } = buildSeries(resultSet);

  const finalSeries = [...series];

  if (rrp) {
    finalSeries.push(buildRRPSeries({ xAxisData: xAxis.data, RRP: rrp }));
  }

  return {
    xAxis,
    series: finalSeries,
    legend: {
      data: series.map((single) => single.name),
    },
    colors: color.filter(Boolean),
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: false,
        },
        saveAsImage: {
          pixelRatio: 2,
        },
      },
    },
    grid: {
      bottom: 90,
    },
    dataZoom: [
      {
        type: 'inside',
      },
      {
        type: 'slider',
        left: '24px',
        right: '24px',
        showDetail: false,
      },
    ],
  };
};

export default buildFinalSeries;
