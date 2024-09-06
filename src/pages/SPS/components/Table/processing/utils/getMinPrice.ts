import { DataItem } from 'types/SPSTable';

const getMinPrice = (data: DataItem[]): string => {
  const prices = data
    .map((currentProduct) => Number(currentProduct.price))
    .filter((price) => price > 0);

  const price = Math.min(...(prices.length > 0 ? prices : [0])).toFixed(2);

  return price;
};

export default getMinPrice;
