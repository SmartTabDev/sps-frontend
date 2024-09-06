import React from 'react';
import moment, { Moment } from 'moment';
import { AvailabilityHistory } from 'reducers/productAvailability';
import { AvailableCell } from 'components/Table/AvailableCell';
import TableCell from '@mui/material/TableCell';
import { formatShortDate } from 'components/FormatDate/FormatDate';

const getStatus = (
  data: AvailabilityHistory,
  date: string,
  variantlinkid: number,
) => {
  const dateStatus = data[date] || {};
  const variant = dateStatus[variantlinkid] || {};

  return (variant as any).status || 'void';
};

type Props<T extends { variantlinkid: number }> = {
  product: T;
  dateRange: Moment[];
  availabilityHistory: AvailabilityHistory;
};

const AvailableCellMemo = React.memo(AvailableCell);

export const DateRangeColumns = <T extends { variantlinkid: number }>({
  product,
  dateRange,
  availabilityHistory,
}: Props<T>): JSX.Element => {
  const { variantlinkid } = product;

  return (
    <>
      <TableCell style={{ padding: 0 }} />
      {dateRange.map((_date, index) => (
        <AvailableCellMemo
          status={getStatus(
            availabilityHistory,
            formatShortDate(dateRange[index] as Moment, true),
            variantlinkid,
          )}
          key={index}
        />
      ))}
      <TableCell style={{ padding: 0 }} />
      <AvailableCellMemo
        status={getStatus(
          availabilityHistory,
          formatShortDate(moment(Date.now()), true),
          variantlinkid,
        )}
        sticky
      />
    </>
  );
};
