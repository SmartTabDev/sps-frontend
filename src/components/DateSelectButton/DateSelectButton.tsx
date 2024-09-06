import { KeyboardArrowDownSharp } from '@mui/icons-material';
import { Stack, Box } from '@mui/material';
import FormatTimeframe, {
  FormatTimeframeDate,
} from 'components/FormatTimeframe/FormatTimeframe';
import { Moment } from 'moment';
import React from 'react';
import { Nullable } from 'types/Utils';

interface DateSelectButtonProps {
  onClick: () => void;
  startDate: Nullable<Moment>;
  endDate: Nullable<Moment>;
}

const DateSelectButton = ({
  onClick,
  startDate,
  endDate,
}: DateSelectButtonProps) => {
  return (
    <Box onClick={onClick}>
      <FormatTimeframeDate as="div">
        <Stack direction="row" alignItems="center" sx={{ cursor: 'pointer' }}>
          <FormatTimeframe start={startDate} end={endDate} />
          <KeyboardArrowDownSharp sx={{ width: '18px', ml: '12px' }} />
        </Stack>
      </FormatTimeframeDate>
    </Box>
  );
};

export default DateSelectButton;
