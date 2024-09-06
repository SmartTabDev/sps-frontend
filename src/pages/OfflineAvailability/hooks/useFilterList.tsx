import { useEffect } from 'react';
import getCubeName from 'utils/getCubeName';
import { Filter, useFilter } from 'hooks/useFilter';

const Products = getCubeName('Products', 'oam_aggregations');

export function useFilterList(regionCode: string | undefined): {
  categories: Filter[];
  retailers: Filter[];
  isFilterListLoading: boolean;
} {
  const retailerFilter = useFilter(`${Products}.retailer`);
  const categoryFilter = useFilter(`${Products}.category`);

  const {
    fetchFilter: fetchCategories,
    isFilterLoading: isLoadingCategories,
    filter: categories,
  } = categoryFilter;

  const {
    fetchFilter: fetchRetailers,
    isFilterLoading: isLoadingRetailers,
    filter: retailers,
  } = retailerFilter;

  useEffect(() => {
    if (regionCode) {
      fetchRetailers(regionCode);
      fetchCategories(regionCode);
    }
  }, [regionCode, fetchRetailers, fetchCategories]);

  return {
    categories,
    retailers,
    isFilterListLoading: isLoadingRetailers || isLoadingCategories,
  };
}
