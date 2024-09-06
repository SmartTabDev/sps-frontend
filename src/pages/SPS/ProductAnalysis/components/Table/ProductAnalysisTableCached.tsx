import React, { ComponentProps, useState } from 'react';
import { ProductAnalysisTable } from './ProductAnalysisTable';

const ProductAnalysisTableMemo = React.memo(ProductAnalysisTable);

type ProductAnalysisTableCachedProps = Omit<
  ComponentProps<typeof ProductAnalysisTable>,
  'handleRowHover'
>;

export const ProductAnalysisTableCached: React.FC<
  ProductAnalysisTableCachedProps
> = ({
  list,
  handleOpenModal,
  isSectionLoaded,
  productNameLink,
  isDense,
  isIndex,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | undefined>();

  // MultiGrid is not rerendering cells if there is no data change - it's ok
  // making inline style for row index seems like easiest way to achieve hover effect
  return (
    <>
      <style>
        {
          '.ReactVirtualized__Grid__innerScrollContainer { border-bottom: 1px solid transparent !important }'
        }
      </style>
      {!!hoverIndex && (
        <style>{`.row-index-${hoverIndex}{ background: rgba(115, 165, 231, 0.25) !important;}`}</style>
      )}
      <ProductAnalysisTableMemo
        key={list[0]?.[0] === undefined ? 'skeleton' : list[0].length} // required for good initial scrolling
        list={list}
        handleOpenModal={handleOpenModal}
        isSectionLoaded={isSectionLoaded}
        handleRowHover={setHoverIndex}
        productNameLink={productNameLink}
        isDense={isDense}
        isIndex={isIndex}
      />
    </>
  );
};
