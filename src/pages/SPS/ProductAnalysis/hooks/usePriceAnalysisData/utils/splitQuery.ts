import { Query } from '@cubejs-client/core';

const splitQuery = (query: Query, limit: number, allCount: number): Query[] => {
  const requests = Math.ceil(allCount / limit);
  const queries = Array(requests)
    .fill(query)
    .map((q, i) => ({ ...q, limit, offset: i * limit }));

  return queries;
};

export default splitQuery;
