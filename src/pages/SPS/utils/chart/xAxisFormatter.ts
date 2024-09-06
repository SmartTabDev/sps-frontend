import { getTimezoneDate } from 'utils/dates/addParsedDate';
import uniqBy from 'lodash/uniqBy';

const xAxisFormatter = (isDaily: boolean, dates: string[] = []) => (
  value: any,
) => {
  const [date, time] = getTimezoneDate(value)
    .format('DD/MM/YYYY HH:mm')
    .split(' ');

  if (isDaily) {
    return date;
  }

  const formatedDates = dates.map(
    (item) => {
      const timezoneDate = getTimezoneDate(item as string)
        .format('DD/MM/YYYY HH:mm')
        .split(' ');

      return {
        date: timezoneDate[0],
        time: timezoneDate[1],
      };
    },
  );

  const uniqueDays = uniqBy(formatedDates, 'date').map((item) => item.time);

  return `${
    uniqueDays.includes(time as string) ? `${date} ` : ''
  }{time|${time}}`;
};

export default xAxisFormatter;
