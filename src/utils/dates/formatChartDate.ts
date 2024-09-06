import moment from 'moment';

export const formatChartDate = (date: string) => {
  return moment(date).format('DD/MM/YY');
};
