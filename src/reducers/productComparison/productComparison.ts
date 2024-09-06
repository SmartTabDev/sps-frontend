import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConfigProduct, ConfigRetailer } from 'types/AppConfig';
import getFromDate from 'utils/dates/getFromDate';
import getToDate from 'utils/dates/getToDate';
import { TableView } from 'types/SPSTable';

export type ProductComparisonView = 'Product' | 'Retailer';
export type DateRange = { startDate: string | null; endDate: string | null };

type CurrentDisplayState = {
  startDate: string;
  endDate: string;
  selectedProducts: ConfigProduct[];
  selectedRetailers: ConfigRetailer[];
  showBy: ProductComparisonView;
  showByOptions: ProductComparisonView[];
  isTableLoading: boolean;
  isRunsLoading: boolean;
  isChartLoading: boolean;
  isTableLoaded: boolean;
  clientRuns: string[];
  variants: any[];
  chartVariants: any[];
  tableView?: TableView;
  tableViewOptions: TableView[];
};

const initialState: CurrentDisplayState = {
  startDate: '',
  endDate: '',
  selectedProducts: [],
  selectedRetailers: [],
  showBy: 'Retailer',
  showByOptions: ['Product', 'Retailer'],
  isTableLoading: false,
  isRunsLoading: false,
  isChartLoading: false,
  isTableLoaded: false,
  clientRuns: [],
  variants: [],
  chartVariants: [],
  tableView: undefined,
  tableViewOptions: [],
};

export const productComparisonSlice = createSlice({
  name: 'productComparison',
  initialState,
  reducers: {
    setInitialForm(state) {
      state.selectedProducts = [];
      state.selectedRetailers = [];
      state.variants = [];
      state.isTableLoaded = false;
      state.showBy = 'Retailer';
      state.startDate = getFromDate(undefined, 7);
      state.endDate = getToDate();
    },
    setDate(state, action: PayloadAction<DateRange>) {
      const { startDate, endDate } = action.payload;
      if (startDate) state.startDate = startDate;
      if (endDate) state.endDate = endDate;
    },
    setShowBy(state, action) {
      state.showBy = action.payload;
    },
    setSelectedRetailers(state, action) {
      state.selectedRetailers = action.payload;
    },
    setSelectedProducts(state, action) {
      state.selectedProducts[action.payload.index] = action.payload.value;
    },
    setRunsLoading(state, action) {
      state.isRunsLoading = action.payload;
    },
    setClientRuns(state, action) {
      state.clientRuns = action.payload;
    },
    setVariantsLoading(state, action) {
      state.isTableLoading = action.payload;
    },
    setVariantsLoaded(state, action) {
      state.isTableLoaded = action.payload;
    },
    setVariants(state, action) {
      if (action.payload) {
        state.variants.push(...action.payload);
      }
    },
    resetVariants(state) {
      state.variants = [];
      state.isTableLoaded = false;
    },
    setChart(state, action) {
      state.chartVariants = action.payload;
    },
    setChartLoading(state, action) {
      state.isChartLoading = action.payload;
    },
    setTableViewOptions(state, action) {
      state.tableViewOptions = action.payload;
      state.tableView = [...action.payload].pop();
    },
    setTableView(state, action) {
      state.tableView = action.payload;
    },
  },
});

export const productComparisonReducer = productComparisonSlice.reducer;
