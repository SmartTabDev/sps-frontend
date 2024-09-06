import nest, { Nest } from 'utils/nest';
import { Cell, DataItem, Row } from 'types/SPSTable';
import getPriceCell from '../getPriceCell';
import getProductRow from '../getProductRow';
import isFirst from '../utils/isFirst';
import isOdd from '../utils/isOdd';
import isLast from '../utils/isLast';
import getMinPrice from '../utils/getMinPrice';

const groupData = (data: DataItem[], groupBy: string[]) =>
  nest(data, [...groupBy, '_day']);

const reduceDayEntries = (
  retailerEntries: [string, DataItem[] | Nest<DataItem>][] = [],
  getPrice: (item: DataItem[]) => string
) => {
  if (!retailerEntries) {
    return [];
  }

  return retailerEntries.map(
    ([productName, products]): [string, DataItem[]] => {
      const productsValues: DataItem[][] = Object.values(products);
      const reducedProducts = productsValues.reduce((acc, current) => {
        const price = getPrice(current);
        const newRecord: any = { ...current[0], price };
        return [...acc, newRecord];
      }, []);

      return [productName, reducedProducts];
    }
  );
};

const getRows = (
  reducedDayEntries: [string, DataItem[]][],
  dates: Cell[],
  productIndex: number,
  retailerEntries: any[],
  groupBy: 'retailername' | 'productname'
) => {
  const result: Row[] = [];

  reducedDayEntries.forEach(([, retailerProducts], retailerIndex) => {
    const pricesFound = getPriceCell(retailerProducts, dates);

    const row = getProductRow(
      retailerProducts,
      pricesFound,
      {
        isFirst: isFirst(retailerIndex),
        isOdd: isOdd(productIndex),
        isLast: isLast(retailerIndex, retailerEntries),
      },
      groupBy
    );

    result.push(row);
  });

  return result;
};

const process = (data: DataItem[], dates: Cell[], groupBy: string[]): Row[] => {
  const groupedData = groupData(data, groupBy);

  const result: Row[] = [];

  const productEntries = Object.entries(groupedData);

  productEntries.forEach(([, products], productIndex: number) => {
    const retailerEntries = Object.entries(products as Nest<DataItem>);
    const reducedDayEntries = reduceDayEntries(retailerEntries, getMinPrice);

    const rows = getRows(
      reducedDayEntries,
      dates,
      productIndex,
      retailerEntries,
      groupBy[0] as 'retailername' | 'productname'
    );

    result.push(...rows);
  });

  return result;
};

export default process;
