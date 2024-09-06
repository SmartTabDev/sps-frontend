import getCubeName from 'utils/getCubeName';
import _ from 'lodash';
import moment from 'moment';
import { Totals } from 'reducers/productAvailability';
import { newCubejsApi } from 'api';
import getDimensionKeys from 'utils/cube/getDimensionKeys';
import getAvailability from '../utils/getAvailability';

export const getTotalProductsOverTime = async (
  accessToken: string,
  regionCode: string | undefined
) => {
  const Products = getCubeName('Products', 'kpi');

  const resultSet = await newCubejsApi(accessToken, regionCode).load({
    dimensions: [`${Products}.available`, `${Products}.ispageavailable`],
    measures: [`${Products}.count`],
    timeDimensions: [
      {
        dimension: `${Products}.rundate`,
        dateRange: 'from 30 days ago to now',
        granularity: 'day',
      },
    ],
  });

  const rawData = resultSet.rawData();
  const parsedData = rawData.map((data) => getDimensionKeys(data));
  const groupedData = _.groupBy(parsedData, 'rundate');

  const availability = Object.entries(groupedData).map(
    ([date, availability2]) => ({
      [moment(date).format('MMM DD')]: getAvailability(availability2),
    })
  );

  const values = availability.map(
    (value: any): Totals => Object.values(value)[0] as Totals
  );

  const keys = availability.map(
    (value: any): string => Object.keys(value)[0] as string
  );

  const result = {
    dates: keys,
    inStock: values.map((val) => val.inStock),
    outOfStock: values.map((val) => val.outOfStock),
    void: values.map((val) => val.void),
  };

  return result;
};
