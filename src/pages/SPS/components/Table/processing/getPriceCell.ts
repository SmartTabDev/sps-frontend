import matchDates from './utils/matchDates';

const getPriceCell = (items: any[], dates: any[]): any[] => {
  const matchedDates = matchDates(items, dates);
  const result = matchedDates.map((item) => ({
    data: item ? item.price : '0,00',
    kind: 'price',
    meta: {
      regularPrice: item ? item.regularprice : 0,
      available: item ? item.available : null,
      isNA: !item,
    },
  }));

  return result;
};

export default getPriceCell;
