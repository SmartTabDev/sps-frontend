import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Stack, Typography, Box } from '@mui/material';
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
import {
  SimpleModal,
  useSimpleModal,
} from 'components/SimpleModal/SimpleModal';
import { flatObjectValues } from 'utils/flatObjectValues';
import { usePage } from 'hooks/usePage';
import { usePagination } from 'hooks/usePagination';
import { PaginationBottomBar } from 'components/PaginationBottomBar/PaginationBottomBar';
import ExpandedFilters, {
  shopeeFiltersInitialState,
  ShopeeFilters,
} from './components/ExpandedFilters/ExpandedFilters';
import { useTotalProducts } from './hooks/useTotalProducts';
import { useRuns } from './hooks/useRuns';
import { useOfferList } from './hooks/useOfferList';
import { useFilterList } from './hooks/useFilterList';
import { useOfferHistory } from './hooks/useOfferHistory';
import { useSellers } from './hooks/useSellers';
import ShopeeTable from './ShopeeTable';

const Shopee: React.FC = () => {
  const [offerId, setOfferId] = useState<string | null>(null);
  const { regionCode } = useContext(ConfigContext);
  const { openModal, handleModalOpen, handleModalClose } =
    useSimpleModal(setOfferId);

  const { page, resetPage, handlePageChange } = usePage();

  const {
    dispatch: filterDispatch,
    state: filterState,
    requestState,
    handleClear,
    handleApply,
    refreshKey,
  } = useExpandedFilters<ShopeeFilters>(shopeeFiltersInitialState, resetPage);

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

  useTimeoutFn(() => setShowNoData(true), 1000);

  const { total, isTotalProductsLoading } = useTotalProducts(
    regionCode,
    runs,
    selectedBrands,
    priceRange,
    badges,
    requestSearchFilter
  );

  const { limit, pageCount, offset } = usePagination(page, total);

  const { offers, shopIds, isOfferListLoading } = useOfferList(
    regionCode,
    offset,
    runs,
    selectedBrands,
    priceRange,
    badges,
    requestSearchFilter
  );

  const { sellers } = useSellers(regionCode, shopIds);

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

  const { prices } = useFilterList(regionCode, runs); // brands

  const modalOffer = offerId ? offers.find((o) => o.offerId === offerId) : null;
  const { pricesHistory, salesHistory, isHistoryLoading } = useOfferHistory(
    regionCode,
    offerId
  );

  useEffect(() => {
    handlePageChange(null, 1);
  }, [refreshKey, handlePageChange]);

  const salesData = flatObjectValues(salesHistory);
  const pricesData = flatObjectValues(pricesHistory);
  const xData = (pricesHistory || []).map((item) => Object.keys(item)).flat();

  return (
    <>
      <Page
        title="Shopee"
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
              <FiltersDrawerPlaced title="Filters" drawerWidth={390}>
                <ContentContainer>
                  <ExpandedFilters
                    filterDispatch={filterDispatch}
                    filterState={filterState}
                    handleClear={handleClear}
                    handleApply={handleApply}
                    prices={prices}
                  />
                </ContentContainer>
              </FiltersDrawerPlaced>
            </Stack>
          </>
        )}
        NavWrapper={ActionHeader}
      >
        <ShopeeTable
          handleModalOpen={handleModalOpen}
          limit={limit}
          offers={offers}
          isOfferListLoading={isOfferListLoading}
          showNoData={showNoData}
          sellers={sellers}
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
            <Typography
              sx={{
                textTransform: 'uppercase',
                fontSize: '14px',
                letterSpacing: '0.04em',
                fontWeight: 600,
                color: '#525F81',
              }}
            >
              Price History
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                letterSpacing: '0.04em',
                fontWeight: 700,
                mt: '14px',
                color: '#525F81',
              }}
            >
              {modalOffer?.pageProductName}
            </Typography>
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

export default Shopee;
