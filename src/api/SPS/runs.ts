import { Query } from '@cubejs-client/core';
import getCubeName from 'utils/getCubeName';
import { newCubejsApi } from '../index';

export const getClientRuns = async (
  accessToken: string,
  regionCode: string | undefined,
  dateRange: [string, string] | string,
  limit?: number,
  createdatDesc?: boolean
): Promise<string[]> => {
  const Runs = getCubeName('Runs');

  const query: Query = {
    dimensions: [`${Runs}.createdat`],
    timeDimensions: [
      {
        dimension: `${Runs}.createdat`,
        granularity: 'day',
        dateRange,
      },
    ],
  };

  if (limit) query.limit = limit;
  if (createdatDesc) query.order = { [`${Runs}.createdat`]: 'desc' };

  const resultSet = await newCubejsApi(accessToken, regionCode).load(query);

  const tablePivot = resultSet.tablePivot();
  const createdAtValues = tablePivot.map(
    (i) => i[`${Runs}.createdat`]
  ) as string[];

  return createdAtValues;
};
