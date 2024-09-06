import { UnaryFilter } from '@cubejs-client/core';

const cubeSetFilter = (dimension: UnaryFilter['dimension']): UnaryFilter => ({
  dimension,
  operator: 'set',
});

export default cubeSetFilter;
