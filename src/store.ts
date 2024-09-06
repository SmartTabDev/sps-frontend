import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistedReducer } from './reducers/rootReducer';

export default {
  configureStore() {
    return configureStore({
      reducer: persistedReducer,
      middleware: getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }),
    });
  },
};
