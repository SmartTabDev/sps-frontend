import React from 'react';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import Calendar from 'pages/Notifications/icons/Calendar/Calendar';

type Props = {
  value: moment.Moment | null;
  setValue: (value: moment.Moment | null) => void;
  isDisabled: boolean;
} & Pick<DatePickerProps<moment.Moment, moment.Moment>, 'minDate' | 'maxDate'>;

const SelectDay: React.FC<Props> = ({
  value,
  setValue,
  isDisabled,
  minDate,
  maxDate,
}) => (
  <DatePicker
    value={value}
    onChange={(newValue: any) => {
      setValue(newValue);
    }}
    components={{
      OpenPickerIcon: Calendar,
    }}
    label="Select date"
    disabled={isDisabled}
    inputFormat="DD/MM/YYYY"
    minDate={minDate}
    maxDate={maxDate}
    renderInput={(params: any) => (
      <TextField
        {...params}
        variant="filled"
        size="small"
        margin="dense"
        fullWidth
      />
    )}
  />
);

export default SelectDay;
