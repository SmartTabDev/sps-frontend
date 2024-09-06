/* eslint-disable max-len */
import React from 'react';
import {
  MultiGrid,
  CellMeasurer,
  CellMeasurerCache,
  AutoSizer,
} from 'react-virtualized';
import { formatPercentage } from 'utils/formatPercentage';
import { styled } from '@mui/system';
import { connect, ConnectedProps } from 'react-redux';
import { setSelectedCategoryShareDetails } from 'reducers/categoryShare/actions';
import { setSelectedSearchShareDetails } from 'reducers/searchShare/actions';
import { getCellStyle, styles } from './style';
import { Cell as CategoryCell } from '../../Category/types';
import { Cell as SearchCell } from '../../Search/types';
import { ReactComponent as Badge } from './badge-solid.svg';

const mapDispatchToProps = (dispatch: any) => ({
  setSelectedCategoryShareDetails: (categoryId: any, retailerId: any) =>
    dispatch(setSelectedCategoryShareDetails({ categoryId, retailerId })),
  setSelectedSearchShareDetails: (keywordId: any, retailerId: any) =>
    dispatch(setSelectedSearchShareDetails({ keywordId, retailerId })),
  dispatch,
});

const connector = connect(null, mapDispatchToProps);

export const TableWrapper = styled('div')`
  flex: 1;
  margin: 0 24px 24px 24px;
  box-shadow: 0px -2px 0px rgba(0, 0, 0, 0.02), 0px 4px 16px rgba(0, 0, 0, 0.15);
  border-radius: 15px;
  overflow: hidden;
  position: relative;
  margin-bottom: 12px;

  &::-webkit-scrollbar {
    display: none;
  }

  .ReactVirtualized__Grid {
    &:focus {
      outline: none;
    }
  }
`;

const BaseCell: React.FC = ({ children }) => <div>{children}</div>;

const StyledRetailerCell = styled('div')`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-weight: 700;
  font-size: 14px;
  line-height: 19px;
`;

const RetailerCell: React.FC<{ cell: any }> = ({ children, cell }) => (
  <StyledRetailerCell>
    {children}
    <div style={{ color: cell.meta.color, paddingTop: '5px' }}>
      {formatPercentage(cell.meta.value)}
    </div>
  </StyledRetailerCell>
);

const AVGCell: React.FC<{ cell: any }> = ({ cell }) =>
  cell?.meta?.value >= 0 ? (
    <div
      style={{ color: cell.meta.color, backgroundColor: cell.meta.background }}
    >
      {formatPercentage(cell.meta.value)}
    </div>
  ) : null;

const StyledAVGBgCell = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: none;
  border: 2px solid ${({ theme }) => theme.palette.common.white};
  border-radius: 5px;
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  position: relative;
`;

const StyledPosition = styled('div')`
  color: ${({ theme }) => theme.palette.primary.dark};
  font-weight: 900;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
  position: absolute;
  top: 5px;
  right: 5px;
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const StyledBadge = styled(Badge)`
  fill: ${({ theme }) => theme.palette.common.white};
  position: absolute;
  z-index: -1;
  width: 26px;
  height: 26px;
  right: 0;
  top: 0;
`;

const AVGBgCell = ({ cell }: any) =>
  cell?.meta?.value !== undefined ? (
    <StyledAVGBgCell
      style={{
        background: cell.meta.background || '#F1F1F1',
        color: cell.meta.color,
      }}
    >
      {formatPercentage(cell.meta.value)}
      {cell.meta.position ? (
        <StyledPosition>
          {cell.meta.position}
          <StyledBadge />
        </StyledPosition>
      ) : null}
    </StyledAVGBgCell>
  ) : (
    <StyledAVGBgCell
      style={{
        background: '#F1F1F1',
      }}
    />
  );

const cache = new CellMeasurerCache({
  defaultHeight: 46,
  fixedHeight: true,
  minWidth: 120,
  minHeight: 46,
  keyMapper: (rowIndex, columnIndex) => (columnIndex === 0 ? rowIndex : 1),
});

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {
  type: 'categories' | 'keywords';
  list: (CategoryCell | SearchCell)[][];
  handleOpenModal: () => void;
}

