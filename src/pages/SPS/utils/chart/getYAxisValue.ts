const calcRange = () => {
  const range = 0.2;
  const minMultiplier = 1 - range;
  const maxMultiplier = 1 + range;

  return {
    range,
    minMultiplier,
    maxMultiplier,
  };
};

const roundToUnits = (value: number, initialValue: number) => {
  const len = Math.ceil(Math.log10(value + 1));

  const pad = len > 1 ? len - 1 : len;
  const finalValue = Number(String(1).padEnd(pad, '0'));
  const result = Math.round(value / finalValue) * finalValue;

  return initialValue === result ? value : result;
};

const calcAvg = (min: number, max: number) => (max + min) / 2;

type AxisValueArgs = { min: number; max: number };

export const getYAxisMinValue = ({ min, max }: AxisValueArgs): number => {
  if (min === 0) {
    return 0;
  }
  const { range, minMultiplier } = calcRange();

  let minInitialValue = 0;

  if (min === max) {
    minInitialValue = Math.floor(min * minMultiplier);
    return roundToUnits(minInitialValue, min);
  }

  if (min !== max) {
    const avg = calcAvg(min, max);
    minInitialValue = min - avg * range;
  }

  return minInitialValue < 0 ? 0 : roundToUnits(minInitialValue, min);
};

export const getYAxisMaxValue = ({ min, max }: AxisValueArgs): number => {
  const { range, maxMultiplier } = calcRange();

  if (max === 0) {
    return 0;
  }

  let maxInitialValue = 0;

  if (min === max) {
    maxInitialValue = Math.ceil(max * maxMultiplier);
    return roundToUnits(maxInitialValue, max);
  }

  if (min !== max) {
    const avg = calcAvg(min, max);
    maxInitialValue = max + avg * range;
  }

  return maxInitialValue < 0 ? 0 : roundToUnits(maxInitialValue, max);
};
