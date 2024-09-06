import { getYAxisMinValue, getYAxisMaxValue } from './getYAxisValue';

test('it works for zeros', () => {
  expect(getYAxisMinValue({ min: 0, max: 0 })).toBe(0);
  expect(getYAxisMaxValue({ min: 0, max: 0 })).toBe(0);
});

test('works for same min max', () => {
  expect(getYAxisMinValue({ min: 3.49, max: 3.49 })).toBe(2);
  expect(getYAxisMaxValue({ min: 3.49, max: 3.49 })).toBe(5);

  expect(getYAxisMinValue({ min: 1, max: 1 })).toBe(0);
  expect(getYAxisMaxValue({ min: 1, max: 1 })).toBe(2);

  expect(getYAxisMinValue({ min: 2, max: 2 })).toBe(1);
  expect(getYAxisMaxValue({ min: 2, max: 2 })).toBe(3);

  // range(0.2) -> 799.2 / 1198.8
  expect(getYAxisMinValue({ min: 999, max: 999 })).toBe(800);
  expect(getYAxisMaxValue({ min: 999, max: 999 })).toBe(1200);

  expect(getYAxisMinValue({ min: 2500, max: 2500 })).toBe(2000);
  expect(getYAxisMaxValue({ min: 2500, max: 2500 })).toBe(3000);
});

// min - avg * range;
// max + avg * range
test('works for avg', () => {
  expect(getYAxisMinValue({ min: 1, max: 3 })).toBe(0.6);
  expect(getYAxisMaxValue({ min: 1, max: 3 })).toBe(3.4);

  expect(getYAxisMinValue({ min: 1.69, max: 2.19 })).toBe(1);
  expect(getYAxisMaxValue({ min: 1.69, max: 2.19 })).toBe(3);

  expect(getYAxisMinValue({ min: 10, max: 30 })).toBe(6);
  expect(getYAxisMaxValue({ min: 10, max: 30 })).toBe(34);

  expect(getYAxisMinValue({ min: 100, max: 300 })).toBe(60);
  expect(getYAxisMaxValue({ min: 100, max: 300 })).toBe(340);

  expect(getYAxisMinValue({ min: 1000, max: 3000 })).toBe(600);
  expect(getYAxisMaxValue({ min: 1000, max: 3000 })).toBe(3400);
});
