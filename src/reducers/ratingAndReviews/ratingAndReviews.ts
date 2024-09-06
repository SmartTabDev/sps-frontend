import { createSlice } from '@reduxjs/toolkit';
import {
  CATEGORY, RETAILER, SKU, TableView,
} from 'types/KPITable';
import { Product } from 'types/Product';

export type Rating = {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
};

export type RatingsChartData = {
  [key: string]: Rating;
};

type CurrentDisplayState = {
  ratingsLoading: boolean;
  ratingsOverTime: RatingsChartData;
  ratingsPerRetailer: RatingsChartData;
  ratingsWithReview: number;
  ratingsWithReviewDiff: number;
  view: TableView;
  viewOptions: TableView[];
  ratingsDetails: Product[];
  ratingDetailsLoading: boolean;
};

export const initialRating: Rating = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
};

const initialState: CurrentDisplayState = {
  ratingsLoading: true,
  ratingsOverTime: {},
  ratingsPerRetailer: {},
  ratingsWithReview: 0,
  ratingsWithReviewDiff: 0,
  view: RETAILER,
  viewOptions: [RETAILER, CATEGORY, SKU],
  ratingsDetails: [],
  ratingDetailsLoading: false,
};

export const ratingAndReviewsSlice = createSlice({
  name: 'ratingAndReviews',
  initialState,
  reducers: {
    setRatingLoading(state, action) {
      state.ratingsLoading = action.payload;
    },
    setRatingsOverTime(state, action) {
      state.ratingsOverTime = action.payload;
    },
    setRatingsPerRetailer(state, action) {
      state.ratingsPerRetailer = action.payload;
    },
    setRatingReviewsCount(state, action) {
      const { prev, current } = action.payload;
      state.ratingsWithReviewDiff = current - prev;
      state.ratingsWithReview = current;
    },
    setInitialView(state) {
      state.view = initialState.view;
      state.viewOptions = initialState.viewOptions;
    },
    setCurrentView(state, action) {
      state.view = action.payload;
    },
    setRatingsDetails(state, action) {
      state.ratingsDetails = action.payload;
    },
    setRatingsDetailsLoading(state, action) {
      state.ratingDetailsLoading = action.payload;
    },
  },
});

export const ratingAndReviewsReducer = ratingAndReviewsSlice.reducer;
