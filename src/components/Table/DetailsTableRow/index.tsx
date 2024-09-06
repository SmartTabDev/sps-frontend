import React from 'react';
import { StyledTableRow } from 'components/Table/StyledTableRow';

export const orderType = {
  DESC: 'desc',
  ASC: 'asc',
};
export type OrderType = typeof orderType[keyof typeof orderType];

type TableBodyProps<P> = {
  id: any;
  isOdd?: boolean;
  order?: OrderType;
  renderColumns?: (
    product: P,
    products: P[],
    index: number
  ) => React.ReactElement;
  products: P[];
  sortFn?: (a: P, b: P) => number;
  filterKey: keyof P;
};

export const DetailsTableRow = <P, >({
  id,
  order,
  isOdd,
  renderColumns,
  products,
  filterKey,
  sortFn,
}: TableBodyProps<P>) => {
  let visibleProducts = products
    .filter((product) => product[filterKey] === id)
    .sort(sortFn);

  if (order === orderType.ASC) {
    visibleProducts = visibleProducts.reverse();
  }

  if (visibleProducts.length === 0) {
    return null;
  }

  return (
    <>
      {visibleProducts.map((product, index) => (
        <StyledTableRow
          key={index}
          $isLast={index + 1 === visibleProducts.length}
          $isFirst={index === 0}
          $isGroupOdd={isOdd}
        >
          {renderColumns && renderColumns(product, visibleProducts, index)}
        </StyledTableRow>
      ))}
    </>
  );
};
