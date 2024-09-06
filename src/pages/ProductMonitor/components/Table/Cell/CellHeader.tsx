import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { ProductMonitorCellData } from 'pages/ProductMonitor/types';
import { styled } from '@mui/system';
import { CellWrapper } from './CellWrapper';

interface Props {
  rowIndex: number;
  columnIndex: number;
  cell: ProductMonitorCellData;
}

const Text = styled('span')`
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
  font-weight: 500;
  text-align: center;
  color: #3b455e;
`;

const CellWrapperHeader = styled(CellWrapper)`
  border-bottom: 1px solid transparent;
  align-items: flex-end;
  padding-bottom: 10px;
`;

export const CellHeader: React.FC<Props> = ({
  cell,
  columnIndex,
  rowIndex, // columnIndex, handleHover, onClick,
}) => (
  <CellWrapperHeader
    center={![0, 1].includes(columnIndex)}
    className={`row-index-${rowIndex}`}
    isOdd={rowIndex % 2 === 0}
  >
    {cell && <Text>{cell}</Text>}
    {cell === undefined && <Skeleton width={80} />}
  </CellWrapperHeader>
);
