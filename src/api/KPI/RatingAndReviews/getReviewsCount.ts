import getCubeName from 'utils/getCubeName';
import { newCubejsApi } from 'api';
import getDimensionKeys from 'utils/cube/getDimensionKeys';

export const getReviewsCount = async (
  accessToken: string,
  regionCode: string | undefined
) => {
  const Products = getCubeName('Products', 'kpi');

  const resultSet = await newCubejsApi(accessToken, regionCode).load({
    measures: [`${Products}.reviewCountGroup`],
    timeDimensions: [
      {
        dimension: `${Products}.rundate`,
        granularity: 'day',
        dateRange: 'from 1 days ago to now',
      },
    ],
    order: { [`${Products}.rundate`]: 'asc' },
    filters: [
      {
        dimension: `${Products}.reviewcount`,
        operator: 'gt',
        values: ['0'],
      },
    ],
  });

  const rawData = resultSet.rawData();
  const parsedData = rawData.map((data) => getDimensionKeys(data));

  const ratingReviewsCount = {
    prev: parsedData[0]?.reviewCountGroup || 0,
    current: parsedData[1]?.reviewCountGroup || 0,
  };

  return ratingReviewsCount;
};
