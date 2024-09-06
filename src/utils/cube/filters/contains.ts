import { BinaryFilter } from '@cubejs-client/core';

const cubeContainsFilter = (dimension: BinaryFilter['dimension'], values: BinaryFilter['values']): BinaryFilter => ({
  dimension,
  operator: 'contains',
  values,
});

export default cubeContainsFilter;
