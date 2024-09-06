import { PriceAnalysisFilters } from 'pages/SPS/ProductAnalysis/components/ExpandedFilters/types';
import { PriceCell } from 'types/SPSTable';

const priceRangeFilter = (
  data: PriceCell['data'],
  filter: PriceAnalysisFilters['priceRange'],
): boolean => {
  if (filter) {
    const [minPrice, maxPrice] = filter;
    const price = Number(data.replace(',', '.'));

    if (price >= minPrice && price <= maxPrice) {
      return true;
    }

    return false;
  }

  return true;
};

export default priceRangeFilter;
