import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { Skeleton, Stack, Switch, Typography } from '@mui/material'; // Pagination,
import useExpandedFilters, { FilterActionType } from 'hooks/useExpandedFilters';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentView, setFilter } from 'reducers/productAnalysis/actions';
import ActionHeaderButton from 'components/ActionHeaderButton/ActionHeaderButton';
import BottomBar from 'components/BottomBar/BottomBar';
import Page from 'components/Page/Page';
import { ActionHeader } from 'components/Page/Header';
import { ContentContainer } from 'components/FiltersDrawer/FiltersDrawer';
import FiltersDrawerPlaced from 'components/FiltersDrawer/FiltersDrawerPlaced';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded';
import { getSPSConfigForTable } from 'api/getConfig';
import {
  getSPSConfigProducts,
  setSPSConfigForTable,
} from 'reducers/config/actions';
import { ConfigContext } from 'contexts/ConfigContext';
import { QUERY_DATE_FORMAT } from 'components/FormatDate/FormatDate';
import moment from 'moment';
import DateRangePicker from 'components/DateRangePicker/DateRangePicker';
import { DateRange } from 'reducers/productComparison/productComparison';
import { Box } from '@mui/system';
import { useSnackbar } from 'notistack';
import SearchFilter from 'components/SearchFilter/SearchFilter';
import useUsername, { USERNAMES } from 'hooks/useUsername';
import ExpandedFilters, {
  spsFiltersInitialState,
} from './components/ExpandedFilters/ExpandedFilters';
import { PriceAnalysisFilters } from './components/ExpandedFilters/types';
import Reports from '../../../components/ReportPopper/Reports';
import usePriceAnalysisTimeframe from './utils/usePriceAnalysisTimeframe';
import ProductAnalysisContainer from './ProductAnalysisContainer';
import useReports from './hooks/useReports';

