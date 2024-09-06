import { useEffect, useState, useCallback } from 'react';
import {
  ProductMonitorCategory,
  ProductMonitorFilters,
  ProductMonitorRetailer,
} from '../types';

const initialState = {
  category: undefined,
  brands: [],
  retailers: [],
  priceRange: undefined,
  features: undefined,
  products: [],
  search: '',
};

export function useProductMonitorFilters(
  category: ProductMonitorCategory | undefined,
  retailers: ProductMonitorRetailer[] | undefined
): {
  filters: ProductMonitorFilters;
  handleChange: React.Dispatch<React.SetStateAction<ProductMonitorFilters>>;
  resetFilter: () => void;
} {
  const [filters, setFilters] = useState<ProductMonitorFilters>(initialState);

  // set initial values
  useEffect(() => {
    if (category) {
      setFilters((data) => ({ ...data, category }));
    }

    if (retailers) {
      setFilters((data) => ({
        ...data,
        retailers,
      }));
    }
  }, [retailers, category]);

  const resetFilter = useCallback(() => {
    setFilters(initialState);
  }, []);

  return { filters, handleChange: setFilters, resetFilter };
}
