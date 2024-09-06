import getCubeName from 'utils/getCubeName';
import { newCubejsApi } from 'api';
import _ from 'lodash';
import { Dimension, Totals } from 'reducers/productAvailability';
import getDimensionKeys from 'utils/cube/getDimensionKeys';
import getAvailability from '../utils/getAvailability';

export const getTotalProductsPerDimension = async (
  accessToken: string,
  regionCode: string | undefined,
  dimension: Dimension
) => {
  const Products = getCubeName('Products', 'kpi');

  const resultSet = await newCubejsApi(accessToken, regionCode).load({
    dimensions: [
      `${Products}.${dimension}`,
      `${Products}.available`,
      `${Products}.ispageavailable`,
    ],
    measures: [`${Products}.count`],
    timeDimensions: [
      {
        dimension: `${Products}.rundate`,
        dateRange: 'Today',
        granularity: 'day',
      },
    ],
  });

  const rawData = resultSet.rawData();
  const parsedData = rawData.map((data) => getDimensionKeys(data));
  const groupedData = _.groupBy(parsedData, dimension);

  const availability = Object.entries(groupedData).map(
    ([dimensionValue, availability2]) => ({
      [dimensionValue]: getAvailability(availability2),
    })
  );

  const values = availability.map(
    (value: any): Totals => Object.values(value)[0] as Totals
  );

  const keys = availability.map(
    (value: any): string => Object.keys(value)[0] as string
  );

  const result = {
    names: keys,
    inStock: values.map((val) => val.inStock),
    outOfStock: values.map((val) => val.outOfStock),
    void: values.map((val) => val.void),
  };

  return result;
};
