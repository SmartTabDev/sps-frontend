import React from 'react';
import moment from 'moment-timezone';

// DATE MONTH YEAR
const SHORT_DMY_FORMAT = 'DD MMM YYYY';
const FULL_DMY_FORMAT = 'DD MMMM YYYY';

// DATE MONTH
const FULL_DM_FORMAT = 'DD MMMM';
const SHORT_DM_FORMAT = 'DD MMM';

// MONTH YEAR
export const SHORT_MY_FORMAT = 'MMM YYYY';
export const FULL_MY_FORMAT = 'MMMM YYYY';

export const QUERY_DATE_FORMAT = 'YYYY-MM-DDTHH:mm';

type Props = {
  children: moment.Moment;
  year?: boolean;
};

export const formatRequestDate = (date: moment.Moment): string => date.format(QUERY_DATE_FORMAT);

export const formatShortDate = (date: moment.Moment, year?: boolean): string => date
  .utc()
  .tz('Europe/Warsaw')
  .format(year ? SHORT_DMY_FORMAT : SHORT_DM_FORMAT);

export const formatLongDate = (date: moment.Moment, year?: boolean): string => date
  .utc()
  .tz('Europe/Warsaw')
  .format(year ? FULL_DMY_FORMAT : FULL_DM_FORMAT);

export const FormatShortDate: React.FC<Props> = ({ children, year }) => (
  <>{formatShortDate(children, year)}</>
);

export const FormatLongDate: React.FC<Props> = ({ children, year }) => {
  if (moment.isMoment(children)) {
    const date = formatLongDate(children, year).toString();
    return <>{date}</>;
  }

  return <></>;
};
