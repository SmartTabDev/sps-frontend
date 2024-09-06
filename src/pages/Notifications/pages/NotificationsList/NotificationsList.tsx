import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Page from 'components/Page/Page';
import Mountains from 'components/Mountains/Mountains';
import ActionDialog from 'components/ActionDialog/ActionDialog';
import RoundPanel from 'pages/Marketplaces/components/RoundPanel';
import ErrorSnackbar from 'pages/Notifications/components/ErrorSnackbar/ErrorSnackbar';
import { getAlerts, removeAlert } from 'api/Notification/alert';
import { useHistory, useLocation } from 'react-router';
import { getSPSAlertsConfig } from 'reducers/config/actions';
import handleRequestError from 'reducers/auth/handleRequestError';
import { ConfigContext } from 'contexts/ConfigContext';
import getProductLinks from 'utils/config/getProductLinks';
import { ActionHeader } from 'components/Page/Header';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchFilter from 'components/SearchFilter/SearchFilter';
import { Stack } from '@mui/system';
import { useSearch } from 'hooks/useSearch';
import NotificationsListTable from './components/NotificationsListTable';
import formatAlert from './utils/formatAlert';
import { Row } from './types';

const NotificationsList: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<{ error: string }>();
  const { configId } = useContext(ConfigContext);

  const [alerts, setAlerts] = useState<Row[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [removeDialog, setRemoveDialog] = useState(false);
  const [idToRemove, setIdToRemove] = useState<number | null>(null);
  const [errorSnackbar, setErrorSnackbar] = useState<boolean>(false);

  const accessToken = useSelector((state) => state.auth.configAccessToken);
  const config = useSelector((state) => state.config.sps);

  const productLinks = useMemo(() => getProductLinks(config), [config]);

  const handleOpenModal = useCallback(() => {
    setRemoveDialog(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setRemoveDialog(false);
    setIdToRemove(null);
  }, []);

  const {
    handleSearchClear,
    handleSearchSubmit,
    handleSearchChange,
    searchFilter,
    requestSearchFilter,
  } = useSearch();

  const fetchAlerts = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getAlerts(accessToken, configId, requestSearchFilter);

      if (data) {
        const formater = formatAlert(productLinks);
        setAlerts(data.map(formater));
      }
    } catch (error) {
      dispatch(handleRequestError(error, 'fetchAlerts'));
    } finally {
      setLoading(false);
    }
  }, [accessToken, configId, productLinks, dispatch, requestSearchFilter]);

  const handleRemove = useCallback(
    async (id: number) => {
      try {
        await removeAlert(accessToken, id);
        setIdToRemove(null);
      } catch (error) {
        dispatch(handleRequestError(error, 'removeAlert'));
      } finally {
        fetchAlerts();
      }
    },
    [accessToken, fetchAlerts, dispatch]
  );

  useEffect(() => {
    if (accessToken) {
      // wait for save/update alerts
      const timer = setTimeout(() => fetchAlerts(), 500);
      setAlerts([]);

      return () => {
        clearTimeout(timer);
      };
    }

    return () => {
      //
    };
  }, [fetchAlerts, accessToken]);

  // get brands, categories, retailers, products
  useEffect(() => {
    if (configId) {
      dispatch(getSPSAlertsConfig(configId));
    }
  }, [dispatch, configId]);

  useEffect(() => {
    if (location.state && location.state.error) {
      setErrorSnackbar(true);
    }
  }, [location.state]);

  return (
    <Page
      title="Alerts"
      navMargin="0 28px"
      NavWrapper={ActionHeader}
      renderNav={() => (
        <>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{ ml: 'auto' }}
          >
            <SearchFilter
              onChange={handleSearchChange}
              onSubmit={handleSearchSubmit}
              onClear={handleSearchClear}
              value={searchFilter}
              isDisabled={false}
            />
          </Stack>
        </>
      )}
    >
      <ActionDialog
        isOpen={removeDialog}
        handleClose={handleCloseModal}
        onDangerButtonClick={() => {
          if (idToRemove) {
            handleRemove(idToRemove);
            setIdToRemove(null);
            handleCloseModal();
          }
        }}
        title="Confirm deletion"
        color="danger"
        description="You are about to permanently remove data. You will not be able to recover it if you proceed. Delete data?"
        dangerButtonText="Delete"
      />
      <RoundPanel color="#fff" sx={{ margin: '0 24px' }}>
        <NotificationsListTable
          rows={alerts}
          handleRemove={(id: number) => {
            setIdToRemove(id);
            handleOpenModal();
          }}
          isLoading={isLoading}
        />
      </RoundPanel>
      <Mountains grey />
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'absolute', bottom: 41, right: 48 }}
        onClick={() => {
          history.push('/price-analysis/alerts/create');
        }}
      >
        <AddIcon />
      </Fab>
      <ErrorSnackbar
        message={location?.state?.error || ''}
        setOpen={setErrorSnackbar}
        isOpen={errorSnackbar}
      />
    </Page>
  );
};

export default NotificationsList;
