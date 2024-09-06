import { useEffect } from 'react';
import getCubeName from 'utils/getCubeName';
import { Filter, useFilter } from 'hooks/useFilter';

const Products = getCubeName('RRP_Variants', 'aggregations');

export function useFilterList(regionCode: string | undefined): {
  categories: Filter<'retailerName'>[];
  retailers: Filter[];
  isFilterListLoading: boolean;
} {
  const retailerFilter = useFilter(`${Products}.retailerName`);
  const categoryFilter = useFilter<'retailerName'>(
    `${Products}.categoryName`,
    `${Products}.retailerName`
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
