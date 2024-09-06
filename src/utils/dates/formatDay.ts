import moment from 'moment-timezone';

const formatDay = (date: string) => ({
  data: moment.utc(date).tz('Europe/Warsaw').format('MMM DD'),
});

export default formatDay;
