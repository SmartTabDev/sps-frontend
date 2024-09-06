import { filterByUniqueName } from './filterByUniqueName';

describe('filterByUniqueName', () => {
  it('returns an empty array when given an empty array', () => {
    const input: any[] = [];
    const result = filterByUniqueName(input);
    expect(result).toEqual([]);
  });

  it('returns the original array when all items have unique names', () => {
    const input = [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }];
    const result = filterByUniqueName(input);
    expect(result).toEqual(input);
  });

  it('filters out items with duplicate names', () => {
    const input = [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 1' }];
    const result = filterByUniqueName(input);
    expect(result).toEqual([{ name: 'Item 1' }, { name: 'Item 2' }]);
  });

  it('preserves the order of items in the original array', () => {
    const input = [{ name: 'Item 2' }, { name: 'Item 1' }, { name: 'Item 2' }];
    const result = filterByUniqueName(input);
    expect(result).toEqual([{ name: 'Item 2' }, { name: 'Item 1' }]);
  });
});
