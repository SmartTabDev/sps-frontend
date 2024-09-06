import getCubeName from 'utils/getCubeName';
import { newCubejsApi } from 'api';
import getDimensionKeys from 'utils/cube/getDimensionKeys';

export const fetchRatingsDetails = async (
  accessToken: string,
  regionCode: string | undefined,
  filter: string | undefined,
  dateRange = 'Today'
): Promise<any[]> => {
  const Products = getCubeName('Products', 'kpi');

  const resultSet = await newCubejsApi(accessToken, regionCode).load({
    dimensions: [
      `${Products}.productid`,
      `${Products}.categoryid`,
      `${Products}.retailerid`,
      `${Products}.reviewcount`,
      `${Products}.roundrating`,
      `${Products}.rating`,
      `${Products}.productname`,
      `${Products}.url`,
    ],
    timeDimensions: [
      {
        dimension: `${Products}.rundate`,
        granularity: 'day',
        dateRange,
      },
    ],
    order: {
      [`${Products}.productid`]: 'asc',
    },
    filters: [
      {
        dimension: `${Products}.rating`,
        operator: 'gt',
        values: ['0'],
      },
      {
        or: filter
          ? [
              {
                member: `${Products}.productname`,
                operator: 'contains',
                values: [filter],
              },
            ]
          : [],
      },
    ],
  });

  const rawData = resultSet.rawData();
  const parsedData = rawData.map((data) => getDimensionKeys(data));

  return parsedData;
};
