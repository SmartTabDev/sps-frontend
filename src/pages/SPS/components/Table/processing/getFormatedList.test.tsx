import { getFormatedList } from './processData';

describe('getFormatedList', () => {
  test('filter null dates', () => {
    const tablePivot = [
      {
        rundate: null,
      },
    ];

    expect(getFormatedList(tablePivot as any)).toHaveLength(0);
  });

  test('replaces null prices to 0.00', () => {
    const tablePivot = [
      {
        price: null,
        rundate: '2020-08-11T02:30:00.000',
      },
    ];

    expect(getFormatedList(tablePivot as any)[0].price).toBe('0.00');
  });

  test('MMMM DD HH:mm format date', () => {
    const tablePivot = [
      {
        rundate: '2020-10-24T00:30:00.000',
      },
      {
        rundate: '2020-10-24T01:30:00.000',
      },
      // 2020-10-25 time change
      {
        rundate: '2020-10-26T00:30:00.000',
      },
      {
        rundate: '2020-10-26T01:30:00.000',
      },
    ];

    expect(getFormatedList(tablePivot as any)![0].formattedDate).toBe(
      'Oct 24 02:30'
    );
    expect(getFormatedList(tablePivot as any)![1].formattedDate).toBe(
      'Oct 24 03:30'
    );
    expect(getFormatedList(tablePivot as any)![2].formattedDate).toBe(
      'Oct 26 01:30'
    );
    expect(getFormatedList(tablePivot as any)![3].formattedDate).toBe(
      'Oct 26 02:30'
    );
  });
});
