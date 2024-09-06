import React, { useCallback, useMemo } from 'react';
import { Cell as CellType } from 'types/SPSTable';
import Skeleton from '@mui/material/Skeleton';
import PriceCell from './PriceCell/PriceCell';
import RetailerCell from './RetailerCell/RetailerCell';
import DateCell from './DateCell/DateCell';
import { getCellStyle } from '../../style';
import IndexCell from './IndexCell/IndexCell';

const calcRSP = (rrp: number | undefined, price: string | undefined) => {
  const nPrice = Number((price || '').replace(',', '.'));

  if (!price || !rrp || nPrice === 0) {
    return {
      isMissingData: true,
      value: undefined,
    };
  }

  const ind = (1 - (rrp - (nPrice || 0)) / rrp) * 100;

  if (Number.isNaN(ind)) {
    return {
      isMissingData: true,
      value: undefined,
    };
  }

  return {
    isMissingData: false,
    value: Number(ind.toFixed(0)),
  };
};

const Cell: React.FC<{
  cell: CellType;
  isDense: boolean;
  isIndex: boolean;
  productNameLink: boolean;
}> = ({ cell, isDense, isIndex, productNameLink }) => {
  if (cell) {
    if (cell.kind === 'date') {
      const { data } = cell;

      return <DateCell date={data} isVisible withHour={false} />;
    }

    if (cell.kind === 'date-hour') {
      const { data } = cell;
      const { isFirstDate, isLastDate } = cell.meta;

      return (
        <DateCell
          date={data}
          isVisible={isFirstDate || isLastDate}
          withHour={cell.kind === 'date-hour'}
        />
      );
    }

    if (cell.kind === 'retailer') {
      const { data } = cell;
      const { url } = cell.meta || {};

      return (
        <RetailerCell url={url} showCursor={productNameLink}>
          <>{data}</>
        </RetailerCell>
      );
    }

    if (cell.kind === 'product') {
      const { data } = cell;

      return (
        <RetailerCell showCursor={false}>
          <>{data}</>
        </RetailerCell>
      );
    }

    if (cell.kind === 'price') {
      const { data } = cell;
      const {
        available,
        isNA,
        isHigher,
        isLower,
        regularPrice,
        isHighest,
        rrp,
      } = cell.meta;

      const { value, isMissingData } = calcRSP(rrp, data);

      return (
        <>
          {isIndex ? (
            <IndexCell value={value} noData={isMissingData} />
          ) : (
            <PriceCell
              price={data}
              available={available || false}
              isNA={isNA}
              isHigher={isHigher}
              isLower={isLower}
              isDense={isDense}
              regularPrice={regularPrice}
              isHighest={isHighest}
            />
          )}
        </>
      );
    }
  }

  return <></>;
};

type CellWrapperProps = {
  cell?: CellType;
  columnIndex: number;
  handleHover: (index?: number) => void;
  isDense: boolean;
  isIndex: boolean;
  productNameLink: boolean;
  registerChild?: any;
  rowIndex: number;
  selectProduct: (rowIndex: number, columnIndex: number) => void;
  style: React.CSSProperties;
};

const CellWrapper: React.FC<CellWrapperProps> = ({
  cell,
  columnIndex,
  handleHover,
  isDense,
  isIndex,
  productNameLink,
  registerChild,
  rowIndex,
  selectProduct,
  style,
}) => {
  const cellStyle = useMemo(
    () => getCellStyle(columnIndex, rowIndex, cell),
    [columnIndex, rowIndex, cell]
  );

  const finalStyle = {
    ...cellStyle,
    ...style,
  };

  const handleMouseEnter = useCallback(() => {
    if (handleHover) {
      handleHover(rowIndex);
    }
  }, [handleHover, rowIndex]);

  const handleMouseLeave = useCallback(() => {
    if (handleHover) {
      handleHover(undefined);
    }
  }, [handleHover]);

  const onClick = useCallback(() => {
    selectProduct(rowIndex, columnIndex);
  }, [selectProduct, rowIndex, columnIndex]);

  return (
    <div
      style={finalStyle}
      className={columnIndex > 0 ? `row-index-${rowIndex}` : ''}
      ref={registerChild}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="presentation"
      onClick={onClick}
    >
      {cell ? (
        <Cell
          cell={cell}
          productNameLink={productNameLink}
          isDense={isDense}
          isIndex={isIndex}
        />
      ) : (
        <Skeleton width={40} />
      )}
    </div>
  );
};

export default CellWrapper;
