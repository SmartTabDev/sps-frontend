import groupBy from 'lodash/groupBy';
import sortBy from 'lodash/sortBy';

const addHourMeta = (arr: any[]) => {
  const grouped = groupBy(arr, 'meta.day');

  const withMeta = Object.values(grouped)
    .map((group) => group.map((date, index) => ({
      ...date,
      meta: {
        ...date.meta,
        isFirstDate: index === 0,
        isLastDate: index === group.length - 1,
      },
    })))
    .flat();

  const sortedDates = sortBy(withMeta, 'meta.monthNumber');

  return sortedDates;
};

export default addHourMeta;
