import { useMemo } from 'react';
import moment from 'moment';
import { useBarLineChartOption } from './useBarLineChartOption';
import { EyeLevelChartPeriod, EyeLevelTab } from '../types';

export const useEyeLevelChartData = (
  period?: EyeLevelChartPeriod,
  fromDate?: moment.Moment,
  toDate?: moment.Moment
) => {
  const { chartOption, isLoading } = useBarLineChartOption(
    period,
    fromDate,
    toDate
  );
  const tabs = useMemo<EyeLevelTab[]>(
    () => [
      { label: 'Weekly', id: EyeLevelChartPeriod.WEEKLY },
      { label: 'Monthly', id: EyeLevelChartPeriod.MONTHLY },
      { label: 'Quarterly', id: EyeLevelChartPeriod.QUARTERLY },
    ],
    []
  );

  return { tabs, chartOption, isLoading };
};
