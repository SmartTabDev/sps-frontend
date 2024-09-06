import getMinPrice from './getMinPrice';

const items = [
  {
    formattedDate: 'November 03 06:00',
    _day: 3,
    createdAt: '2020-11-03T00:00:00.000',
    url: 'https://www.doz.pl/apteka/p2335-Sylimarol_Vita_150_kapsulki_30_szt._',
    available: true,
    productname: 'Sylimarol VitaVita 150mg 30szt.',
    retailername: 'DOZ',
    rundate: '2020-11-03T06:00:00.000',
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
    rundate: '2020-11-03T05:00:00.000',
    price: '13.99',
    regularprice: '0',
    date: '',
  },
  {
    formattedDate: 'November 03 04:00',
    _day: 3,
    createdAt: '2020-11-03T00:00:00.000',
    url: 'https://www.doz.pl/apteka/p2335-Sylimarol_Vita_150_kapsulki_30_szt._',
    available: false,
    productname: 'Sylimarol VitaVita 150mg 30szt.',
    retailername: 'DOZ',
    rundate: '2020-11-03T04:00:00.000',
    price: '0',
    regularprice: '0',
    date: '',
  },
];

describe('getMinPrice', () => {
  test('returns min price', () => {
    const result = getMinPrice(items);

    expect(result).toBe('13.99');
  });
});
