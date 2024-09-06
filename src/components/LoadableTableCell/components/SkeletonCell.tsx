import { Skeleton } from '@mui/material';
import React from 'react';

interface SkeletonCellProps {
  height?: string | number;
  minWidth?: string | number;
}

const SkeletonCell = ({ height, minWidth }: SkeletonCellProps) => {
  return (
    <Skeleton
      sx={{
        height,
        minWidth,
      }}
    />
  );
};

export default SkeletonCell;
