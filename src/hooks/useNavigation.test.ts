import { renderHook } from '@testing-library/react-hooks';
import useNavigation from './useNavigation';

const getList = (result: any) => {
  return result.current[0];
};

const getListItem = (result: any, index: number) => {
  return result.current[0].items[index];
};

describe('it handles access properly', () => {
  it('it returns Dashboard and KPI', () => {
    const { result, rerender } = renderHook(useNavigation, {
      initialProps: ['kpi'],
    });

    // Two icons:
    expect(getList(result).items.length).toBe(2);

    // It works also for submodules:
    rerender(['kpi-av']);
    expect(getList(result).items.length).toBe(2);

    // Only one module visible in sub list:
    expect(getListItem(result, 1)?.children?.length).toBe(1);
  });

  it('it returns SPS', () => {
    const { result } = renderHook(useNavigation, {
      initialProps: ['sps', 'sps-notifications'],
    });

    expect(getList(result).items.length).toBe(1);
    expect(getListItem(result, 0)?.children?.length).toBe(2);
  });

  it('it returns PRM', () => {
    const { result } = renderHook(useNavigation, {
      initialProps: ['prm'],
    });

    expect(getList(result).items.length).toBe(1);

    // It doesn't render sublist:
    expect(getListItem(result, 0)?.children).toBe(undefined);
  });

  it('it returns Marketplaces', () => {
    const { result } = renderHook(useNavigation, {
      initialProps: ['allegro', 'ceneo', 'idealo', 'shopee'],
    });

    expect(getList(result).items.length).toBe(1);
    expect(getListItem(result, 0)?.children?.length).toBe(4);
  });
});
