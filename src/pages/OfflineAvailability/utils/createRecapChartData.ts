import { GroupByKeyValueMap } from 'pages/MarketRadar/utils/groupByKeys';
import getRandomColor from 'utils/colors/getRandomColor';
import { ChartData } from '../types/Chart';

export function createRecapChartData(
  valueMap: GroupByKeyValueMap,
  uniqueRetailers: string[],
  uniqueDates: string[]
): ChartData[] {
  return uniqueRetailers.map((retailer, index) => {
    const dataForDates: number[] = uniqueDates.map((date) => {
      const key = `${date}-${retailer}`;
      const value: number = valueMap[key] ?? 0;
      return value;
    });

    return {
      color: getRandomColor(index),
      name: retailer,
      data: dataForDates.map((v) => ({ value: v })),
    };
  });
}
