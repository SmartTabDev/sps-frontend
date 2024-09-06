import { formatRequestDate } from 'components/FormatDate/FormatDate';
import moment from 'moment';

const getToDate = (date: Date = new Date()): string => {
  let nowOrDate = moment(Date.now());

  if (date) {
    nowOrDate = moment(date);
  }

  const utcDate = nowOrDate.utc();
  const basedOnToday = utcDate.isSame(moment.utc(), 'day');
  let to;

  if (basedOnToday) {
    const now = moment.utc();
    const remainder = 30 + (now.minute() % 30);
    to = now.subtract(remainder, 'minutes');
  } else {
    to = utcDate.endOf('day');
  }

  return formatRequestDate(to);
};

export default getToDate;
