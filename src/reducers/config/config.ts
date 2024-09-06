import { createSlice } from '@reduxjs/toolkit';
import { Config, ConfigProduct, KPIConfig, SPSConfig } from 'types/AppConfig';

type CurrentDisplayState = {
  isConfigLoading: boolean;
  spsFiltersLoading: boolean;
  pcFiltersLoading: boolean;
  sps: SPSConfig & {
    isDaily: boolean;
  };
  config: Config;
  kpi: KPIConfig;
};

const initialState: CurrentDisplayState = {
  isConfigLoading: false,
  spsFiltersLoading: false,
  pcFiltersLoading: false,
  config: {
    domainName: '',
  },
  sps: {
    products: [],
    categories: [],
    brands: [],
    retailers: [],
    isDaily: false,
    linksMap: {},
    rrpMap: {},
    namesMap: {},
    links: [],
  },
  kpi: {
    brands: [],
    categories: [],
    categoryLinks: [],
    categoryLinksCategories: [],
    categoryRetailers: [],
    keywordLinks: [],
    keywords: [],
    links: [],
    productRetailers: [],
    products: [],
    retailers: [],
    searchRetailers: [],
    searchTerms: [],
  },
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setSPSProducts(state, action: { payload: { products: ConfigProduct[] } }) {
      state.sps = { ...state.sps, ...action.payload };
    },
    setSPSConfig(state, action: { payload: { config: Partial<SPSConfig> } }) {
      state.sps = { ...state.sps, ...action.payload.config };
    },
    setSPSConfigForTable(
      state,
      action: { payload: { config: Partial<SPSConfig> } }
    ) {
      state.sps = { ...state.sps, ...action.payload.config };
    },
    setKPIConfig(state, action: { payload: { config: KPIConfig } }) {
      state.kpi = action.payload.config;
    },
    setIsDaily(state, action) {
      state.sps.isDaily = action.payload;
    },
    setBaseConfig(state, action) {
      state.config = { ...state.config, ...action.payload };
    },
    setLoading(state, action) {
      state.isConfigLoading = action.payload;
    },
    setSPSConfigLoading(state, action) {
      state.spsFiltersLoading = action.payload;
    },
    setPCFiltersLoading(state, action) {
      state.pcFiltersLoading = action.payload;
    },
  },
});

export const configReducer = configSlice.reducer;
