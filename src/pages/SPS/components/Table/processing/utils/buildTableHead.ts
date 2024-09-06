import formatDay from 'utils/dates/formatDay';
import formatHour from 'utils/dates/formatHour';
import {
  Cell,
  DateCell,
  DateHourCell,
  Kind,
  RetailerCell,
  TableView,
} from 'types/SPSTable';
import uniqBy from 'lodash/uniqBy';
import addHourMeta from 'utils/dates/addHourMeta';

const addKinds = <T>(arr: any[], kind: Kind): T[] =>
  arr.map((item) => ({ ...item, kind }));
const addKind = <T>(item: any, kind: Kind): T => ({ ...item, kind });

export const buildTableHead = (
  view: TableView,
  dates: string[],
  groupBy: 'Product' | 'Retailer' = 'Product'
): Cell[] => {
  if (dates) {
    let baseCells: RetailerCell[] = [
      addKind<RetailerCell>({ data: 'Product' }, 'product'),
      addKind<RetailerCell>({ data: 'Retailer' }, 'retailer'),
    ];
    let dateCells: DateCell[] | DateHourCell[] = [];

    if (view === 'Daily') {
      dateCells = addKinds<DateCell>(
        uniqBy(dates.map(formatDay), 'data'),
        'date'
      );
    }

    if (view === 'Hourly') {
      dateCells = addKinds<DateHourCell>(
        addHourMeta(dates.map(formatHour)),
        'date-hour'
      );
    }

    if (groupBy === 'Product') {
      //
    } else {
      baseCells = baseCells.reverse();
    }

    return [...baseCells, ...dateCells];
  }

  return [];
};
