import {
  CategoryProduct,
  CategoryProductDimensions,
} from 'types/CategoryProduct';
import getCubeName from 'utils/getCubeName';
import { newCubejsApi } from 'api';
import _ from 'lodash';
import moment from 'moment';
import getDimensionKeys from 'utils/cube/getDimensionKeys';

export const getCategoryShareProductOverTime = async (
  accessToken: string,
  regionCode: string | undefined,
  el: CategoryProduct
) => {
  const Products = getCubeName('Category_Products', 'kpi');

  const dimensions: CategoryProductDimensions[] = [
    'name',
    'position',
    'categoryname',
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
        dimension: `${Products}.categoryid`,
        operator: 'equals',
        values: [`${el.categoryid}`],
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
