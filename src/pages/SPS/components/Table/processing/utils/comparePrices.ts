import { PriceCell } from 'types/SPSTable';

const shouldOmitPrice = (prev: PriceCell, current: PriceCell): boolean => {
  const notAllowed = ['0,00', '0.00', null, undefined];

  if (prev?.meta?.isNA || current?.meta?.isNA) {
    return true;
  }

  return (
    notAllowed.includes(String(prev?.data))
    || notAllowed.includes(String(current?.data))
  );
};

export const comparePrices = (
  prev: PriceCell,
  current: PriceCell,
  diff: 'isHigher' | 'isLower',
) => {
  let result = false;

  if (shouldOmitPrice(prev, current)) {
    return result;
  }

  if (diff === 'isHigher') {
    result = Number(prev?.data) < Number(current?.data);
  } else if (diff === 'isLower') {
    result = Number(prev?.data) > Number(current?.data);
  }

  return result;
};
