import {
  Cell,
  RetailerCell,
  PriceCell,
  Row,
  ProductCell,
} from 'types/SPSTable';
import moment from 'moment-timezone';
import flatten from 'lodash/flatten';
import groupBy from 'lodash/groupBy';
import isUndefined from 'lodash/isUndefined';
import { PriceAnalysisFilters } from 'pages/SPS/ProductAnalysis/components/ExpandedFilters/types';
import devLog from 'utils/devLog';
import * as math from 'mathjs';
import { Product } from '../baseData/type';
import priceChangeFilter from '../filters/priceChangeFilter';
import availabilityFilter from '../filters/availabilityFilter';
import priceRangeFilter from '../filters/priceRangeFilter';

function isLower(priceA?: number | null, priceB?: number | null): boolean {
  if (!priceA || !priceB) {
    return false;
  }

  return priceA - priceB > 0;
}

function getTextSize(productName?: string | null): string | undefined {
  const length = productName ? productName.length : false;

  //   if (length <= 15) return 'normal';
  if (length <= 60) return 'medium';

  return 'small';
}

function isHigher(priceA?: number | null, priceB?: number | null): boolean {
  if (!priceA || !priceB) {
    return false;
  }
  return priceA - priceB < 0;
}

export function mapProductsStructureToList(
  productsOrder: number[],
  runs: string[],
  productsWithPrices: Record<number, Product>,
  dateKind: 'date-hour' | 'date',
  namesMap: { [key: string]: string },
  filters?: PriceAnalysisFilters
): Row[] {
  const table: Row[] = [];

  const dates: Row = [
    { data: 'Product', kind: 'product' },
    { data: 'Retailer', kind: 'retailer' },
    ...runs.map((date, index): Cell => {
      const momentDate = moment.utc(date).tz('Europe/Warsaw');
      const prevDay =
        runs[index - 1] &&
        moment
          .utc(runs[index - 1])
          .tz('Europe/Warsaw')
          .day();
      const nextDay =
        runs[index + 1] &&
        moment
          .utc(runs[index + 1])
          .tz('Europe/Warsaw')
          .day();

      const isFirstDate = prevDay !== momentDate.day();
      const isLastDate = nextDay !== momentDate.day();

      return {
        data: momentDate.format('MMM DD HH:mm'),
        kind: dateKind,
        meta: {
          originalDate: date,
          monthNumber: momentDate.month(),
          day: momentDate.day(),
          isFirstDate,
          isLastDate,
        },
      };
    }),
  ];

  table.push(dates);

  const filteredProductsWithPrices = productsOrder
    .map((configProductId) => productsWithPrices[configProductId as any]!)
    .filter(Boolean);

  type ProductRow = [ProductCell, RetailerCell, ...(PriceCell | undefined)[]];
  const products: ProductRow[] = [];

  filteredProductsWithPrices.forEach((product) => {
    product.retailers.forEach((retailer) => {
      if (!namesMap[product.productid]) {
        devLog('Not found product id:', product.productid);
      }

      const productname = namesMap[product.productid] || '-';

      // index
      const row: ProductRow = [
        {
          data: productname,
          kind: 'product',
          meta: {
            textSize: getTextSize(productname),
            productname,
            productid: product.productid,
          },
        },
        {
          data: retailer.retailername,
          kind: 'retailer',
          meta: {
            retailername: retailer.retailername,
            productname,
            retailerid: retailer.retailerid,
            productid: product.productid,
            url: retailer.url,
            textSize: getTextSize(productname),
          },
        },
      ];
      let prevDate: string | undefined;
      runs.forEach((date) => {
        if (date in retailer.runs) {
          const run = retailer.runs[date];
          const prevRun = prevDate && retailer.runs[prevDate];
          const isNA = !run;
          const available = isNA === false && !!run?.available; // crazy logic
          row.push({
            data:
              isNA && available === false
                ? '0.00'
                : retailer.runsFormatted[date]!,
            kind: 'price',
            meta: {
              regularPrice: run?.regularPrice || 0,
              originalDate: date,
              originalPrice: retailer.runsFormatted[date]!,
              available,
              isLower: isLower(
                prevRun ? prevRun.price : undefined,
                run ? run.price : undefined
              ),
              isHigher: isHigher(
                prevRun ? prevRun.price : undefined,
                run ? run.price : undefined
              ),
              isNA,
              retailerid: retailer.retailerid,
              productid: product.productid,
            },
          });
        } else {
          row.push(undefined); // skeleton
        }
        prevDate = date;
      });
      products.push(row);
    });
  });

  // filter logic

  let filteredProducts: ProductRow[] = [];

  if (filters) {
    filteredProducts = products.filter((cells) => {
      const lastCell = cells[cells.length - 1];

      if (isUndefined(lastCell)) {
        return true;
      }

      const { meta, data } = lastCell as PriceCell;

      const priceChange = filters.priceChange
        ? priceChangeFilter(meta, filters.priceChange)
        : true;
      const availability = filters.availability
        ? availabilityFilter(meta, filters.availability)
        : true;
      const priceRange = filters.priceRange
        ? priceRangeFilter(data, filters.priceRange)
        : true;

      if (priceChange && availability && priceRange) {
        return true;
      }

      return false;
    });
  }

  // isOdd, isFirst logic
  const groupedProducts = Object.entries(
    groupBy(filteredProducts, (p) => p[0].data)
  );

  const productsWithDecoratos = flatten(
    groupedProducts.map((entry, groupIndex): Row[] => {
      const [_, retailerRow] = entry;

      // groupIndex
      const groupLength = retailerRow.length;

      // calculate max price per retailer
      const pricesArray = retailerRow.map((row) => {
        const [_1, _2, ...prices] = row;
        return prices.map((price) =>
          Number((price?.meta.originalPrice || '0,00').replace(',', '.'))
        );
      });

      const matrix = math.matrix(pricesArray);
      const transposedMatrix = math.transpose(matrix).toArray();

      const maxPrice = (transposedMatrix as number[][]).map((row) => {
        const max = math.max(Array.isArray(row) ? row : [row]);

        if (Array.isArray(row)) {
          return row.map((num) => (num === max ? 1 : 0));
        }

        return [0];
      });

      const nextMatrix = math.matrix(maxPrice);
      const transposedNextMatrix = math.transpose(nextMatrix).toArray();

      return retailerRow.map((row, rowIndex) => {
        const [productname, retailername, ...prices] = row;
        const isLast = groupLength - 1 === rowIndex;

        return [
          {
            ...productname,
            meta: {
              ...productname.meta,
              isOdd: groupIndex % 2 === 0,
              isFirst: rowIndex === 0,
            },
          },
          {
            ...retailername,
            meta: { ...retailername.meta, isOdd: groupIndex % 2 === 0, isLast },
          },
          ...prices.map((cell, priceIndex) =>
            cell
              ? {
                  ...cell,
                  meta: {
                    ...(cell?.meta || {}),
                    isOdd: groupIndex % 2 === 0,
                    isLast,
                    isHighest:
                      (transposedNextMatrix as number[][])[rowIndex]![
                        priceIndex
                      ] === 1,
                  },
                }
              : undefined
          ),
        ];
      });
    })
  );

  table.push(...(productsWithDecoratos as Row[]));

  return table;
}
