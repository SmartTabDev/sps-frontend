import takeRight from 'lodash/takeRight';
import { CardSeries } from './types';

// this util fills missing historical data points
const fillSeries = (
  series: CardSeries[] | undefined,
  dataPoints = 7,
  fillUndefined = false
): CardSeries[] => {
  if (!series) {
    return [];
  }

  const result = series.map((s) => ({
    ...s,
    data: takeRight(
      [...Array(dataPoints).fill(fillUndefined ? undefined : 0), ...s.data],
      dataPoints
    ),
  }));

  return result;
};

export default fillSeries;
