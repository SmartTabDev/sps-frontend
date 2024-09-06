import getFromDate from 'utils/dates/getFromDate';
import getToDate from 'utils/dates/getToDate';
import { PriceAnalysisTimeframe } from '../types';

const getInitialTimeframe = (intervals: number): PriceAnalysisTimeframe | null => {
  if (!intervals) {
    return null;
  }

  const from = getFromDate(undefined, intervals);
  const to = getToDate();

  const result: [string, string] = [from, to];

  return result;
};

export default getInitialTimeframe;
