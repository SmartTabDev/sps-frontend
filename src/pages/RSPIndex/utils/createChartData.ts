import { avg } from 'utils/calc/avg';
import { ChartData, RSPIndexItem } from '../types/Chart';

export function createChartData(
  data: RSPIndexItem[],
  uniqueRetailers: string[]
): ChartData[] {
  const chartData: ChartData[] = uniqueRetailers.map((retailer: string) => {
    const retailerData = data.filter((item) => item.retailer === retailer);

    return {
      name: retailer,
      data: retailerData.map((item) => ({
        value: item.avg,
        min: item.min,
        max: item.max,
      })),
    };
  });
  return chartData;
}

export function createReducedChartData(
  data: RSPIndexItem[],
  uniqueRetailers: string[]
): ChartData[] {
  const reducedChartData: ChartData[] = uniqueRetailers.map(
    (retailer: string) => {
      const retailerData = data.filter((item) => item.retailer === retailer);

      const avgs = retailerData.map((item) => item.avg);
      const mins = retailerData.map((item) => item.min);
      const maxs = retailerData.map((item) => item.max);
      const value = avg(avgs);

      return {
        name: retailer,
        data: [
          {
            value,
            min: Math.min(...mins),
            max: Math.max(...maxs),
          },
        ],
      };
    }
  );
  return reducedChartData;
}
