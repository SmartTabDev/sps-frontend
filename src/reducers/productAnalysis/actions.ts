import { productAnalysisSlice } from './productAnalysis';

export const {
  setChart,
  setRRP,
  setOffers,
  setChartLoading,
  setCurrentView,
  setViewOptions,
  setSelectedProduct,
  setSelectedCategories,
  setSelectedBrands,
  setSelectedProducts,
  setSelectedRetailers,
  setFilter,
  resetFilters,
} = productAnalysisSlice.actions;
