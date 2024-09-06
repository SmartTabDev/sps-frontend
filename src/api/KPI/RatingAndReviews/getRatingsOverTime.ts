import getCubeName from 'utils/getCubeName';
import { newCubejsApi } from 'api';
import moment from 'moment';
import getDimensionKeys from 'utils/cube/getDimensionKeys';
import getGroupedRatings from '../utils/getGroupedRatings';

export const getRatingsOverTime = async (
  accessToken: string,
  regionCode: string | undefined
) => {
  const Products = getCubeName('Products', 'kpi');

  const resultSet = await newCubejsApi(accessToken, regionCode).load({
    measures: [`${Products}.count`],
    timeDimensions: [
      {
        dimension: `${Products}.rundate`,
        granularity: 'day',
        dateRange: 'from 7 days ago to now',
      },
    ],
    order: { [`${Products}.rundate`]: 'asc' },
    dimensions: [`${Products}.roundrating`],
    filters: [
      {
        dimension: `${Products}.roundrating`,
        operator: 'gt',
        values: ['0'],
      },
    ],
  });

  const rawData = resultSet.rawData();
  const parsedData = rawData.map((data) => getDimensionKeys(data));

  const ratings = getGroupedRatings(parsedData, 'rundate', (key) =>
    moment(key).format('MMM DD')
  );

  return ratings;
};
