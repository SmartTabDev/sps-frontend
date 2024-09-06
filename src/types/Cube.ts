export type CubeTime =
  | 'This week'
  | 'Last week'
  | 'This month'
  | 'Last month'
  | 'Last year'
  | 'This year';

export type TimeDimension = { name: CubeTime };
