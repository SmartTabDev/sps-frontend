import {
  Cell,
  DataItem,
  PriceCell,
  ProductCell,
  RetailerCell,
  RowMeta,
} from 'types/SPSTable';
import { comparePrices } from './utils/comparePrices';

const getProductNameColumn = (
  products: DataItem[],
  meta: RowMeta,
  withUrl: boolean
): ProductCell => {
  const data = products[0]?.productname;

  return {
    data: data!,
    kind: 'product',
    meta,
  };
};

const getRetailerNameColumn = (
  products: DataItem[],
  meta: RowMeta,
  withUrl: boolean
): RetailerCell => {
  const url = withUrl ? products[0]?.url : undefined;
  const data = products[0]?.retailername;

  return {
    data: data!,
    kind: 'retailer',
    meta: { ...meta, url },
  };
};

function getComparedPrices(cells: PriceCell[]): PriceCell[] {
  if (cells.length) {
    const result = cells.reduce<PriceCell[]>(
      (acc, current: PriceCell, index: number) => {
        const prev = acc[index - 1];
        const curr = current;

        return [
          ...acc,
          {
            ...current,
            kind: 'price',
            meta: {
              ...current.meta,
              isHigher: comparePrices(prev!, curr, 'isHigher'),
              isLower: comparePrices(prev!, curr, 'isLower'),
            },
          },
        ];
      },
      []
    );

    return result;
  }

  return [];
}

const getPriceCells = (
  pricesFound: PriceCell[],
  rowMeta: RowMeta
): PriceCell[] => {
  const dateValues = Object.values(pricesFound);
  const withOddMeta = dateValues.map(({ data, meta, kind }) => ({
    data,
    kind,
    meta: {
      ...meta,
      ...rowMeta,
    },
  }));

  const reducedData = getComparedPrices(withOddMeta);

  return reducedData;
};

const getProductRow = (
  products: DataItem[],
  pricesFound: PriceCell[],
  meta: RowMeta,
  groupBy: 'retailername' | 'productname'
): Cell[] => {
  const productColumn = getProductNameColumn(
    products,
    meta,
    groupBy === 'retailername'
  );
  const retailerColumn = getRetailerNameColumn(
    products,
    meta,
    groupBy === 'productname'
  );
  const result = [
    groupBy === 'productname' ? productColumn : retailerColumn,
    groupBy === 'productname' ? retailerColumn : productColumn,
    ...getPriceCells(pricesFound, meta),
  ];

  return result;
};

export default getProductRow;
