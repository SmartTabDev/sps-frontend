import { createSlice } from '@reduxjs/toolkit';
import { ChartView } from 'types/ProductAvailability';
import { CATEGORY, RETAILER, SKU, TableView } from 'types/KPITable';
import { Product } from 'types/Product';

export type AvailabilityCount = {
  name: string;
  count: number;
};

export type AvailabilityStatus = 'inStock' | 'outOfStock' | 'void';

export type Totals = {
  inStock?: number;
  outOfStock?: number;
  void?: number;
};

export type TotalsOverTime = {
  dates: string[];
  inStock: number[];
  outOfStock: number[];
  void: number[];
};

export type TotalsPer = {
  names: string[];
  inStock: number[];
  outOfStock: number[];
  void: number[];
};

export type TotalsUnavailable = Pick<
  Product,
  'categoryname' | 'retailername' | 'productname' | 'url'
>;

export type AvailabilityHistory = {
  [key: string]: {
    [key: string]: {
      status: AvailabilityStatus;
    };
  };
};

const FILTER_OPTIONS = ['All', 'In stock', 'Out of stock'] as const;
export type AvailabilityFilterOptions = typeof FILTER_OPTIONS[number];

type CurrentDisplayState = {
  chartView?: ChartView;
  chartViewOptions: ChartView[];
  availabilityLoading: boolean;
  stores: {
    name: string;
    count: number;
  }[];
  categories: {
    name: string;
    count: number;
  }[];
  brands: {
    name: string;
    count: number;
  }[];
  totals: Totals;
  totalsOverTime: TotalsOverTime;
  totalsUnavailable: TotalsUnavailable[];
  totalsPer: TotalsPer;
  availabilityHistory: AvailabilityHistory;
  tableView: TableView;
  tableViewOptions: TableView[];
  tableFilter: AvailabilityFilterOptions;
  tableFilterOptions: AvailabilityFilterOptions[];
  availabilityDetails: Product[];
  isTableLoading: boolean;
};

const initialState: CurrentDisplayState = {
  chartView: 'Store',
  chartViewOptions: ['Store', 'Category', 'Brand'],
  availabilityLoading: false,
  stores: [],
  categories: [],
  brands: [],
  totals: {
    inStock: 0,
    outOfStock: 0,
    void: 0,
  },
  totalsOverTime: {
    dates: [],
    inStock: [],
    outOfStock: [],
    void: [],
  },
  totalsUnavailable: [],
  totalsPer: {
    names: [],
    inStock: [],
    outOfStock: [],
    void: [],
  },
  availabilityHistory: {},
  tableView: RETAILER,
  tableViewOptions: [RETAILER, CATEGORY, SKU],
  tableFilter: 'All',
  tableFilterOptions: [...FILTER_OPTIONS],
  availabilityDetails: [],
  isTableLoading: false,
};

const productAvailabilitySlice = createSlice({
  name: 'productAvailability',
  initialState,
  reducers: {
    setCurrentChartView(state, action) {
      state.chartView = action.payload;
    },
    setCurrentTableView(state, action) {
      state.tableView = action.payload;
    },
    setAvailabilityLoading(state, action) {
      state.availabilityLoading = action.payload;
    },
    setStores(state, action) {
      state.stores = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setBrands(state, action) {
      state.brands = action.payload;
    },
    setTotals(state, action) {
      state.totals = action.payload;
    },
    setTotalsOverTime(state, action) {
      state.totalsOverTime = action.payload;
    },
    setTotalsPer(state, action) {
      state.totalsPer = action.payload;
    },
    setTotalsUnavailable(state, action) {
      state.totalsUnavailable = action.payload;
    },
    setAvailabilityHistory(state, action) {
      state.availabilityHistory = {
        ...state.availabilityHistory,
        ...action.payload,
      };
    },
    setAvailabilityDetails(state, action) {
      state.availabilityDetails = action.payload;
    },
    setTableLoading(state, action) {
      state.isTableLoading = action.payload;
    },
    setInitialTableView(state) {
      state.tableView = RETAILER;
    },
    setInitialTableFilter(state) {
      state.tableFilter = 'All';
    },
    setCurrentTableFilter(state, action) {
      state.tableFilter = action.payload;
    },
  },
});

export const {
  setBrands,
  setCategories,
  setStores,
  setAvailabilityLoading,
  setTotals,
  setTotalsOverTime,
  setTotalsPer,
  setCurrentChartView,
  setCurrentTableView,
  setAvailabilityHistory,
  setAvailabilityDetails,
  setTableLoading,
  setInitialTableView,
  setCurrentTableFilter,
  setInitialTableFilter,
  setTotalsUnavailable,
} = productAvailabilitySlice.actions;

export const productAvailabilityReducer = productAvailabilitySlice.reducer;

export type Dimension =
  | 'brandname'
  | 'brandid'
  | 'categoryname'
  | 'categoryid'
  | 'retailername'
  | 'retailerid'
  | 'productname'
  | 'productid';
