import nest from 'utils/nest';
import { Cell, DataItem, Row } from 'types/SPSTable';
import getPriceCell from '../getPriceCell';
import getProductRow from '../getProductRow';
import isFirst from '../utils/isFirst';
import isOdd from '../utils/isOdd';
import isLast from '../utils/isLast';

const groupData = (data: DataItem[], groupBy: string[]) => nest(data, groupBy);

const process = (data: DataItem[], dates: Cell[], groupBy: string[]): Row[] => {
  const groupedData = groupData(data, groupBy);

  const result: Row[] = [];

  const productEntries = Object.entries(groupedData);

  productEntries.forEach(([, products], productIndex) => {
    const retailerEntries = Object.entries<DataItem[]>(products as any);

    retailerEntries.forEach(([, retailerProducts], retailerIndex) => {
      const pricesFound = getPriceCell(retailerProducts, dates);
      const row = getProductRow(
        retailerProducts,
        pricesFound,
        {
          isFirst: isFirst(retailerIndex),
          isOdd: isOdd(productIndex),
          isLast: isLast(retailerIndex, retailerEntries),
        },
        groupBy[0] as 'retailername' | 'productname'
      );

      result.push(row);
    });
  });

  return result;
};

export default process;
