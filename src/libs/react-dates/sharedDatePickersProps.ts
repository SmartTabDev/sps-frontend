import moment, { Moment } from 'moment';
import {
  AnchorDirectionShape,
  DateRangePickerShape,
  NavPositionShape,
  OrientationShape,
  SingleDatePickerShape,
  isInclusivelyBeforeDay,
} from 'react-dates';

export const getSharedDatePickersProps = (): Partial<
  SingleDatePickerShape | DateRangePickerShape
> => {
  return {
    disabled: false,
    required: false,
    screenReaderInputMessage: '',
    showClearDates: true,
    showDefaultInputIcon: false,
    customInputIcon: null,
    customArrowIcon: null,
    customCloseIcon: null,
    block: true,
    small: false,
    regular: false,

    renderMonthText: null,
    orientation: 'horizontal' as OrientationShape,
    anchorDirection: 'left' as AnchorDirectionShape,
    horizontalMargin: 0,
    withPortal: false,
    withFullScreenPortal: false,
    initialVisibleMonth: null,
    numberOfMonths: 1,
    keepOpenOnDateSelect: false,
    reopenPickerOnClearDates: false,
    isRTL: false,
    daySize: 40,
    hideKeyboardShortcutsPanel: true,

    navPosition: 'navPositionTop' as NavPositionShape,
    navPrev: null,
    navNext: null,

    renderCalendarDay: undefined,
    renderDayContents: null,
    minimumNights: 0,
    enableOutsideDays: false,
    isDayBlocked: () => false,
    isOutsideRange: (day: Moment) =>
      !isInclusivelyBeforeDay(day, moment(Date.now())),
    isDayHighlighted: () => false,

    displayFormat: 'DD-MM-YYYY',
    monthFormat: 'MMMM YYYY',
  };
};
