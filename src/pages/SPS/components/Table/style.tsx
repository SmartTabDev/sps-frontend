const boldText = {
  fontWeight: '600',
};

const primaryText = {
  color: '#447eeb',
};

const hiddenText = {
  textIndent: '-999px',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

const baseGrid = {
  borderTop: '1px solid #bdbdbd',
};

const bottomLeftGrid = {
  backgroundColor: '#ffffff',
  boxShadow: '4px 2px 5px rgba(82, 95, 129, 0.1)',
  zIndex: 2,
};

const topLeftGrid = {
  backgroundColor: '#ffffff',
  zIndex: 1,
  boxShadow: 'rgba(82, 95, 129, 0.1) 4px 2px 5px',
};

const topRightGrid = {
  fontWeight: 500,
};

const leftGrid = {
  paddingTop: '0',
  paddingBottom: '0',
  paddingLeft: '10px',
  paddingRight: '10px',
  justifyContent: 'flex-start',
  overflow: 'hidden',
};

const titleCell = {
  fontSize: '12px',
  lineHeight: '16px',
};

const lastRow = {
  borderBottom: '1px solid transparent',
};

const oddCell = {
  background: '#F1F6FD',
};

const baseCell = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '12px',
  boxSizing: 'border-box',
  background: 'white',
  zIndex: 1,
  color: '#3B455E',
  borderBottom: '1px solid #CDDAEB',
  fontWeight: '500',
};

const retailerCell = {
  ...titleCell,
  ...leftGrid,
  fontWeight: '500',
};

const productNameMediumText = {
  fontSize: '12px',
  lineHeight: '14px',
};

const productNameSmallText = {
  fontSize: '10px',
  lineHeight: '11px',
};

const productNameCell = {
  ...primaryText,
  ...boldText,
  ...titleCell,
  borderBottom: 'none',
};

const productNameMediumCell = {
  ...primaryText,
  ...boldText,
  ...productNameMediumText,
};

const productNameSmallCell = {
  ...primaryText,
  ...boldText,
  ...productNameSmallText,
};

const firstColumn = {
  paddingLeft: '20px',
};

const headerRow = {
  ...titleCell,
  textTransform: 'uppercase',
  fontSize: '12px',
  fontWeight: 600,
};

export const styles = {
  grid: {
    base: baseGrid,
    bottomLeft: bottomLeftGrid,
    topLeft: topLeftGrid,
    topRight: topRightGrid,
    left: leftGrid,
  },
  cell: {
    base: baseCell,
    retailer: retailerCell,
    productName: productNameCell,
    productNameMedium: productNameMediumCell,
    productNameSmall: productNameSmallCell,
    odd: oddCell,
  },
  columns: {
    first: firstColumn,
  },
  rows: {
    header: headerRow,
  },
};

const style = (challenge: boolean, passed: any) => (challenge ? passed : {});

export const getCellStyle = (
  columnIndex: number,
  rowIndex: number,
  cell: any
): React.CSSProperties => {
  const isFirstCol = columnIndex === 0;
  const isProductRow = rowIndex > 0;
  const isRetailerColumn = columnIndex === 1;
  const isRetailerCell = isRetailerColumn && isProductRow;
  const isProductNameCell = isFirstCol && isProductRow;
  const isFirstRow = rowIndex === 0;
  const isFirst = cell?.meta?.isFirst;
  const isFirstProductNameCell = isProductNameCell && isFirst;
  const isLast = cell?.meta?.isLast;
  const isOdd = cell?.meta?.isOdd;
  const isLeftGrid = columnIndex === 0 || columnIndex === 1;
  const isSmallText =
    isFirstProductNameCell && cell?.meta?.textSize === 'small';
  const isMediumText =
    isFirstProductNameCell && cell?.meta?.textSize === 'medium';
  const isNormalText =
    isFirstProductNameCell && cell?.meta?.textSize === 'normal';

  return {
    ...styles.cell.base,
    ...style(isLeftGrid, styles.grid.left),
    ...style(isFirstRow && isLeftGrid, styles.rows.header),
    ...style(isProductNameCell, styles.cell.productName),
    ...style(isNormalText, styles.cell.productName),
    ...style(isMediumText, styles.cell.productNameMedium),
    ...style(isSmallText, styles.cell.productNameSmall),
    ...style(isProductNameCell && !isFirst, hiddenText),
    ...style(isRetailerCell, styles.cell.retailer),
    ...style(isFirstCol, styles.columns.first),
    ...style(isOdd, styles.cell.odd),
    ...style(isLast, lastRow),
  };
};
