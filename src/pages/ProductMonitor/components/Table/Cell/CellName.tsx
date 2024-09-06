import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { ProductMonitorCellData } from 'pages/ProductMonitor/types';
import { styled } from '@mui/system';
import { CellWrapper } from './CellWrapper';

interface Props {
  handleHover: (index?: number) => void;
  onClick: (rowIndex: number, columnIndex: number) => void;
  rowIndex: number;
  columnIndex: number;
  cell: ProductMonitorCellData;
}

const Text = styled('span')`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 12px;
  font-weight: 500;
`;

const HoverableCellWrapper = styled(CellWrapper)`
  cursor: pointer;

  &:hover span {
    text-decoration: underline;
  }
`;

export const CellName: React.FC<Props> = ({
  cell,
  rowIndex,
  columnIndex,
  handleHover,
  onClick,
}) => (
  <HoverableCellWrapper
    onMouseEnter={() => handleHover(rowIndex)}
    onMouseLeave={() => handleHover(undefined)}
    onClick={() => onClick(rowIndex, columnIndex)}
    className={`row-index-${rowIndex}`}
    isOdd={rowIndex % 2 === 0}
  >
    {cell && <Text>{cell}</Text>}
    {cell === undefined && <Skeleton width={80} />}
  </HoverableCellWrapper>
);
