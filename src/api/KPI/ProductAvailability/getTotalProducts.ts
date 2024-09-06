import getCubeName from 'utils/getCubeName';
import { newCubejsApi } from 'api';
import getDimensionKeys from 'utils/cube/getDimensionKeys';
import getPercentage from '../utils/getPercentage';
import getAvailability from '../utils/getAvailability';

export const getTotalProducts = async (
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
        dateRange: 'Today',
      },
    ],
  });

  const rawData = resultSet.rawData();
  const parsedData = rawData.map((data) => getDimensionKeys(data));
  const availability = getAvailability(parsedData);

  return {
    inStock: getPercentage(availability.all, availability.inStock),
    outOfStock: getPercentage(availability.all, availability.outOfStock),
    void: getPercentage(availability.all, availability.void),
  };
};
