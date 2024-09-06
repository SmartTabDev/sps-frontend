import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { TableView } from 'types/SPSTable';
import getOption from '../components/Chart/getOption';

interface Hook {
  view: TableView,
  getOptionForView: () => ReturnType<typeof getOption>,
}

export function useTableView(): Hook {
  const isDaily = useSelector(
    (state: RootState) => state.config.sps.isDaily,
  );

  const view = useSelector((state: RootState) => state.productAnalysis.view) || 'Daily';
  const getOptionForView = useCallback(() => getOption(isDaily), [isDaily]);

  return { view, getOptionForView };
}
