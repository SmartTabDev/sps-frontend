import getCubeName from 'utils/getCubeName';
import { newCubejsApi } from 'api';
import getDimensionKeys from 'utils/cube/getDimensionKeys';

export const getTotalUnavailable = async (
  accessToken: string,
  regionCode: string | undefined
) => {
  const Products = getCubeName('Products', 'kpi');

  const resultSet = await newCubejsApi(accessToken, regionCode).load({
    timeDimensions: [
      {
        dimension: `${Products}.rundate`,
        dateRange: 'Today',
      },
    ],
    dimensions: [
      `${Products}.available`,
      `${Products}.productid`,
      `${Products}.categoryname`,
      `${Products}.ispageavailable`,
      `${Products}.retailername`,
      `${Products}.productname`,
      `${Products}.url`,
    ],
    filters: [
      {
        dimension: `${Products}.available`,
        operator: 'equals',
        values: ['false'],
      },
    ],
  });

  const rawData = resultSet.rawData();

  const parsedData = rawData.map((data) => getDimensionKeys(data));

  return parsedData;
};
