import { Cell, DataItem } from 'types/SPSTable';

const matchDates = (items: DataItem[], dates: Cell[]): (DataItem | undefined)[] => {
  const result = dates.map((date: Cell) => {
    const dateProducts = items.filter((p) => p.formattedDate.includes(String(date.data)));
    const dateProduct = dateProducts[0];

    if (dateProducts.length > 1 && process.env.NODE_ENV === 'development') {
      // console.log(dateProducts,'duplicated product fetched');
    }

    return dateProduct;
  });

  return result!;
};

export default matchDates;
