export const getPercentage = (count?: number | null, max?: number | null): number => {
  if (!count || !max) {
    return 0;
  }

  return (count / max) * 100;
};

export const getRangePercentage = (
  value?: number | null,
  max?: number | null,
  min?: number | null,
): number => {
  if (!value || !max || !min) {
    return 0;
  }

  return ((value - min) * 100) / (max - min);
};

// eslint-disable-next-line max-len
export const getNumberFromPercentage = (percentage?: number | null, max?: number | null): number => {
  if (!percentage || !max) {
    return 0;
  }

  const result = (max / 100) * percentage;

  return Math.round((result + Number.EPSILON) * 100) / 100;
};

export const relDiff = (a: number, b: number): number => 100 * Math.abs((a - b) / ((a + b) / 2));
