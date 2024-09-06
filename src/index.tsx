import './index.css';
import './utils/rollbar';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'libs/react-dates/react_dates_overrides.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import createPersistor from 'persistor';
import storeRegistry from 'storeRegistry';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { ConfigProvider } from 'contexts/ConfigContext';
import { SnackbarProvider } from 'notistack';
import { MenuProvider } from 'contexts/MenuContext';
import {
  CheckCircleOutline,
  ErrorOutline,
  InfoOutlined,
  WarningAmber,
} from '@mui/icons-material';
import { SnackbarCloseButton } from 'components/SnackbarCloseButton/SnackbarCloseButton';
import { ReactQueryProvider } from 'api/ReactQueryProvider';
import LightTheme from './theme';
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = storeRegistry.getStore();
const persistor = createPersistor(store);
storeRegistry.registerStorePersistor(persistor);

ReactDOM.render(
  <ReactQueryProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ThemeProvider theme={LightTheme}>
            <ConfigProvider>
              <SnackbarProvider
                dense
                maxSnack={5}
                preventDuplicate
                autoHideDuration={2000}
                action={(snackbarKey) => (
                  <SnackbarCloseButton snackbarKey={snackbarKey} />
                )}
                variant="success"
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                iconVariant={{
                  success: <CheckCircleOutline sx={{ mr: '12px' }} />,
                  error: <ErrorOutline sx={{ mr: '12px' }} />,
                  warning: <WarningAmber sx={{ mr: '12px' }} />,
                  info: <InfoOutlined sx={{ mr: '12px' }} />,
                }}
              >
                <MenuProvider>
                  <App />
                </MenuProvider>
              </SnackbarProvider>
            </ConfigProvider>
          </ThemeProvider>
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  </ReactQueryProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
