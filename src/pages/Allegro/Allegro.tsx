import React, { useCallback, useContext, useState } from 'react';
import { Stack, Typography, Box, styled } from '@mui/material';
import useExpandedFilters, { FilterActionType } from 'hooks/useExpandedFilters';
import Page from 'components/Page/Page';
import { ActionHeader } from 'components/Page/Header';
import { ContentContainer } from 'components/FiltersDrawer/FiltersDrawer';
import FiltersDrawerPlaced from 'components/FiltersDrawer/FiltersDrawerPlaced';
import { ConfigContext } from 'contexts/ConfigContext';
import SearchFilter from 'components/SearchFilter/SearchFilter';
import { useTimeoutFn } from 'react-use';
import LegendLine from 'components/LegendLine';
import { AllegroShopeeHistory } from 'components/Charts/AllegroShopeeHistory';
import Reports from 'components/ReportPopper/Reports';
import {
  SimpleModal,
  useSimpleModal,
} from 'components/SimpleModal/SimpleModal';
import { flatObjectValues } from 'utils/flatObjectValues';
import { usePage } from 'hooks/usePage';
import { usePagination } from 'hooks/usePagination';
import { PaginationBottomBar } from 'components/PaginationBottomBar/PaginationBottomBar';
import useTableOrder from 'hooks/useTableOrder';
import ExpandedFilters, {
  allegroFiltersInitialState,
  AllegroFilters,
} from './components/ExpandedFilters/ExpandedFilters';
import { useTotalProducts } from './hooks/useTotalProducts';
import { useRuns } from './hooks/useRuns';
import { useOfferList } from './hooks/useOfferList';
import { useFilterList } from './hooks/useFilterList';
import { useOfferHistory } from './hooks/useOfferHistory';
import { useReports } from './hooks/useReports';
import AllegroTable from './AllegroTable';

const ModalTypography = styled(Typography)`
  fontsize: 14px;
  letterspacing: 0.04em;
  color: #525f81;
`;

const Allegro: React.FC = () => {
  const [offerId, setOfferId] = useState<string | null>(null);
  const { openModal, handleModalOpen, handleModalClose } =
    useSimpleModal(setOfferId);
  const { regionCode } = useContext(ConfigContext);

  const { page, resetPage, handlePageChange } = usePage();

  const {
    dispatch: filterDispatch,
    state: filterState,
    requestState,
    refreshKey,
    handleClear,
    handleApply,
  } = useExpandedFilters<AllegroFilters>(allegroFiltersInitialState, resetPage);

  const {
    selectedBrands,
    searchFilter: requestSearchFilter,
    priceRange,
    badges,
  } = requestState;
  const { searchFilter } = filterState;

  const runs = useRuns(regionCode);

  // hide no data on open page
  const [showNoData, setShowNoData] = useState<boolean>(false);

  useTimeoutFn(() => setShowNoData(true), 3000);

  const { total, isTotalProductsLoading } = useTotalProducts(
    regionCode,
    runs,
    selectedBrands,
    priceRange,
    badges,
    requestSearchFilter
  );

  const { limit, pageCount, offset } = usePagination(page, total);

  // table order
  const { orderKey, orderType, handleOrderChange } = useTableOrder(
    'pageProductName',
    resetPage
  );

  const { offers, isOfferListLoading } = useOfferList(
    regionCode,
    offset,
    orderKey,
    orderType,
    runs,
    selectedBrands,
    priceRange,
    badges,
    requestSearchFilter
  );

  // search
  const handleSearchChange = useCallback(
    (value, send = false) => {
      filterDispatch(
        {
          type: FilterActionType.SET,
          payload: {
            key: 'searchFilter',
            value,
          },
        },
        send
      );
    },
    [filterDispatch]
  );

  const handleSearchSubmit = useCallback(() => {
    handleApply();
    resetPage();
  }, [handleApply, resetPage]);

  const handleSearchClear = useCallback(() => {
    handleSearchChange('', true);
    resetPage();
  }, [handleSearchChange, resetPage]);

  const { brands, prices } = useFilterList(regionCode, runs);

  const modalOffer = offerId ? offers.find((o) => o.offerId === offerId) : null;
  const { pricesHistory, salesHistory, isHistoryLoading } = useOfferHistory(
    regionCode,
    offerId
  );
  const salesData = flatObjectValues(salesHistory);
  const pricesData = flatObjectValues(pricesHistory);
  const xData = (pricesHistory || []).map((item) => Object.keys(item)).flat();

  // reports
  const { reports, handleReportClick } = useReports();

  return (
    <>
      <Page
        title="Allegro"
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
                isDisabled={isOfferListLoading}
              />
              <Reports
                list={reports}
                isLoading={false}
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
                    brands={brands}
                    prices={prices}
                  />
                </ContentContainer>
              </FiltersDrawerPlaced>
            </Stack>
          </>
        )}
        NavWrapper={ActionHeader}
      >
        <AllegroTable
          handleModalOpen={handleModalOpen}
          limit={limit}
          offers={offers}
          isOfferListLoading={isOfferListLoading}
          showNoData={showNoData}
          orderKey={orderKey}
          orderType={orderType}
          handleOrderChange={handleOrderChange}
        />
        <PaginationBottomBar
          page={page}
          pageCount={pageCount}
          handlePageChange={handlePageChange}
          total={total}
          isLoading={isTotalProductsLoading}
        />
      </Page>
      <SimpleModal openModal={openModal} handleModalClose={handleModalClose}>
        <Stack direction="row" justifyContent="space-between">
          <Box>
            <ModalTypography
              sx={{
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Price History
            </ModalTypography>
            <ModalTypography
              sx={{
                fontWeight: 700,
                mt: '14px',
              }}
            >
              {modalOffer?.pageProductName}
            </ModalTypography>
          </Box>
          <Stack direction="column">
            <Box marginRight={4} display="flex" alignItems="center">
              <LegendLine $color="#27AE60" /> Price
            </Box>
            <Box marginRight={4} display="flex" alignItems="center">
              <LegendLine $color="#27AE60" $type="dashed" /> Sales last 30 days
            </Box>
          </Stack>
        </Stack>
        <AllegroShopeeHistory
          salesData={salesData}
          pricesData={pricesData}
          xData={xData}
          isLoading={isHistoryLoading}
          offerId={offerId}
        />
      </SimpleModal>
    </>
  );
};

export default Allegro;
