import { KeywordProduct, KeywordProductDimensions } from 'types/KeywordProduct';
import getCubeName from 'utils/getCubeName';
import { newCubejsApi } from 'api';
import _ from 'lodash';
import moment from 'moment';
import getDimensionKeys from 'utils/cube/getDimensionKeys';

export const getSearchShareProductOverTime = async (
  accessToken: string,
  regionCode: string | undefined,
  el: KeywordProduct
) => {
  const Products = getCubeName('Keyword_Products', 'kpi');

  const dimensions: KeywordProductDimensions[] = [
    'name',
    'position',
    'keywordname',
    'retailername',
  ];

  const resultSet = await newCubejsApi(accessToken, regionCode).load({
    dimensions: dimensions.map((d) => `${Products}.${d}`),
    timeDimensions: [
      {
        dimension: `${Products}.rundate`,
        granularity: 'day',
        dateRange: 'from 7 days ago to now',
      },
    ],
    order: {
      [`${Products}.rundate`]: 'asc',
    },
    filters: [
      {
        dimension: `${Products}.name`,
        operator: 'equals',
        values: [el.name],
      },
      {
        dimension: `${Products}.retailerid`,
        operator: 'equals',
        values: [`${el.retailerid}`],
      },
      {
        dimension: `${Products}.keywordid`,
        operator: 'equals',
        values: [`${el.keywordid}`],
      },
    ],
  });

  const rawData = resultSet.rawData();
  const parsedData = rawData.map((data) => getDimensionKeys(data));
  const uniqDays = _.uniqBy(parsedData, 'rundate');

  const result = uniqDays.map(({ rundate, position }) => ({
    [moment(rundate).format('MMMM DD')]: position,
  }));

  return result;
};
