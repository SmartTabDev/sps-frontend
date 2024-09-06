import { useEffect } from 'react';
import getCubeName from 'utils/getCubeName';
import { Filter, useFilter } from 'hooks/useFilter';

const Products = getCubeName('Products', 'aggregations');

export function useFilterList(regionCode: string | undefined): {
  categories: Filter<'retailer'>[];
  retailers: Filter[];
  isFilterListLoading: boolean;
} {
  const retailerFilter = useFilter(`${Products}.retailer`);
  const categoryFilter = useFilter<'retailer'>(
    `${Products}.category`,
    `${Products}.retailer`
  );

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
