import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { ProductMonitorCellData } from 'pages/ProductMonitor/types';
import { styled } from '@mui/system';
import { CellWrapper } from './CellWrapper';

interface Props {
  handleHover: (index?: number) => void;
  rowIndex: number;
  cell: ProductMonitorCellData;
}

const Text = styled('span')`
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
  font-weight: 500;
`;

export const CellBrand: React.FC<Props> = ({ cell, rowIndex, handleHover }) => (
  <CellWrapper
    onMouseEnter={() => handleHover(rowIndex)}
    onMouseLeave={() => handleHover(undefined)}
    className={`row-index-${rowIndex}`}
    isOdd={rowIndex % 2 === 0}
  >
    {cell && <Text>{cell}</Text>}
    {cell === undefined && <Skeleton width={80} />}
  </CellWrapper>
);
