import { KeywordProductDimensions, KeywordProduct } from 'types/KeywordProduct';
import getCubeName from 'utils/getCubeName';
import { newCubejsApi } from 'api';
import getDimensionKeys from 'utils/cube/getDimensionKeys';

export const getSearchShareDetails = async (
  accessToken: string,
  regionCode: string | undefined,
  retailerIds: string[]
): Promise<KeywordProduct[]> => {
  const Products = getCubeName('Keyword_Products', 'kpi');

  const dimensions: KeywordProductDimensions[] = [
    'keywordid',
    'keywordname',
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
