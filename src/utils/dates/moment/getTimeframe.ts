import { formatRequestDate } from 'components/FormatDate/FormatDate'; // QUERY_DATE_FORMAT
// import { formatTimeframe } from 'components/FormatTimeframe/FormatTimeframe';
import moment from 'moment';

const getDayStartDate = (date: string): string => {
  return formatRequestDate(moment(date).startOf('day').utc());
};

// addDays is for scraping data from the end of the day
const getDayEndDate = (date: string, addDays = 0): string =>
  formatRequestDate(moment(date).add(addDays, 'days').endOf('day').utc());

// this function returns request utc timeframe
const getTimeframe = (
  dates: [string | null, string | null]
): [string | null, string | null] => {
  const [from, to] = dates;

  const startDate = from ? getDayStartDate(from) : null;
  const endDate = to ? getDayEndDate(to) : null;
  const timeframe = [startDate, endDate] as [string | null, string | null];

  return timeframe;
};

export { getTimeframe, getDayStartDate, getDayEndDate };
