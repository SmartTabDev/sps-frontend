import { getRetailerName } from './getRetailerName';

it('default case', () => {
  expect(getRetailerName('play.pl')).toBe('play.pl');
});

it('returns links', () => {
  expect(getRetailerName('test play.pl')).toBe('play.pl');
});

it('splits - ', () => {
  expect(getRetailerName('play.pl - telecoms')).toBe('play.pl');
});
