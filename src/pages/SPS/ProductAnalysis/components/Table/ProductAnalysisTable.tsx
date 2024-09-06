import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AutoSizer, IndexRange, MultiGrid } from 'react-virtualized';
import { setSelectedProduct } from 'reducers/productAnalysis/actions';
import { styled } from '@mui/system';
import { PriceCell, RetailerCell, Row } from 'types/SPSTable';
import { styles } from 'pages/SPS/components/Table/style';
import { RenderedSection } from 'react-virtualized/dist/es/Grid';
import Cell from '../../../components/Table/components/Cell/Cell';

const TableWrapper = styled('div')`
  flex: 1;
  margin: 0 24px 24px 24px;
  box-shadow: 0px -2px 0px rgba(0, 0, 0, 0.02), 0px 4px 16px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  overflow: hidden;
  position: relative;

  > div > div {
    border-top: initial !important;
  }

  .ReactVirtualized__Grid {
    &:focus {
      outline: none;
    }
  }
`;

interface ProductAnalysisTableProps {
  list: (Row | undefined[])[];
  handleOpenModal: (productid: number) => void;
  isSectionLoaded: (params: IndexRange) => Promise<void>;
  handleRowHover: (index?: number) => void;
  productNameLink: boolean;
  isDense: boolean;
  isIndex: boolean;
}

export const ProductAnalysisTable: React.FC<ProductAnalysisTableProps> = ({
  list,
  handleOpenModal,
  isSectionLoaded,
  handleRowHover,
  productNameLink,
  isDense,
  isIndex,
}) => {
  const dispatch = useDispatch();
  const linksMap = useSelector((state) => state.config.sps.linksMap);
  const rrpMap = useSelector((state) => state.config.sps.rrpMap);

  const handleSelectProduct = useCallback(
    (rowIndex: number, columnIndex: number) => {
      const isTableBody = columnIndex !== 1 && rowIndex !== 0;
      const row = list[rowIndex];

      if (isTableBody && row) {
        // it should be index for product column
        const firstCell = row[0];

        if (firstCell) {
          const productid = (firstCell as RetailerCell).meta?.productid;

          if (productid) {
            dispatch(setSelectedProduct(productid));
            handleOpenModal(productid);
          }
        }
      }
    },
    [dispatch, handleOpenModal, list]
  );

  const cellRenderer = useCallback(
    ({ columnIndex, rowIndex, style, key }) => {
      const cell = list[rowIndex]![columnIndex];
      let finalCell = cell;

      // get url for product
      if (cell !== undefined && cell.kind === 'retailer') {
        const retailerCell: RetailerCell = cell as RetailerCell;

        if (retailerCell.meta?.retailerid && retailerCell.meta?.productid) {
          finalCell = {
            ...retailerCell,
            meta: {
              ...retailerCell.meta,
              url: linksMap[
                `${retailerCell.meta!.retailerid}-${
                  retailerCell.meta!.productid
                }`
              ],
            },
          } as RetailerCell;
        }
      }

      // get rrp for product
      if (cell !== undefined && cell.kind === 'price') {
        const priceCell: PriceCell = cell as PriceCell;

        if (priceCell.meta?.retailerid && priceCell.meta?.productid) {
          finalCell = {
            ...priceCell,
            meta: {
              ...priceCell.meta,
              rrp: rrpMap[`${priceCell.meta!.productid}`],
            },
          } as PriceCell;
        }
      }

      return (
        <Cell
          handleHover={handleRowHover}
          selectProduct={handleSelectProduct}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
          cell={finalCell}
          style={style}
          key={key}
          productNameLink={productNameLink}
          isDense={isDense}
          isIndex={isIndex}
        />
      );
    },
    [
      handleRowHover,
      handleSelectProduct,
      isDense,
      isIndex,
      linksMap,
      list,
      productNameLink,
      rrpMap,
    ]
  );

  const columnCount = list[0]!.length;
  const rowCount = list.length;

  // infinity scroll is flipped from rows to columns
  // also data is loaded from right to left side of Table
  const onSectionRendered = (params: RenderedSection) => {
    const { columnStartIndex, columnStopIndex } = params;
    const startIndex = columnStartIndex - 5;
    const stopIndex = columnStopIndex + 5;
    const args = { startIndex, stopIndex };
    isSectionLoaded(args);
  };

  const columnWidth = ({ index }: { index: number }): number => {
    if (index === 0) return 250;
    if (index === 1) return 130;

    return 130;
  };

  return (
    <TableWrapper>
      <AutoSizer>
        {({ width, height }) => (
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
            onSectionRendered={onSectionRendered}
            rowCount={rowCount}
            rowHeight={isDense ? 38 : 60}
            scrollToColumn={list[0]?.length}
            scrollToRow={0}
            style={styles.grid.base}
            styleBottomLeftGrid={styles.grid.bottomLeft}
            styleTopLeftGrid={styles.grid.topLeft}
            styleTopRightGrid={styles.grid.topRight}
            width={width}
          />
        )}
      </AutoSizer>
    </TableWrapper>
  );
};
