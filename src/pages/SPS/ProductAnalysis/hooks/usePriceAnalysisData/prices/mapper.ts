import moment from 'moment';
import { IndexRange } from 'react-virtualized';
import formatPrice from 'utils/formatPrice';
import getCubeName from 'utils/getCubeName';
import { ProductsStructure } from '../baseData/type';

const Variants = getCubeName('Variants');

export function fillProductsWithPrices(
  products: ProductsStructure,
  data: any[],
  dateRange: [string, string],
  runs: string[]
): ProductsStructure {
  const from = moment(dateRange[0]);
  const to = moment(dateRange[1]);
  // first we are setting null on all cells that should be loaded in this query
  runs
    .filter((runDate) => {
      const runDateMoment = moment(runDate);
      return runDateMoment.isSameOrAfter(from) && runDateMoment.isBefore(to);
    })
    .forEach((runDate) => {
      Object.keys(products).forEach((productName: any) => {
        products[productName]?.retailers.forEach((retailer) => {
          retailer.runs[runDate] = null;
        });
      });
    });

  data.forEach((row) => {
    const product = products[row[`${Variants}.productid`]];
    const retailer =
      product &&
      product.retailers.find(
        (r) => r.retailername === row[`${Variants}.retailername`]
      );

    if (product && retailer) {
      retailer.runs[row[`${Variants}.rundate`]] = {
        regularPrice: row[`${Variants}.regularprice`],
        available: row[`${Variants}.available`],
        price: row[`${Variants}.price`] || row[`${Variants}.minPrice`], // only add run+minPrice
      };
      retailer.runsFormatted[row[`${Variants}.rundate`]] = formatPrice(
        row[`${Variants}.price`] || row[`${Variants}.minPrice`] || 0
      ); // only add run+price
    }
  });

  return { ...products };
}

export function findBatchesToLoadNow(
  params: IndexRange,
  runs: string[],
  runsBatches: [string, string][],
  runsBatchesTriggered: Record<string, boolean>
): number[] {
  const { startIndex, stopIndex } = params;
  const leftDateIndex = Math.max(0, startIndex + 2);
  const rightDateIndex = Math.max(0, stopIndex + 2);

  const leftDate = new Date(runs[leftDateIndex]!);
  const rightDate = new Date(runs[rightDateIndex]!);

  const batchesIndexesToLoad: number[] = [];

  runsBatches.forEach((dateRange, index) => {
    if (!runsBatchesTriggered[index]) {
      const startRange = new Date(dateRange[0]);
      const endRange = new Date(dateRange[1]);
      if (
        (leftDate >= startRange && leftDate <= endRange) ||
        (rightDate >= startRange && rightDate <= endRange)
      ) {
        batchesIndexesToLoad.push(index);
      }
    }
  });

  return batchesIndexesToLoad;
}
