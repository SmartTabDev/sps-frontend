import { formatRequestDate } from 'components/FormatDate/FormatDate';
import moment from 'moment';

const getFromDate = (date: Date | undefined, intervals = 0): string => {
  let nowOrDate = moment(Date.now());

  if (date) {
    nowOrDate = moment(date);
  }

  const utcDate = nowOrDate.utc();
  const basedOnToday = utcDate.isSame(moment.utc(), 'day');
  let from;

  const startOfDay = utcDate.startOf('day').subtract(intervals, 'days');

  if (basedOnToday && intervals > 0) {
    const now = moment(Date.now());
    const remainder = 30 + (now.minute() % 30);
    from = now
      .subtract(intervals, 'days')
      .subtract(remainder, 'minutes')
      .startOf('day')
      .utc();
  } else {
    from = startOfDay;
  }

  return formatRequestDate(from);
};

export default getFromDate;
