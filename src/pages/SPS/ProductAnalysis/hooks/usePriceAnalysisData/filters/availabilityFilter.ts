import { PriceAnalysisFilters } from 'pages/SPS/ProductAnalysis/components/ExpandedFilters/types';
import { PriceCell } from 'types/SPSTable';

const availabilityFilter = (
  data: PriceCell['meta'],
  filter: PriceAnalysisFilters['availability'],
): boolean => {
  const allCheckbox = filter.find((item) => item.name === 'All');

  if (allCheckbox || filter.length === 0) {
    return true;
  }

  const availableCheckbox = filter.find((item) => item.name === 'Available');
  const unavailableCheckbox = filter.find((item) => item.name === 'Unavailable');

  let showAvailable = false;
  let showUnavailable = false;

  if (availableCheckbox) {
    showAvailable = data.available === true;
  }

  if (unavailableCheckbox) {
    showUnavailable = data.available === false;
  }

  return showAvailable || showUnavailable;
};

export default availabilityFilter;
