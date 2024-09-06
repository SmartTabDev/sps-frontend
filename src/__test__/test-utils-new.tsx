import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import storeRegistry from 'storeRegistry';
import createPersistor from 'persistor';
import { PersistGate } from 'redux-persist/integration/react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MemoryRouter } from 'react-router-dom';
import LightTheme from '../theme/index';

const store = storeRegistry.getStore();
const persistor = createPersistor(store);

export const UiWrapper: React.FC = ({ children }) => (
  <Provider store={store}>
    <ThemeProvider theme={LightTheme}>{children}</ThemeProvider>
  </Provider>
);

const AllTheProviders = ({ children }: any) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <ThemeProvider theme={LightTheme}>
          <MemoryRouter>{children}</MemoryRouter>
        </ThemeProvider>
      </LocalizationProvider>
    </PersistGate>
  </Provider>
);

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: AllTheProviders, ...options });

let lastId = 100;

export function nextId(): number {
  lastId += 1;
  return lastId;
}

export * from '@testing-library/react';
export { customRender as render };
