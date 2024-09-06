import { createIdFilters } from 'api/SPS/records';
import { pick } from 'lodash';
import { PriceAnalysisFilters } from 'pages/SPS/ProductAnalysis/components/ExpandedFilters/types';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export function usePriceAnalysisFilters(
  expandedFilters: PriceAnalysisFilters
): any[] {
  const { selectedCategories, selectedBrands, selectedRetailers } =
    expandedFilters;
  const spsConfig = useSelector((state: RootState) => state.config.sps);

  const allFilters = pick(spsConfig, [
    'categories',
    'brands',
    'retailers',
    'products',
  ]);

  const filters = useMemo(
    () =>
      createIdFilters(allFilters, {
        categories: selectedCategories,
        brands: selectedBrands,
        retailers: selectedRetailers,
        products: [],
      }),
    [selectedCategories, selectedBrands, selectedRetailers]
  );

  return filters;
}
