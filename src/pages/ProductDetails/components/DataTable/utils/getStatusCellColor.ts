export const getStatusCellColor = (cellValue?: unknown) => {
  if (cellValue === undefined) return 'transparent';
  if (cellValue) return 'passed';
  return 'failed';
};
