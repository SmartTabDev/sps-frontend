import { createSlice } from '@reduxjs/toolkit';
import { TableView } from 'types/SPSTable';
import {
  ConfigProduct,
  ConfigBrand,
  ConfigCategory,
  ConfigRetailer,
} from 'types/AppConfig';
import { Offer } from '../../pages/SPS/ProductAnalysis/components/PriceDrilldown';

type CurrentDisplayState = {
  view?: TableView;
  viewOptions: TableView[];
  chartVariants: any;
  isRunsLoading: boolean;
  isChartLoading: boolean;
  selectedProduct: string;
  selectedProducts: ConfigProduct[];
  selectedBrands: ConfigBrand[];
  selectedCategories: ConfigCategory[];
  selectedRetailers: ConfigRetailer[];
  intervals: number | null;
  filter: string;
  rrp: number | null;
  offers: Offer[] | undefined;
};

const initialState: CurrentDisplayState = {
  view: undefined,
  viewOptions: [],
  chartVariants: [],
  isRunsLoading: true,
  isChartLoading: true,
  selectedProduct: '',
  selectedProducts: [],
  selectedCategories: [],
  selectedBrands: [],
  selectedRetailers: [],
  intervals: null,
  filter: '',
  rrp: null,
  offers: undefined,
};

export const productAnalysisSlice = createSlice({
  name: 'productAnalysis',
  initialState,
  reducers: {
    setCurrentView(state, action) {
      state.view = action.payload;
    },
    setViewOptions(state, action) {
      state.viewOptions = action.payload;
      state.view = [...action.payload].pop();

      let intervals = 2;

      if (state.viewOptions.length === 1) {
        intervals = 14;
      }

      state.intervals = intervals;
    },
    setChart(state, action) {
      state.chartVariants = action.payload;
    },
    setRRP(state, action) {
      state.rrp = action.payload;
    },
    setOffers(state, action) {
      state.offers = action.payload;
    },
    setChartLoading(state, action) {
      state.isChartLoading = action.payload;
    },
    setSelectedProduct(
      state,
      action: { payload: string | number | undefined }
    ) {
      state.selectedProduct = String(action.payload || '');
    },
    setSelectedCategories(state, action) {
      state.selectedCategories = action.payload;
    },
    setSelectedBrands(state, action) {
      state.selectedBrands = action.payload;
    },
    setSelectedProducts(state, action) {
      state.selectedProducts = action.payload;
    },
    setSelectedRetailers(state, action) {
      state.selectedRetailers = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    resetFilters(state) {
      state.selectedRetailers = initialState.selectedRetailers;
      state.selectedCategories = initialState.selectedCategories;
      state.selectedBrands = initialState.selectedBrands;
    },
  },
});

export const productAnalysisReducer = productAnalysisSlice.reducer;
