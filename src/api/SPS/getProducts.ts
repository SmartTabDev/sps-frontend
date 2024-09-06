import getRandomColor from 'utils/colors/getRandomColor';
import getCubeName from 'utils/getCubeName';
import { ResultSet } from '@cubejs-client/core';
import { LineStyles } from 'components/LegendLine';
import { Product } from 'types/Product';
import { newCubejsApi } from 'api';

const getIndex = (names: string[], name: string): number =>
  names.indexOf(String(name.trim()));

const getLineStyle = (names: string[], name: string) => {
  const index = getIndex(names, name);
  return LineStyles[index];
};

const getColor = (names: string[], name: string) => {
  const index = getIndex(names, name);
  return getRandomColor(index);
};

const buildSeries = (
  resultSet: ResultSet<Product>,
  productNames: string[],
  retailerNames: string[]
) => {
  const Variants = getCubeName('Variants');
  const color: string[] = [];

  const series = resultSet.series({
    x: [`${Variants}.rundate`],
    y: [
      `${Variants}.retailername`,
      `${Variants}.productname`,
      `${Variants}.minPrice`,
    ],
  });

  const xAxis = {
    type: 'category',
    data: series[0]!.series.map((s) => s.x),
  };

  const formatedSeries = series.map((item) => {
    const keys = item.key.split(',');
    const retailerName = keys[0];
    const productName = keys[1];
    const currentColor = getColor(retailerNames, retailerName as string);

    if (!color.includes(currentColor)) {
      color.push(currentColor);
    }

    return {
      name: retailerName,
      type: 'line',
      step: 'end',
      data: item.series.map((s) => ({
        name: productName,
        value: s.value,
      })),
      lineStyle: {
        width: 4,
        type: getLineStyle(productNames, productName as string),
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

export const getProducts = async (
  accessToken: string,
  regionCode: string | undefined,
  dateRange: [string, string],
  productNames: string[],
  retailerNames: string[]
): Promise<any> => {
  const Variants = getCubeName('Variants');

  const resultSet = await newCubejsApi(accessToken, regionCode).load({
    dimensions: [
      `${Variants}.productname`,
      `${Variants}.retailername`,
      `${Variants}.rundate`,
    ],
    filters: [
      {
        dimension: `${Variants}.productname`,
        operator: 'equals',
        values: productNames,
      },
      {
        dimension: `${Variants}.retailername`,
        operator: 'equals',
        values: retailerNames,
      },
    ],
    order: {
      [`${Variants}.rundate`]: 'asc',
      [`${Variants}.retailername`]: 'asc',
      [`${Variants}.productname`]: 'asc',
    },
    measures: [`${Variants}.minPrice`],
    timeDimensions: [
      {
        dimension: `${Variants}.rundate`,
        dateRange,
      },
    ],
  });

  const { xAxis, series, color } = buildSeries(
    resultSet as ResultSet<Product>,
    productNames,
    retailerNames
  );

  return {
    xAxis,
    series,
    legend: {
      data: series.map((single) => single.name),
    },
    colors: color.filter(Boolean),
  };
};
