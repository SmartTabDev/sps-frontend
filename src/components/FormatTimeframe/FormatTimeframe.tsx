import React from 'react';
import { formatShortDate } from 'components/FormatDate/FormatDate';
import { Nullable } from 'types/Utils';
import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

export const FormatTimeframeDate = styled(Typography)`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.palette.primary.main};

  &:empty {
    display: none;
  }
`;

export const formatTimeframe = (
  start: Nullable<moment.Moment>,
  end: Nullable<moment.Moment>
): string => {
  let startDate = '';

  if (start) {
    startDate = start ? formatShortDate(start, true) : '';
  }

  if (start && start === end) {
    return formatShortDate(start, true);
  }

  return `${startDate}${start && ' - '}${
    end ? formatShortDate(end, true) : ''
  }`;
};

type Props = {
  start: Nullable<moment.Moment>;
  end: Nullable<moment.Moment>;
};

const FormatTimeframe: React.FC<Props> = ({ start, end }) => {
  const timeframe = formatTimeframe(start, end);

  return <>{timeframe}</>;
};

export default FormatTimeframe;
