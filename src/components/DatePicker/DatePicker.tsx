import React, { useState } from 'react';
import { Box } from '@mui/material';
import 'libs/react-dates/react_dates_overrides.css';
import moment from 'moment-timezone';
import DateSelectButton from 'components/DateSelectButton/DateSelectButton';
import { SingleDatePicker, SingleDatePickerShape } from 'react-dates';
import { SingleDatePickerPhrases } from 'libs/react-dates/defaultPhrases.js';
import { getSharedDatePickersProps } from 'libs/react-dates/sharedDatePickersProps';
import { Nullable } from 'types/Utils';
import { DatePickerWrapper } from './styles';

interface DatePickerProps {
  initialDate: Nullable<moment.Moment>;
  onDateChangeCallback: (date: moment.Moment) => void;
}

const DatePicker = ({ initialDate, onDateChangeCallback }: DatePickerProps) => {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [open, setOpen] = useState(false);

  const defaultDatePickerProps =
    getSharedDatePickersProps() as Partial<SingleDatePickerShape>;

  const onButtonClick = () => {
    if (!open) {
      setOpen(true);
    }
  };

  const onDateChange = (date: moment.Moment | null) => {
    if (!date) return;
    setCurrentDate(date);
    onDateChangeCallback(date);
  };

  const onFocusChange = ({ focused }: { focused: boolean }) => {
    setOpen(focused);
  };

  return (
    <Box>
      <DateSelectButton
        onClick={onButtonClick}
        startDate={currentDate}
        endDate={currentDate}
      />
      <DatePickerWrapper>
        <SingleDatePicker
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...defaultDatePickerProps}
          id="selectedDate"
          phrases={SingleDatePickerPhrases}
          date={currentDate}
          focused={open}
          onDateChange={onDateChange}
          onFocusChange={onFocusChange}
        />
      </DatePickerWrapper>
    </Box>
  );
};

export default DatePicker;
