import React from 'react';
import { Theme, styled } from '@mui/material';
import { Box, SxProps } from '@mui/system';
import { StatusText } from 'components/StatusIcon/styles';

type StatusColor = 'passed' | 'failed' | string;

interface StatusCellProps {
  $statusColor?: StatusColor;
  $empty?: boolean;
}

const getStatusCellBorderTopColor = (
  theme: Theme,
  statusColor?: StatusColor
) => {
  if (!statusColor) return 'transparent';
  if (statusColor === 'passed') return 'green'; // TODO: add palette
  if (statusColor === 'failed') return 'red';
  return statusColor;
};

const DataGridStatusCell = styled(Box, {
  shouldForwardProp: (props) => props !== '$statusColor' && props !== '$empty',
})<StatusCellProps>`
  border-top: 4px solid
    ${({ theme, $statusColor }) =>
      getStatusCellBorderTopColor(theme, $statusColor)};
  background: ${({ $empty }) =>
    $empty ? '#F4F4F4' : 'rgba(242, 242, 242, 0.5)'};
  border-radius: 5px;
  padding: 10px 3px;
  min-height: 46px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
`;

type DataGridNoDataCellProps = {
  sx: SxProps;
};

const DataGridNoDataCell: React.FC<DataGridNoDataCellProps> = ({ sx }) => {
  return (
    <DataGridStatusCell sx={sx} $empty>
      <StatusText size="large">no data</StatusText>
    </DataGridStatusCell>
  );
};

export { DataGridStatusCell, DataGridNoDataCell };
