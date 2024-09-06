import { DateHourCell } from 'types/SPSTable';
import matchDates from './matchDates';

const items = [
  {
    formattedDate: 'November 03 06:00',
    _day: 3,
    createdAt: '2020-11-03T00:00:00.000',
    url: 'https://www.doz.pl/apteka/p2335-Sylimarol_Vita_150_kapsulki_30_szt._',
    available: true,
    productname: 'Sylimarol VitaVita 150mg 30szt.',
    retailername: 'DOZ',
    rundate: '2020-11-03T04:00:00.000',
    price: '15.99',
    regularprice: '0',
    date: '',
  },
  {
    formattedDate: 'November 03 05:00',
    _day: 3,
    createdAt: '2020-11-03T00:00:00.000',
    url: 'https://www.doz.pl/apteka/p2335-Sylimarol_Vita_150_kapsulki_30_szt._',
    available: true,
    productname: 'Sylimarol VitaVita 150mg 30szt.',
    retailername: 'DOZ',
    rundate: '2020-11-03T04:00:00.000',
    price: '15.99',
    regularprice: '0',
    date: '',
  },
  {
    formattedDate: 'November 03 05:00',
    _day: 3,
    createdAt: '2020-11-03T00:00:00.000',
    url: 'https://www.doz.pl/apteka/p2335-Sylimarol_Vita_150_kapsulki_30_szt._',
    available: true,
    productname: 'Sylimarol VitaVita 150mg 30szt.',
    retailername: 'DOZ',
    rundate: '2020-11-03T04:00:00.000',
    price: '15.99',
    regularprice: '0',
    date: '',
  },
];

const dates: DateHourCell[] = [
  {
    data: 'November 03 05:00',
    kind: 'date-hour',
    meta: {
      monthNumber: 10,
      day: 3,
      isFirstDate: false,
      isLastDate: false,
    },
  },
];

describe('matchDates', () => {
  test('match date', () => {
    const result = matchDates(items, dates);
    expect(result[0]!.formattedDate).toBe(dates[0]!.data);
    expect(result).toHaveLength(1);
  });
});
