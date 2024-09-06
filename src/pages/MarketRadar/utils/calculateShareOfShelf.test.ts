import { calculateShareOfShelf, ShareOfShelf } from './calculateShareOfShelf';

const createShareOfShelf = (
  data: [string, string, string, number][]
): ShareOfShelf[] =>
  data.map(([retailer, category, brand, value]) => ({
    formattedRetailer: retailer,
    formattedCategory: category,
    brand,
    category,
    retailer,
    value,
  }));

describe('calculateShareOfShelf', () => {
  it('calculates share of shelf for a single retailer, category, and brand with multiple shares', () => {
    const data: [string, string, string, number][] = [
      ['Allegro', 'Tusze do rzęs', 'Eveline Cosmetics', 71823],
      ['Allegro', 'Tusze do rzęs', 'Maybelline', 49548],
      ['Allegro', 'Tusze do rzęs', "L'Oréal Paris", 47255],
      ['Allegro', 'Tusze do rzęs', 'Max Factor', 36149],
      ['Allegro', 'Tusze do rzęs', 'Bourjois', 35947],
      ['Allegro', 'Tusze do rzęs', 'Rimmel', 34273],
      ['Allegro', 'Tusze do rzęs', 'Avon', 22344],
      ['Allegro', 'Tusze do rzęs', 'Gosh', 17443],
    ];
    const shareOfShelf = createShareOfShelf(data);
    const result = calculateShareOfShelf(shareOfShelf);
    expect(result).toStrictEqual([
      {
        brand: 'Eveline Cosmetics',
        category: 'Tusze do rzęs',
        retailer: 'Allegro',
        share: 22.81674301580141,
        value: 71823,
      },
      {
        brand: 'Maybelline',
        category: 'Tusze do rzęs',
        retailer: 'Allegro',
        share: 15.740417177602279,
        value: 49548,
      },
      {
        brand: "L'Oréal Paris",
        category: 'Tusze do rzęs',
        retailer: 'Allegro',
        share: 15.011976542496077,
        value: 47255,
      },
      {
        brand: 'Max Factor',
        category: 'Tusze do rzęs',
        retailer: 'Allegro',
        share: 11.483820548824266,
        value: 36149,
      },
      {
        brand: 'Bourjois',
        category: 'Tusze do rzęs',
        retailer: 'Allegro',
        share: 11.419649154017701,
        value: 35947,
      },
      {
        brand: 'Rimmel',
        category: 'Tusze do rzęs',
        retailer: 'Allegro',
        share: 10.88785254557122,
        value: 34273,
      },
      {
        brand: 'Avon',
        category: 'Tusze do rzęs',
        retailer: 'Allegro',
        share: 7.098245770088505,
        value: 22344,
      },
      {
        brand: 'Gosh',
        category: 'Tusze do rzęs',
        retailer: 'Allegro',
        share: 5.541295245598541,
        value: 17443,
      },
    ]);
  });
});
