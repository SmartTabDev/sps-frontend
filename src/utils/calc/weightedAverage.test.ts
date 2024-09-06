import { weightedAverage } from './weightedAverage';

describe('weightedAverage', () => {
  it('returns the correct value for valid input', () => {
    const nums = [1, 2, 3];
    const weights = [0.2, 0.3, 0.5];
    const expected = 2.3;
    const result = weightedAverage(nums, weights);
    expect(result).toEqual(expected);
  });

  it('returns 0 for empty input arrays', () => {
    // TODO
  });

  it('returns 0 when all weights are 0', () => {
    // TODO
  });

  it('returns the correct value when some numbers are undefined', () => {
    // TODO
  });
});
