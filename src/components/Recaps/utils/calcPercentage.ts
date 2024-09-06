import { getPercentage } from 'utils/getPercentage';

// it calculates percentage for last series
const calcPercentage = (series: number[], max: number): number => {
  const lastCount = series[series.length - 1];
  let result = 0;

  if (lastCount) {
    result = getPercentage(lastCount, max);
  }

  return Number(result.toFixed(2));
};

export default calcPercentage;
