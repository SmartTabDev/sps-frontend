/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { TableCell, TableCellProps } from '@mui/material';
import SkeletonCell from './components/SkeletonCell';

interface SkeletonSize {
  minWidth?: number | string;
  height?: number | string;
}

interface LoadableTableCellProps extends TableCellProps {
  loading?: boolean;
  skeletonSize?: SkeletonSize;
}

const LoadableTableCell: FC<LoadableTableCellProps> = ({
  skeletonSize = {},
  loading,
  children,
  ...props
}) => {
  const { height, minWidth } = skeletonSize;
  return (
    <TableCell {...props}>
      {loading ? (
        <SkeletonCell height={height} minWidth={minWidth} />
      ) : (
        children
      )}
    </TableCell>
  );
};

export default LoadableTableCell;