const ProductAnalysisPage: React.FC = () => {
  const { configId } = useContext(ConfigContext);
  const dispatch = useDispatch();
  //   const [isIndex, setIsIndex] = useLocalStorage<boolean>('is-index', false);
  const [isIndex, setIsIndex] = useState<boolean>(false);
  const [isDense, setIsDense] = useLocalStorage<boolean>('is-dense', false);
  const [recaps, setRecaps] = useLocalStorage<boolean>('show-recaps', true);

  const { username } = useUsername();

  const configAccessToken = useSelector(
    (state: RootState) => state.auth.configAccessToken
  );
  const viewOptions = useSelector(
    (state: RootState) => state.productAnalysis.viewOptions || []
  );
  const view =
    useSelector((state: RootState) => state.productAnalysis.view) || 'Daily';
  const products = useSelector((state) => state.config.sps.products);
  const searchFilter = useSelector(
    (state: RootState) => state.productAnalysis.filter
  );
  const isConfigLoading = useSelector(
    (state: RootState) => state.config.isConfigLoading
  );

  const { enqueueSnackbar } = useSnackbar();

  const { list, isLoading, handleReportClick } = useReports();

  const {
    dispatch: filterDispatch,
    state: filterState,
    refreshKey,
    handleClear,
    requestState,
    handleApply,
  } = useExpandedFilters<PriceAnalysisFilters>(spsFiltersInitialState);

  // set initial timeframe
  usePriceAnalysisTimeframe(filterDispatch, refreshKey);

  const handleSwitchInterval = (e: any, checked: boolean) => {
    dispatch(setCurrentView(checked ? 'Daily' : 'Hourly'));
  };

  const { timeframe } = requestState;
  const fetchConfigForDates = useCallback(async () => {
    if (timeframe) {
      const config = await getSPSConfigForTable(
        configAccessToken,
        configId,
        timeframe
      );
      dispatch(setSPSConfigForTable({ config }));
    }
  }, [configAccessToken, configId, timeframe, dispatch]);

  const handleTimeframeChange = useCallback(
    ({ startDate, endDate }: DateRange) => {
      if (startDate && endDate) {
        filterDispatch(
          {
            type: FilterActionType.SET,
            payload: {
              key: 'timeframe',
              value: [startDate || '', endDate || startDate || ''],
            },
          },
          true
        );
      }
    },
    [filterDispatch]
  );

  // on empty search result callback
  const onEmptySearchResult = useCallback(() => {
    enqueueSnackbar('There is no data matching your query.', {
      variant: 'error',
    });
  }, [enqueueSnackbar]);

  const handleSearchChange = useCallback(
    (value) => {
      dispatch(setFilter(value));
    },
    [dispatch]
  );

  const handleSearchSubmit = useCallback(
    (configFilter: string) => {
      if (configId) {
        dispatch(
          getSPSConfigProducts(configId, configFilter, onEmptySearchResult)
        );
      }
    },
    [dispatch, configId, onEmptySearchResult]
  );

  const handleSearchClear = useCallback(() => {
    dispatch(setFilter(''));
    handleSearchSubmit('');
  }, [dispatch, handleSearchSubmit]);

  useEffect(() => {
    fetchConfigForDates();
  }, [fetchConfigForDates]);

  const [from, to] = timeframe || (['', ''] as [string, string]);

  return (
    <Page
      title="Price Performance"
      renderNav={() => (
        <>
          {from || to ? (
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ width: 'fit-content' }}>
                <DateRangePicker
                  setDateRange={handleTimeframeChange}
                  startDate={moment(from, QUERY_DATE_FORMAT)}
                  endDate={moment(to, QUERY_DATE_FORMAT)}
                />
              </Box>
            </Box>
          ) : null}
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
              isDisabled={isConfigLoading || !configId}
            />
            <ActionHeaderButton
              tooltipProps={{
                title: recaps ? 'Hide summary' : 'Show summary',
              }}
              iconButtonProps={{
                onClick: () => {
                  setRecaps(!recaps);
                },
              }}
              ActiveIcon={VisibilityRoundedIcon}
              InactiveIcon={VisibilityOffRoundedIcon}
              isActive={Boolean(recaps)}
            />
            <Reports
              list={list}
              isLoading={isLoading}
              handleReportClick={handleReportClick}
            />
            <FiltersDrawerPlaced title="Filters" drawerWidth={390}>
              <ContentContainer>
                <ExpandedFilters
                  filterDispatch={filterDispatch}
                  filterState={filterState}
                  refreshKey={refreshKey}
                  handleClear={handleClear}
                  handleApply={handleApply}
                />
              </ContentContainer>
            </FiltersDrawerPlaced>
          </Stack>
        </>
      )}
      NavWrapper={ActionHeader}
    >
      {isDense === undefined || isIndex === undefined ? null : (
        <ProductAnalysisContainer
          dateRange={requestState.timeframe}
          filters={requestState}
          configProducts={products}
          recaps={recaps ?? true}
          isDense={isDense}
          isIndex={isIndex}
        />
      )}
      <BottomBar>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          <Stack direction="row" spacing={8}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography sx={{ color: '#3B455E', fontSize: '14px' }}>
                Dense view
              </Typography>
              {isDense === undefined ? (
                <Skeleton width={140} height={40} />
              ) : (
                <Switch
                  color="primary"
                  onChange={() => {
                    setIsDense(!isDense);
                  }}
                  checked={isDense}
                />
              )}
            </Stack>
            {viewOptions.length === 0 && <Skeleton width={140} height={40} />}
            {viewOptions.length > 1 ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography sx={{ color: '#3B455E', fontSize: '14px' }}>
                  Hours
                </Typography>
                <Switch
                  color="primary"
                  onChange={handleSwitchInterval}
                  checked={view === 'Daily'}
                />
                <Typography sx={{ color: '#3B455E', fontSize: '14px' }}>
                  Days
                </Typography>
              </Stack>
            ) : null}
            {USERNAMES.some((e) => e === username) && (
              <>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography sx={{ color: '#3B455E', fontSize: '14px' }}>
                    Prices
                  </Typography>

                  {isIndex === undefined ? (
                    <Skeleton width={140} height={40} />
                  ) : (
                    <Switch
                      color="primary"
                      onChange={() => {
                        setIsIndex(!isIndex);
                      }}
                      checked={isIndex}
                    />
                  )}

                  <Typography sx={{ color: '#3B455E', fontSize: '14px' }}>
                    RSP Index
                  </Typography>
                </Stack>
              </>
            )}
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            {/* <Typography sx={{ color: '#3B455E', fontSize: '14px' }}>
              Total products:{' '}
              <Typography
                sx={{
                  color: 'primary.main',
                  fontSize: '14px',
                }}
                component="span"
              >
                {products.length}
              </Typography>
            </Typography>
            <Pagination
              count={10}
              color="primary"
              showFirstButton
              showLastButton
            /> */}
          </Stack>
        </Stack>
      </BottomBar>
    </Page>
  );
};

export default ProductAnalysisPage;
