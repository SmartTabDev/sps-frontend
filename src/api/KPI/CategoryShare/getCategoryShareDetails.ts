import {
  CategoryProductDimensions,
  CategoryProduct,
} from 'types/CategoryProduct';
import getCubeName from 'utils/getCubeName';
import { newCubejsApi } from 'api';
import getDimensionKeys from 'utils/cube/getDimensionKeys';

export const getCategoryShareDetails = async (
  accessToken: string,
  regionCode: string | undefined,
  retailerIds: string[]
): Promise<CategoryProduct[]> => {
  const Products = getCubeName('Category_Products', 'kpi');

  const dimensions: CategoryProductDimensions[] = [
    'categoryid',
    'categoryname',
    'name',
    'position',
    'retailerid',
    'retailername',
    'url',
    'producturl',
  ];

  const resultSet = await newCubejsApi(accessToken, regionCode).load({
    dimensions: dimensions.map((d) => `${Products}.${d}`),
    timeDimensions: [
      {
        dimension: `${Products}.rundate`,
        granularity: 'day',
        dateRange: 'Today',
      },
    ],
    order: {
      [`${Products}.position`]: 'asc',
    },
    filters: [
      {
        dimension: `${Products}.retailerid`,
        operator: 'equals',
        values: retailerIds,
      },
    ],
    limit: 30000,
  });

  const rawData = resultSet.rawData();
  const parsedData = rawData.map((data) => getDimensionKeys(data));

  return parsedData;
};
