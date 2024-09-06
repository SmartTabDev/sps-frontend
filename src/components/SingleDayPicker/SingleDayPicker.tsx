import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import moment from 'moment';
import { SingleDatePicker, isInclusivelyBeforeDay } from 'react-dates';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Nullable } from 'types/Utils';
import { FormatShortDate } from '../FormatDate/FormatDate';

const Visible = styled('div')`
  position: relative;
`;

const StyledSingleDatePickerWrapper = styled('div')`
  position: absolute;
  z-index: 3;
  top: 0;
  color: ${({ theme }) => theme.palette.primary.main};

  .DateInput_input {
    opacity: 0;
  }
`;

const StyledButton = styled(Button)`
  z-index: 4;
  padding: 0;
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 22px;

  svg {
    font-size: 22px !important;
  }

  &:hover {
    background-color: transparent;
  }
`;

const StyledDate = styled(Typography)`
  line-height: 40px;
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: 600;
  font-size: 16px;
  text-transform: initial;

  &:empty {
    display: none;
  }
`;

type Props = {
  onDateChange?: (date: moment.Moment) => void;
  date: moment.Moment;
  outsideRangeDate?: moment.Moment;
};

const SingleDayPicker: React.FC<Props> = ({
  onDateChange,
  date: initialDate,
  outsideRangeDate,
}): JSX.Element => {
  const [isFocused, setFocused] = useState<boolean>(false);
  const [date, setDate] = useState<Nullable<moment.Moment>>(initialDate);

  const handleDateChange = (val: moment.Moment | null) => {
    setDate(val);

    if (typeof onDateChange === 'function' && val !== null) {
      onDateChange(val);
    }
  };

  const onButtonClick = () => {
    if (!isFocused) {
      setFocused(true);
    }
  };

  const onFocusChange = ({ focused }: { focused: boolean }) => {
    setTimeout(() => {
      setFocused(focused);
    }, 0);
  };

  useEffect(() => {
    setDate(initialDate);
  }, [initialDate]);

  if (!date) {
    return <></>;
  }

  return (
    <Visible>
      <StyledButton
        disableTouchRipple
        onClick={onButtonClick}
        endIcon={isFocused ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      >
        <StyledDate variant="h4">
          <FormatShortDate year>{date}</FormatShortDate>
        </StyledDate>
      </StyledButton>

      <StyledSingleDatePickerWrapper>
        <SingleDatePicker
          id="modvise-single-date-picker"
          date={date}
          focused={isFocused}
          onDateChange={handleDateChange}
          onFocusChange={onFocusChange}
          small
          readOnly
          noBorder
          numberOfMonths={1}
          daySize={40}
          hideKeyboardShortcutsPanel
          isOutsideRange={(day: moment.Moment) =>
            !isInclusivelyBeforeDay(day, moment(outsideRangeDate || new Date()))
          }
        />
      </StyledSingleDatePickerWrapper>
    </Visible>
  );
};

export default SingleDayPicker;
