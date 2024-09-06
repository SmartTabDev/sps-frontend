import getCubeName from 'utils/getCubeName';
import { newCubejsApi } from 'api';
import getDimensionKeys from 'utils/cube/getDimensionKeys';
import getGroupedRatings from '../utils/getGroupedRatings';

export const getRatingsPerRetailer = async (
  accessToken: string,
  regionCode: string | undefined
) => {
  const Products = getCubeName('Products', 'kpi');

  const resultSet = await newCubejsApi(accessToken, regionCode).load({
    measures: [`${Products}.count`],
    timeDimensions: [
      {
        dimension: `${Products}.rundate`,
        dateRange: 'Today',
      },
    ],
    order: {
      [`${Products}.count`]: 'desc',
    },
    dimensions: [`${Products}.retailername`, `${Products}.roundrating`],
    filters: [
      {
        dimension: `${Products}.rating`,
        operator: 'gt',
        values: ['0'],
      },
    ],
  });

  const rawData = resultSet.rawData();
  const parsedData = rawData.map((data) => getDimensionKeys(data));

  const ratings = getGroupedRatings(parsedData, 'retailername');

  return ratings;
};
