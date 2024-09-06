import { BinaryFilter } from '@cubejs-client/core';

const cubeEqualsFilter = (dimension: BinaryFilter['dimension'], values: BinaryFilter['values']): BinaryFilter => ({
  dimension,
  operator: 'equals',
  values,
});

export default cubeEqualsFilter;
