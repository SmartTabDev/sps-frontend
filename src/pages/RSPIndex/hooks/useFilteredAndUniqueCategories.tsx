import { useEffect, useState } from 'react';
import { Filter } from 'hooks/useFilter';
import { filterByUniqueName } from 'utils/filterByUniqueName';

export const useFilteredAndUniqueCategories = (
  categories: Filter[],
  selectedRetailersState: Filter[]
): Filter[] => {
  const [filteredCategories, setFilteredCategories] = useState<Filter[]>([]);

  useEffect(() => {
    const filtered = categories.filter((category) =>
      selectedRetailersState.some(
        (retailer) => category.retailerName === retailer.name
      )
    );
    const unique = filterByUniqueName(filtered);
    setFilteredCategories(unique);
  }, [categories, selectedRetailersState]);

  return filteredCategories;
};
