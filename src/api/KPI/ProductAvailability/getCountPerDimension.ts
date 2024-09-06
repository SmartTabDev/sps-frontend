import { newCubejsApi } from 'api';
import getCubeName from 'utils/getCubeName';

export const getCountPerDimension = async (
  accessToken: string,
  regionCode: string | undefined,
  dimension: 'retailername' | 'categoryname' | 'brandname',
  desc?: boolean,
) => {
  const Products = getCubeName('Products', 'kpi');

  const order = desc ? 'desc' : 'asc';

  const resultSet = await newCubejsApi(accessToken, regionCode).load({
    dimensions: [`${Products}.${dimension}`],
    order: {
      [`${Products}.availabilityCount`]: order,
    },
    measures: [`${Products}.availabilityCount`],
    timeDimensions: [
      {
        dimension: `${Products}.rundate`,
        dateRange: 'Today',
      },
    ],
    limit: 3,
  });

  const tablePivot = resultSet.tablePivot();
  const result = tablePivot
    .map((item) => Object.values(item))
    .map(([name, count]) => ({ name, count }));

  return result;
};
