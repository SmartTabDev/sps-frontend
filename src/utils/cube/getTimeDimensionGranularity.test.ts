import { getTimeDimensionGranularity } from './getTimeDimensionGranularity';

describe('getTimeDimensionGranularity', () => {
  it('returns the correct granularity for "This week"', () => {
    const granularity = getTimeDimensionGranularity('This week');
    expect(granularity).toEqual('day');
  });

  it('returns the correct granularity for "Last week"', () => {
    const granularity = getTimeDimensionGranularity('Last week');
    expect(granularity).toEqual('day');
  });

  it('returns the correct granularity for "This month"', () => {
    const granularity = getTimeDimensionGranularity('This month');
    expect(granularity).toEqual('week');
  });

  it('returns the correct granularity for "Last month"', () => {
    const granularity = getTimeDimensionGranularity('Last month');
    expect(granularity).toEqual('week');
  });

  it('returns the correct granularity for "This year"', () => {
    const granularity = getTimeDimensionGranularity('This year');
    expect(granularity).toEqual('month');
  });

  it('returns the correct granularity for "Last year"', () => {
    const granularity = getTimeDimensionGranularity('Last year');
    expect(granularity).toEqual('month');
  });

  it('returns the default granularity for an unknown time dimension', () => {
    const granularity = getTimeDimensionGranularity('Unknown time dimension');
    expect(granularity).toEqual('day');
  });
});
