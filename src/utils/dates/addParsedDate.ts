import moment from 'moment-timezone';

export const getTimezoneDate = (date: string): moment.Moment =>
  moment.utc(date, process.env.REACT_APP_DB_DATE_FORMAT).tz('Europe/Warsaw');

const addParsedDate = (product: any) => {
  const timezoneDate = getTimezoneDate(product.rundate);

  return {
    formattedDate: timezoneDate.format('MMM DD HH:mm'),
    _day: timezoneDate.toObject().date,
    ...product,
  };
};

export default addParsedDate;
