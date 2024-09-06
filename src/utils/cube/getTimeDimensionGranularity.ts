import * as Cube from '@cubejs-client/core';

export function getTimeDimensionGranularity(
  timeDimensionName: string
): Cube.TimeDimensionGranularity {
  const granularityMap: Record<string, Cube.TimeDimensionGranularity> = {
    'This week': 'day',
    'Last week': 'day',
    'This month': 'week',
    'Last month': 'week',
    'This year': 'month',
    'Last year': 'month',
  };

  return granularityMap[timeDimensionName] || 'day';
}
