import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import createPersistor from 'persistor';
import storeRegistry from 'storeRegistry';
import LightTheme from '../theme/index';

const store = storeRegistry.getStore();
const persistor = createPersistor(store);

const renderWithProviders = (ui: JSX.Element, options: any) => {
  const history = createMemoryHistory();

  return {
    ...render(
      <>
        <ThemeProvider theme={LightTheme}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Router history={history}>{ui}</Router>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </>,
      options,
    ),
    history,
  };
};

export { renderWithProviders };
