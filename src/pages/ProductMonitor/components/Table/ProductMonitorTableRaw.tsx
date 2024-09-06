import React, { useCallback } from 'react';
import { AutoSizer, GridCellRenderer, MultiGrid } from 'react-virtualized';
import { styles } from 'pages/SPS/components/Table/style';
import { ProductMonitorList } from 'pages/ProductMonitor/types';

import { CellHeader } from './Cell/CellHeader';
import { CellName } from './Cell/CellName';
import { CellBrand } from './Cell/CellBrand';
import { CellPrice } from './Cell/CellPrice';

interface Props {
  list: ProductMonitorList;
  handleOpenModal: (productName: string) => void;
  handleRowHover: (index?: number) => void;
}

export const ProductMonitorTableRaw: React.FC<Props> = ({
  list,
  handleOpenModal,
  handleRowHover,
}) => {
  const handleSelectProduct = useCallback(
    (rowIndex: number, columnIndex: number) => {
      const isProductNameSection =
        [0, 1].includes(columnIndex) && rowIndex !== 0;
      const row = list[rowIndex];
      if (isProductNameSection && row) {
        // it should be index for product column
        const brand = row[0];
        const productName = row[1];

        const productBrandAndName = `${brand} - ${productName}`;
        if (productBrandAndName) {
          handleOpenModal(productBrandAndName);
        }
      }
    },
    [handleOpenModal, list]
  );

  const cellRenderer = useCallback<GridCellRenderer>(
    ({ columnIndex, rowIndex, style, key }) => {
      const cellData = list[rowIndex]![columnIndex];
      return (
        <div key={key} style={style}>
          {rowIndex === 0 && columnIndex !== 0 && (
            <CellHeader
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              cell={cellData}
            />
          )}
          {rowIndex === 0 && columnIndex === 0 && (
            <CellHeader
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              cell={cellData}
            />
          )}
          {rowIndex !== 0 && columnIndex === 0 && (
            <CellBrand
              rowIndex={rowIndex}
              cell={cellData}
              handleHover={handleRowHover}
            />
          )}
          {rowIndex !== 0 && columnIndex === 1 && (
            <CellName
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              cell={cellData}
              handleHover={handleRowHover}
              onClick={handleSelectProduct}
            />
          )}
          {rowIndex !== 0 && ![0, 1].includes(columnIndex) && (
            <CellPrice
              handleHover={handleRowHover}
              rowIndex={rowIndex}
              cell={cellData}
            />
          )}
        </div>
      );
    },
    [list, handleRowHover, handleSelectProduct]
  );

  const columnCount = list[0]!.length;
  const rowCount = list.length;

  // infinity scroll is flipped from rows to columns
  // also data is loaded from right to left side of Table
  // const onSectionRendered = (params: RenderedSection) => {
  //   const startIndex = params.columnStartIndex - 5;
  //   const stopIndex = params.columnStopIndex + 5;
  //   isSectionLoaded({ startIndex, stopIndex });
  // };

  const stableColumnWidth = useCallback(
    ({ index, width }: { index: number; width: number }) => {
      if (index === 0) return 140;
      if (index === 1) return 270;

      const staticWidth = 140 + 270;
      const dynamicWidthColumnsCount = columnCount - 2;
      const dynamicWidth = (width - staticWidth) / dynamicWidthColumnsCount;

      if (dynamicWidth > 160) {
        return dynamicWidth;
      }

      return 160;
    },
    [columnCount]
  );

  return (
    <AutoSizer id="autosizer">
      {({ width, height }) => (
        <div id="wrapper">
          <MultiGrid
            id="multigrid"
            list={list}
            hideTopRightGridScrollbar
            hideBottomLeftGridScrollbar
            enableFixedColumnScroll
            enableFixedRowScroll={false}
            fixedRowCount={1}
            fixedColumnCount={2}
            cellRenderer={cellRenderer}
            columnCount={columnCount}
            height={height}
            rowHeight={({ index }) => (index === 0 ? 62 : 48)}
            rowCount={rowCount}
            styleBottomLeftGrid={styles.grid.bottomLeft}
            styleTopLeftGrid={styles.grid.topLeft}
            styleTopRightGrid={styles.grid.topRight}
            width={width}
            columnWidth={({ index }) => stableColumnWidth({ index, width })}
          />
        </div>
      )}
    </AutoSizer>
  );
};
