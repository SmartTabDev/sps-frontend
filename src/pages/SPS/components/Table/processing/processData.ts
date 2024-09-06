import map from 'lodash/map';
import filter from 'lodash/filter';
import sortBy from 'lodash/sortBy';
import addParsedDate from 'utils/dates/addParsedDate';
import { Product } from 'types/Product';

const replaceNullPrices = ({ price, ...rest }: any) => ({
  ...rest,
  price: price !== null ? price : '0.00',
});

const formatPrice = ({ price, ...rest }: any) => ({
  ...rest,
  price: Number(price).toFixed(2),
});

const filterNullDates = ({ rundate }: any) => !!rundate;

export const getFormatedList = (tablePivot: Product[]) => {
  const replacedNulls = map(tablePivot, replaceNullPrices);
  const formatedPrices = map(replacedNulls, formatPrice);
  const filteredDates = filter(formatedPrices, filterNullDates);
  const parsedDates = map(filteredDates, addParsedDate);
  const sortedDates = sortBy(parsedDates, ['productName', 'retailer']);

  return sortedDates;
};

const processData = (tablePivot: Product[]) => {
  const result = getFormatedList(tablePivot as Product[]);

  return result;
};

export default processData;
