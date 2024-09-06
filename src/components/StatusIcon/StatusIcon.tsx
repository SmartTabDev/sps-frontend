import React from 'react';
import { CheckOutlined, DangerousOutlined } from '@mui/icons-material';
import { useTheme } from '@mui/system';
import { StatusText, IconContainer } from './styles';

type Props = {
  match: number | undefined;
  size?: 'small' | 'large';
  statusSize?: 'small' | 'large';
};

const StatusIcon = ({ match, size = 'small', statusSize }: Props) => {
  const theme = useTheme();

  if (match === undefined) {
    return <StatusText size={statusSize || size}>no data</StatusText>;
  }

  const Icon = match === 1 ? CheckOutlined : DangerousOutlined;

  return (
    <IconContainer size={size}>
      <Icon
        sx={{
          color: theme.palette.blueGrey[400],
        }}
      />
    </IconContainer>
  );
};

export default StatusIcon;
