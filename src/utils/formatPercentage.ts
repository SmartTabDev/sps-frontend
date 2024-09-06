export const formatPercentage = (val: number, isChangeValue?: boolean) => {
  if (isChangeValue) {
    if (val > 0) return String(`+${val}%`);
    if (val < 0) return String(`${val}%`);
    return '-';
  }
  return `${val.toFixed(2).replace('.00', '')}%`;
};

export const formatChangeValue = (val: number) => {
  if (val > 0) return String(`+${val}`);
  if (val < 0) return String(`${val}`);
  return '-';
};
