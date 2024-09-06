import { FilterActionType, FilterDispatch } from 'hooks/useExpandedFilters';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PriceAnalysisFilters } from '../components/ExpandedFilters/types';
import getInitialTimeframe from './getInitialTimeframe';

const usePriceAnalysisTimeframe = (
  filterDispatch: FilterDispatch<PriceAnalysisFilters>,
  refreshKey: string
): void => {
  const intervals = useSelector(
    (state: RootState) => state.productAnalysis.intervals
  );

  useEffect(() => {
    if (intervals) {
      const initialTimeframe = getInitialTimeframe(intervals);

      if (initialTimeframe) {
        filterDispatch(
          {
            type: FilterActionType.SET,
            payload: {
              key: 'timeframe',
              value: initialTimeframe,
            },
          },
          true
        );
      }
    }
  }, [filterDispatch, intervals, refreshKey]);
};

export default usePriceAnalysisTimeframe;
