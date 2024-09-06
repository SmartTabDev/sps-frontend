import { formatRequestDate } from 'components/FormatDate/FormatDate';
import moment from 'moment';

const getFromDateWithRemainder = (date: string): string => {
  const fromDate = moment(date);
  const remainder = 30 + (fromDate.minute() % 30);
  const from = fromDate.subtract(remainder, 'minutes');

  return formatRequestDate(from);
};

export default getFromDateWithRemainder;
