/* eslint-disable global-require, @typescript-eslint/no-var-requires */
import React, { useCallback, useState } from 'react';
import { MultiGrid, AutoSizerProps } from 'react-virtualized';
import { useDispatch } from 'react-redux';
import { setSelectedProduct } from 'reducers/productAnalysis/actions';
import { Row } from 'types/SPSTable';
import { ProductComparisonView } from 'reducers/productComparison/productComparison';
import { styles } from './style';
import Cell from './components/Cell/Cell';

let { AutoSizer } = require('react-virtualized');

if (process.env.NODE_ENV === 'test') {
  AutoSizer = require('react-virtualized/dist/commonjs/AutoSizer');
}

type ProductComparisonTableProps = {
  handleOpenModal?: () => void;
  isDense: boolean;
  isIndex: boolean;
  list: Row[];
  showBy: ProductComparisonView;
};

const ProductComparisonTable: React.FC<ProductComparisonTableProps> = ({
  handleOpenModal,
  isDense,
  isIndex,
  list,
  showBy,
}) => {
  const dispatch = useDispatch();
  const [hoverIndex, setHoverIndex] = useState<number | undefined>();

  const handleSelectProduct = useCallback(
    (rowIndex: number, columnIndex: number) => {
      const isTableBody = columnIndex !== 1 && rowIndex !== 0;

      if (handleOpenModal && isTableBody) {
        // it should be index for product column
        dispatch(setSelectedProduct(list[rowIndex]![0]!.data));
        handleOpenModal();
      }
    },
    [list, handleOpenModal, dispatch]
  );

  const cellRenderer = useCallback(
    ({ columnIndex, rowIndex, style, key }) => {
      const cell = list[rowIndex]![columnIndex];

      return (
        <Cell
          handleHover={setHoverIndex}
          selectProduct={handleSelectProduct}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          cell={cell}
          style={style}
          key={key}
          productNameLink={false}
          isDense={isDense}
          isIndex={isIndex}
        />
      );
    },
    [list, handleSelectProduct, isDense, isIndex]
  );

  const columnCount = list[0]!.length;
  const rowCount = list.length;

  const columnWidth = ({ index }: { index: number }): number => {
    if (index === 0) return showBy === 'Product' ? 250 : 130;
    if (index === 1) return showBy === 'Product' ? 130 : 250;

    return 130;
  };

  // MultiGrid is not rerendering cells if there is no data change - it's ok
  // making inline style for row index seems like easiest way to achieve hover effect
  return (
    <>
      {!!hoverIndex && (
        <style>{`.row-index-${hoverIndex}{ background: rgba(115, 165, 231, 0.25) !important;}`}</style>
      )}
      <AutoSizer>
        {({ width, height }: AutoSizerProps) => (
          <MultiGrid
            cellRenderer={cellRenderer}
            columnCount={columnCount}
            columnWidth={columnWidth}
            enableFixedColumnScroll
            enableFixedRowScroll={false}
            fixedColumnCount={2}
            fixedRowCount={1}
            height={height}
            hideBottomLeftGridScrollbar
            hideTopRightGridScrollbar
            list={list}
            rowCount={rowCount}
            rowHeight={60}
            scrollToColumn={rowCount}
            scrollToRow={0}
            style={styles.grid.base}
            styleBottomLeftGrid={styles.grid.bottomLeft}
            styleTopLeftGrid={styles.grid.topLeft}
            styleTopRightGrid={styles.grid.topRight}
            width={width}
          />
        )}
      </AutoSizer>
    </>
  );
};
export default ProductComparisonTable;
