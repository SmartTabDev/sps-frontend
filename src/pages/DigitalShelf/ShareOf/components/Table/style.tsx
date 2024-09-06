const boldText = {
  fontWeight: '700',
};

const baseGrid = {
  //
};

const bottomLeftGrid = {
  backgroundColor: '#ffffff',
  boxShadow: '2px 0px 4px rgba(0, 0, 0, 0.25)',
  zIndex: '2',
};

const topLeftGrid = {
  backgroundColor: '#ffffff',
  zIndex: 999,
  boxShadow: '2px 0px 4px rgba(0, 0, 0, 0.25)',
  clipPath: 'inset(0px -15px 0px -15px)',
};

const topRightGrid = {
  fontWeight: 'bold',
  borderBottom: '2px solid #E0E0E0',
};

const leftGrid = {
  padding: '0 10px',
  overflow: 'hidden',
};

const titleCell = {
  fontSize: '14px',
  lineHeight: '19px',
};

const oddCell = {
  background: '#f6f7f8',
};

const baseCell = {
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  fontSize: '12px',
  boxSizing: 'border-box',
  zIndex: 1,
};

const keywordCell = {
  ...leftGrid,
  fontSize: '12px',
  fontWeight: '600',
  lineHeight: '17px',
  whiteSpace: 'nowrap',
};

const keywordHeader = {
  whiteSpace: 'nowrap',
};

const flexCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const avgCell = {
  fontSize: '12px',
  fontWeight: '900',
  lineHeight: '17px',
  ...flexCenter,
};

const avgHeader = {
  ...flexCenter,
};

const firstColumn = {
  paddingLeft: '30px',
};

const headerRow = {
  ...boldText,
  ...titleCell,
  borderBottom: '2px solid #E0E0E0',
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
    keyword: keywordCell,
    avg: avgCell,
    odd: oddCell,
  },
  header: {
    avg: avgHeader,
    keyword: keywordHeader,
  },
  column: {
    first: firstColumn,
  },
  row: {
    header: headerRow,
  },
};

const style = (challenge: boolean, passed: any) => (challenge ? passed : {});

export const getCellStyle = (
  columnIndex: number,
  rowIndex: number,
  cell: any,
) => {
  const isFirstRow = rowIndex === 0;
  const isFirstCol = columnIndex === 0;
  const isContentRow = rowIndex > 0;
  const isAvgColumn = columnIndex === 1;
  const isAvgCell = isAvgColumn && isContentRow;
  const isAvgHeader = isAvgColumn && isFirstRow;
  const isKeywordCell = isFirstCol && isContentRow;
  const isKeywordHeader = isFirstCol && isFirstRow;
  const isOdd = cell?.meta?.isOdd;
  const isLeftGrid = columnIndex === 0 || columnIndex === 1;
  const isContent = isContentRow && columnIndex > 1;

  return {
    ...styles.cell.base,
    ...style(isLeftGrid, styles.grid.left),
    ...style(isFirstRow && isLeftGrid, styles.row.header),
    ...style(isKeywordCell, styles.cell.keyword),
    ...style(isKeywordHeader, styles.header.keyword),
    ...style(isAvgCell, styles.cell.avg),
    ...style(isAvgHeader, styles.header.avg),
    ...style(isFirstCol, styles.column.first),
    ...style(isFirstCol, styles.column.first),
    ...style(isOdd, styles.cell.odd),
    ...style(isContent, { cursor: 'pointer' }),
  };
};
