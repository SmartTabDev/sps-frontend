import React from 'react';
import { styled } from '@mui/system';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { InputProps } from '@mui/material/Input';
import DateRangeIcon from '@mui/icons-material/DateRange';
import moment from 'moment';
import { formatTimeframe } from 'components/FormatTimeframe/FormatTimeframe';

const StyledTextField = styled(TextField)`
  min-width: 300px;
  width: 100%;

  input {
    cursor: pointer;
  }
`;

type Props = {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  textFieldProps?: TextFieldProps;
  inputProps?: InputProps;
  onClick?: () => void;
};

const DateInput: React.FC<Props> = ({
  startDate,
  endDate,
  textFieldProps = {},
  inputProps = {},
  onClick,
}) => (
  <StyledTextField
    {...textFieldProps}
    label="Timeframe"
    InputProps={{
      ...inputProps,
      readOnly: true,
      endAdornment: (
        <InputAdornment position="end">
          <DateRangeIcon
            style={{ fontSize: 16 }}
            sx={{ color: 'text.primary' }}
          />
        </InputAdornment>
      ),
    }}
    value={formatTimeframe(startDate, endDate)}
    size="small"
    variant="outlined"
    onClick={onClick}
  />
);

export default DateInput;
