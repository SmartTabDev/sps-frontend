import React, { useCallback, useMemo, useEffect, useContext } from 'react';
import { Route } from 'react-router-dom';
import { Marketplace } from 'reducers/auth/auth';
import { Filter } from '@cubejs-client/core';
import useExpandedFilters from 'hooks/useExpandedFilters';
import orderByName from 'utils/orderByName';
import { ConfigContext } from 'contexts/ConfigContext';
import Page from 'components/Page/Page';
import { ActionHeader } from 'components/Page/Header';
import { FormatShortDate } from 'components/FormatDate/FormatDate';
import moment from 'moment';
import SearchField from 'components/SearchField';
import { startCase } from 'lodash';
import { Stack, styled } from '@mui/system';
import FiltersDrawerPlaced from 'components/FiltersDrawer/FiltersDrawerPlaced';
import { Typography } from '@mui/material';
import { MenuContext, MenuProvider } from 'contexts/MenuContext';
import { MarketplaceProductsTable } from './components/Table/MarketplaceProductsTable';
import MarketplaceContext from './MarketplaceContext';
import { ProductPageContainer } from './ProductPage';
import { useListingData } from './hooks/useListingData';
import { getMarketplaceUrl } from './utils/getMarketplaceUrl';
import useMarketplaceSearch from './hooks/filters/useMarketplaceSearch';
import useTableOrder from '../../hooks/useTableOrder';
import { useConfig } from './hooks/useConfig';
import {
  createBaseFilters,
  createExpandedFilters,
  createIdsFilter,
} from './hooks/filters/useCubeFilters';
import Filters, {
  filtersInitialState,
  ExpandedFilters,
} from './components/Filters/Filters';
import useMarketplaceCubes from './hooks/utils/useMarketplaceCubes';
import useBrandsQuery from './components/Filters/hooks/useBrandsQuery';
import { useCubeJsAPI } from './hooks/useCubeJsAPI';
import { useRunsQuery } from './hooks/useRunsQuery';

const StyledDate = styled(Typography)`
  margin-left: 27px;
  line-height: 40px;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-right: 35px;
  font-weight: 600;
  font-size: 16px;

  &:empty {
    display: none;
  }
`;

type Props = {
  marketplace: Marketplace;
};

const mapBrands = ({ brand }: { brand: string }) => ({ name: brand });

export const MarketplacePage: React.FC<Props> = ({ marketplace }) => {
  const { configId } = useContext(ConfigContext);
  const cubes = useMarketplaceCubes(marketplace);
  const { clientRetailerName, ids } = useConfig(marketplace, configId);
  const runsData = useRunsQuery(marketplace);
  const { lastRun: runTime = '' } = runsData;

  // FETCH BRANDS
  const brandsQuery = useBrandsQuery(cubes, runTime, ids);
  const { fetchData: fetchBrands, list: brands } = useCubeJsAPI<
    { name: string },
    { brand: string }
  >('brands', brandsQuery, [], mapBrands);

  const {
    value: searchValue,
    debouncedValue: debouncedSearchValue,
    setValue: setSearchValue,
  } = useMarketplaceSearch(marketplace);

  const { orderKey, orderType, handleOrderChange } =
    useTableOrder('productName');

  const baseFilters = useMemo(
    () => ({
      search: debouncedSearchValue,
      order: {
        type: orderType,
        key: orderKey,
      },
      ids,
    }),
    [debouncedSearchValue, orderKey, orderType, ids]
  );

  const {
    state: expandedFilters,
    requestState,
    dispatch: filtersDispatch,
    handleClear,
    handleApply,
    refreshKey,
  } = useExpandedFilters<ExpandedFilters>(filtersInitialState);

  const initialFilter = useMemo(() => {
    const cubeIdFilter = createIdsFilter(cubes, ids);
    return cubeIdFilter;
  }, [cubes, ids]);

  const getAllFilters = useCallback(
    (expandedFiltersData: ExpandedFilters) => {
      const cubeIdFilter = createIdsFilter(cubes, ids);
      const cubeBaseFilters = createBaseFilters(
        cubes,
        marketplace,
        baseFilters
      );

      // return expanded filters based on request state
      const cubeExpandedFilters = createExpandedFilters(
        cubes,
        clientRetailerName,
        expandedFiltersData,
        expandedFiltersData.brand.map((b) => b.name),
        brands.length
      );
      return [cubeIdFilter, ...cubeBaseFilters, ...cubeExpandedFilters].filter(
        Boolean
      ) as Filter[];
    },
    [cubes, marketplace, clientRetailerName, baseFilters, ids, brands.length]
  );

  const cubeFilters = useMemo(
    () => getAllFilters(requestState),
    [getAllFilters, requestState]
  );

  const filters = useMemo(
    () => ({
      cubeFilters,
      initialFilter,
      baseFilters,
    }),
    [cubeFilters, initialFilter, baseFilters]
  );

  const { noData, isMore, loadNext, clientOffers, uniqueProducts, isLoading } =
    useListingData(marketplace, clientRetailerName, filters, runsData);

  const orderedBrands = useMemo(() => orderByName(brands), [brands]);

  useEffect(() => {
    if (runTime && ids.length) {
      fetchBrands();
    }
  }, [runTime, fetchBrands, ids]);

  const baseUrl = useMemo(() => {
    return getMarketplaceUrl(marketplace);
  }, [marketplace]);

  const marketplaceContext = useMemo(() => {
    return {
      marketplace,
      baseUrl,
      clientName: clientRetailerName,
    };
  }, [marketplace, baseUrl, clientRetailerName]);

  return (
    <MarketplaceContext.Provider value={marketplaceContext}>
      <Page
        title={startCase(marketplace)}
        NavWrapper={ActionHeader}
        renderNav={() => (
          <>
            {runTime && (
              <StyledDate>
                <FormatShortDate year>{moment(runTime)}</FormatShortDate>
              </StyledDate>
            )}
            <Stack
              spacing={2}
              direction="row"
              alignItems="center"
              sx={{ ml: 'auto' }}
            >
              <SearchField
                value={searchValue}
                onChange={setSearchValue}
                label="Search"
                id="marketplace-search"
              />
              <FiltersDrawerPlaced title="Filters" drawerWidth={390}>
                <Filters
                  handleClear={handleClear}
                  handleApply={handleApply}
                  filters={expandedFilters}
                  dispatch={filtersDispatch}
                  runTime={runTime}
                  refreshKey={refreshKey}
                  ids={ids}
                  brands={orderedBrands}
                />
              </FiltersDrawerPlaced>
            </Stack>
          </>
        )}
        scrollable
      >
        <Route path={`/marketplaces/${marketplace}/product/:productId`}>
          <ProductPageContainer runTime={runTime} />
        </Route>
        <Route path={`/marketplaces/${marketplace}`}>
          <Stack spacing="24px" alignItems="stretch" mx="24px">
            <MarketplaceProductsTable
              products={uniqueProducts}
              clientOffers={clientOffers}
              loadNext={loadNext}
              isMore={isMore}
              isLoading={isLoading}
              noData={noData}
              orderType={filters.baseFilters.order.type}
              orderKey={filters.baseFilters.order.key}
              handleOrderChange={handleOrderChange}
            />
          </Stack>
        </Route>
      </Page>
    </MarketplaceContext.Provider>
  );
};
