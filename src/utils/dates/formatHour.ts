import moment from 'moment-timezone';

const formatHour = (date: string) => {
  const momentInstance = moment.utc(date).tz('Europe/Warsaw');
  const monthNumber = momentInstance.get('M');
  const fullDate = momentInstance.format('MMM DD HH:mm');
  const [month, day] = fullDate.split(' ');

  return {
    data: fullDate, // need to be full date to recognize dates later
    meta: {
      month,
      monthNumber,
      day: Number(day),
    },
  };
};

export default formatHour;
