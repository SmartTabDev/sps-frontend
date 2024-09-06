import React from 'react';
import moment2 from 'moment';
import { DateCell } from 'components/Table/DateCell';
import { DateRange, extendMoment } from 'moment-range';
import NavCell from 'components/Table/NavCell';
import { FormatShortDate } from 'components/FormatDate/FormatDate';

const moment = extendMoment(moment2 as any);
type Moment = moment2.Moment;

const getDaysFromRange = (range: DateRange) => Array.from(range.by('day', { excludeEnd: true }));

export const getInitialTimeRange = (): Moment[] => {
  const start = moment(Date.now()).startOf('day');
  const end = moment(Date.now()).endOf('day');
  const range = moment.range([start.subtract(7, 'days'), end]);

  return getDaysFromRange(range);
};

export const getAvailabilityHistoryRange = (
  dateRange: Moment[],
): Moment[] => [
  dateRange[0] as Moment,
  moment(dateRange[dateRange.length - 1]).add(1, 'days'),
];

const getPrevDates = (dateRange: Moment[]) => {
  const range = moment.range([
    moment(dateRange[0]).subtract(7, 'days'),
    moment(dateRange[0]),
  ]);
  return getDaysFromRange(range);
};

const getNextDates = (dateRange: Moment[]) => {
  const range = moment.range([
    moment(dateRange[dateRange.length - 1]).add(1, 'days'),
    moment(dateRange[dateRange.length - 1]).add(8, 'days'),
  ]);
  return getDaysFromRange(range);
};

const isNavNextDisabled = (dateRange: Moment[]) => {
  const result = moment(Date.now()).isSame(
    moment(dateRange[dateRange.length - 1]).add(1, 'day'),
    'day',
  );
  return result;
};

type Props = {
  setDateRange: (dateRange: Moment[]) => void;
  dateRange: Moment[];
};

export const DateRangeTableHead: React.FC<Props> = ({
  setDateRange,
  dateRange,
}) => (
  <>
    <NavCell
      direction="prev"
      onClick={() => setDateRange(getPrevDates(dateRange))}
    />

    {dateRange.map((date, index) => (
      <DateCell key={`date-cell_${index}`}>
        <FormatShortDate>{date}</FormatShortDate>
      </DateCell>
    ))}

    <NavCell
      direction="next"
      disabled={isNavNextDisabled(dateRange)}
      onClick={() => setDateRange(getNextDates(dateRange))}
    />

    <DateCell primary>
      <FormatShortDate year>{moment(Date.now())}</FormatShortDate>
    </DateCell>
  </>
);
