import calcPercentage from './calcPercentage';

const exampleSeries: number[] = [1, 2, 3];

describe('Recap Cards Utils - calcPercentage', () => {
  it('calculates percentage based on last value', () => {
    expect(calcPercentage(exampleSeries, 9)).toBe(33.33);
    expect(calcPercentage(exampleSeries, 6)).toBe(50);
    expect(calcPercentage(exampleSeries, 3)).toBe(100);
  });

  it('returns 0 for empty series', () => {
    expect(calcPercentage([], 9)).toBe(0);
  });
});
