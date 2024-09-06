import React, { useState } from 'react';
import 'libs/react-dates/react_dates_overrides.css';
import moment from 'moment-timezone';
import {
  DateRangePicker,
  FocusedInputShape,
  DateRangePickerShape,
} from 'react-dates';
import { styled } from '@mui/system';
// import DateInput from 'components/DateInput';
import { Nullable } from 'types/Utils';
import { DateRange } from 'reducers/productComparison/productComparison';
import { getTimeframe } from 'utils/dates/moment/getTimeframe';
import DateSelectButton from 'components/DateSelectButton/DateSelectButton';
import { DateRangePickerPhrases } from 'libs/react-dates/defaultPhrases.js';
import { getSharedDatePickersProps } from 'libs/react-dates/sharedDatePickersProps';

const defaultProps =
  getSharedDatePickersProps() as Partial<DateRangePickerShape>;

const Visible = styled('div')`
  position: relative;
`;

const StyledDatePickerWrapper = styled('div')`
  position: absolute;
  top: -20px;
  color: ${({ theme }) => theme.palette.primary.main};

  .DateRangePickerInput {
    border: none;
    width: 0;
    height: 0;

    > *:not(.DateRangePicker_picker) {
      opacity: 0;
      pointer-events: none;
    }
  }
`;

// const StyledDateInput = styled(DateInput)`
//   z-index: 4;
// `;

type Props = {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  setDateRange: (dateRange: DateRange) => void;
};

const CustomDateRangePicker: React.FC<Props> = ({
  startDate: start,
  endDate: end,
  setDateRange,
}) => {
  const [focusedInput, setFocusedInput] =
    useState<Nullable<FocusedInputShape>>(null);

  const [startDate, setStartDate] = useState<Nullable<moment.Moment>>(start);
  const [endDate, setEndDate] = useState<Nullable<moment.Moment>>(end);

  const onDatesChange = (arg: {
    startDate: Nullable<moment.Moment>;
    endDate: Nullable<moment.Moment>;
  }) => {
    const { startDate: from, endDate: to } = arg;
    setStartDate(from);
    setEndDate(to);

    const [timeframeStart, timeframeEnd] = getTimeframe([
      from ? from.toString() : null,
      to ? to.toString() : null,
    ]);

    setDateRange({
      startDate: timeframeStart,
      endDate: timeframeEnd,
    });
  };

  const onFocusChange = (val: Nullable<FocusedInputShape>) => {
    setFocusedInput(val);
  };

  const onButtonClick = () => {
    setFocusedInput('startDate');
  };

  return (
    <Visible>
      <DateSelectButton
        onClick={onButtonClick}
        startDate={startDate}
        endDate={endDate}
      />
      {/* <StyledDateInput
        onClick={onButtonClick}
        startDate={startDate}
        endDate={endDate}
      /> */}
      <StyledDatePickerWrapper>
        <DateRangePicker
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...defaultProps}
          startDateId="startDate"
          startDatePlaceholderText="Start Date"
          endDateId="endDate"
          endDatePlaceholderText="End Date"
          onDatesChange={onDatesChange}
          onFocusChange={onFocusChange}
          phrases={DateRangePickerPhrases}
          startDate={startDate}
          endDate={endDate}
          focusedInput={focusedInput}
        />
      </StyledDatePickerWrapper>
    </Visible>
  );
};

export default CustomDateRangePicker;
