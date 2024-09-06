import { authReducer } from 'reducers/auth/auth';
import { categoryShareReducer } from 'reducers/categoryShare/categoryShare';
import { configReducer } from 'reducers/config/config';
import { productAnalysisReducer } from 'reducers/productAnalysis/productAnalysis';
import { productAvailabilityReducer } from 'reducers/productAvailability';
import { productComparisonReducer } from 'reducers/productComparison/productComparison';
import { ratingAndReviewsReducer } from 'reducers/ratingAndReviews/ratingAndReviews';
import { searchShareReducer } from 'reducers/searchShare/searchShare';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { createTransform, persistReducer } from 'redux-persist';

const rootReducer = combineReducers({
  auth: authReducer,
  config: configReducer,
  productAnalysis: productAnalysisReducer,
  productAvailability: productAvailabilityReducer,
  ratingAndReviews: ratingAndReviewsReducer,
  searchShare: searchShareReducer,
  categoryShare: categoryShareReducer,
  productComparison: productComparisonReducer,
});

const persistConfig = {
  key: 'root',
  whitelist: [
    'auth',
  ],
  version: 1,
  storage,
  // the only way to reset challenge flag on refresh when using persistStore:
  transforms: [createTransform(
    null,
    (outboundState: RootState['auth']):RootState['auth'] => ({ ...outboundState, challenge: false }),
    { whitelist: ['auth'] },
  )],
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>

declare global {
  type RootState = ReturnType<typeof rootReducer>
}
declare module 'react-redux' {
  function useSelector<TState = RootState, TSelected = unknown>(
    selector: (state: TState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected;
}

export default rootReducer;
