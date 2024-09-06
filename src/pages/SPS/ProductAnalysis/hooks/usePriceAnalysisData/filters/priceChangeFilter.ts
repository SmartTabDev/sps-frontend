import { PriceAnalysisFilters } from 'pages/SPS/ProductAnalysis/components/ExpandedFilters/types';
import { PriceCell } from 'types/SPSTable';

const priceChangeFilter = (
  data: PriceCell['meta'],
  filter: PriceAnalysisFilters['priceChange'],
): boolean => {
  const allCheckbox = filter.find((item) => item.name === 'All');

  if (allCheckbox || filter.length === 0) {
    return true;
  }

  const jumpsCheckbox = filter.find((item) => item.name === 'Jumps');
  const dropsCheckbox = filter.find((item) => item.name === 'Drops');

  let showJumps = false;
  let showDrops = false;

  if (jumpsCheckbox) {
    showJumps = data.isHigher === true;
  }

  if (dropsCheckbox) {
    showDrops = data.isLower === true;
  }

  return showJumps || showDrops;
};

export default priceChangeFilter;
