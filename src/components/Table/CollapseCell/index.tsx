import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import TableCell from '@mui/material/TableCell';

export type CollapseCellProps = {
  colSpan: number;
  isOpen: boolean;
  timeOut?:
    | 'auto'
    | number
    | { appear?: number; enter?: number; exit?: number };
  height: number;
  [key: string]: any;
};

const CollapseCell: React.FC<CollapseCellProps> = ({
  children,
  colSpan,
  isOpen,
  timeOut = 'auto',
  height,
  ...props
}) => (
  <TableCell style={{ padding: 0 }} colSpan={colSpan}>
    <Collapse in={isOpen} timeout={timeOut} unmountOnExit>
      <Box height={height} {...props}>{children}</Box>
    </Collapse>
  </TableCell>
);

export default CollapseCell;
