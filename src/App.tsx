import React, { useContext, useEffect } from 'react';
import { Router, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useHotjar } from 'hooks/useHotjar';
import { useSelector, useDispatch } from 'react-redux';
import { setError } from 'reducers/auth/actions';
import AuthRoutes from 'pages/AuthPage/AuthPage';
import LoadingPage from 'pages/LoadingPage/LoadingPage';
import ErrorPage from 'pages/ErrorPage/ErrorPage';
import { ConfigContext } from 'contexts/ConfigContext';
import Routes from './pages/Routes';

export const history = createBrowserHistory();

const unAuthenticatedMessage = `
We are sorry, but you do not have access. Please contact our customer support.
`;

function App(): JSX.Element {
  const dispatch = useDispatch();

  const services = useSelector((state: RootState) => state.auth.services);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const configAccessToken = useSelector(
    (state: RootState) => state.auth.configAccessToken
  );

  const {
    isMultimarketLoading, // It is ready after fetch configs and it set initial one
    isMultimarketError, // It shows error if user have no configs
  } = useContext(ConfigContext);

  const { initHotjar } = useHotjar();

  const { NODE_ENV, REACT_APP_HOTJAR } = process.env;

  useEffect(() => {
    if (REACT_APP_HOTJAR && NODE_ENV !== 'test') {
      initHotjar(Number(REACT_APP_HOTJAR), 6);
    }
  }, [initHotjar]);

  useEffect(() => {
    if (isAuthenticated && services.length === 0) {
      dispatch(setError(unAuthenticatedMessage));
    }
  }, [dispatch, isAuthenticated, services.length]);

  // We can show dashboard if:
  // - user logged in
  // - servises fetched
  // - user have all needed tokens
  const areTokensLoaded =
    !(!isAuthenticated || (isAuthenticated && services.length === 0)) &&
    configAccessToken;

  return (
    <Router history={history}>
      {areTokensLoaded ? (
        <Switch>
          {/* TODO: Add multimarket wrapper */}
          {isMultimarketError ? <ErrorPage /> : null}
          {!isMultimarketError && isMultimarketLoading ? (
            <LoadingPage />
          ) : (
            <Routes />
          )}
        </Switch>
      ) : null}
      {!areTokensLoaded ? <AuthRoutes /> : null}
    </Router>
  );
}

export default App;