class ShareOfTable extends React.Component<Props, any> {
  multiGridRef: any;

  constructor(props: Props) {
    super(props);

    this.state = {
      fixedColumnCount: 2,
      fixedRowCount: 1,
      scrollToRow: 0,
    };

    this.cellRenderer = this.cellRenderer.bind(this);
    this.multiGridRef = React.createRef();
  }

  // eslint-disable-next-line
  getColumnWidth = (index: any, width: any, columnCount: any) => {
    if (index >= 2) {
      const firstColWidth = cache.columnWidth({ index: 0 });
      const secondColWidth = cache.columnWidth({ index: 1 });
      const staticWidth = firstColWidth + secondColWidth + 16;
      const dynamicWidthColumnsCount = columnCount - 2;
      const dynamicWidth = (width - staticWidth) / dynamicWidthColumnsCount;

      if (dynamicWidth > 120) {
        return dynamicWidth;
      }
    }

    return cache.columnWidth({ index });
  };

  // eslint-disable-next-line
  getRowHeight = (index: any) => {
    if (index === 0) {
      return 64;
    }

    return cache.rowHeight({ index });
  };

  onResize = () => {
    if (this.multiGridRef) {
      this.multiGridRef.current.recomputeGridSize();
    }
  };

  selectCell(keywordid: any, retailerid: any): void {
    const {
      handleOpenModal,
      type,
      setSelectedCategoryShareDetails: firstSet,
      setSelectedSearchShareDetails: secondSet,
    } = this.props;

    if (type === 'categories') {
      firstSet(keywordid, retailerid);
    } else {
      secondSet(keywordid, retailerid);
    }
    handleOpenModal();
  }

  cellRenderer({ columnIndex, key, rowIndex, style, parent }: any) {
    const { list } = this.props;
    const cell = list[rowIndex]![columnIndex];

    return (
      <CellMeasurer
        cache={cache}
        columnIndex={columnIndex}
        key={key}
        parent={parent}
        rowIndex={rowIndex}
      >
        {({ registerChild }) => {
          let Component: any = BaseCell;

          switch (cell?.meta?.type) {
            case 'retailer':
              Component = RetailerCell;
              break;
            case 'avg':
              Component = AVGCell;
              break;
            case 'cell':
              Component = AVGBgCell;
              break;
            default:
              break;
          }

          return (
            <div
              style={{
                ...style,
                ...getCellStyle(columnIndex, rowIndex, cell),
              }}
              ref={registerChild as any}
              onClick={() => {
                if (columnIndex >= 2 && rowIndex !== 0) {
                  const retailerid = list[0]![columnIndex]!.meta?.id;
                  const keywordid = list[rowIndex]![0]!.meta?.id;

                  this.selectCell(keywordid, retailerid);
                }
              }}
              role="none"
            >
              <Component cell={cell}>{cell?.data}</Component>
            </div>
          );
        }}
      </CellMeasurer>
    );
  }

  render() {
    const { list } = this.props;
    const columnCount = list[0]!.length;
    return (
      <>
        <AutoSizer onResize={this.onResize}>
          {({ width, height }: any) => (
            <MultiGrid
              {...this.state}
              {...this.props}
              hideTopRightGridScrollbar
              hideBottomLeftGridScrollbar
              enableFixedColumnScroll
              enableFixedRowScroll={false}
              cellRenderer={this.cellRenderer}
              columnCount={columnCount}
              height={height}
              rowHeight={({ index }) => this.getRowHeight(index)}
              rowCount={list.length}
              style={styles.grid.base}
              styleBottomLeftGrid={styles.grid.bottomLeft as any}
              styleTopLeftGrid={styles.grid.topLeft as any}
              styleTopRightGrid={styles.grid.topRight as any}
              width={width}
              columnWidth={({ index }) =>
                this.getColumnWidth(index, width, columnCount)
              }
              deferredMeasurementCache={cache}
              flexGrow={1}
              ref={this.multiGridRef}
            />
          )}
        </AutoSizer>
      </>
    );
  }
}

export default connector(ShareOfTable);
