import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { Box, Stack } from '@mui/system';
import { ConfigContext } from 'contexts/ConfigContext';
import { useDispatch, useSelector } from 'react-redux';
import getAvailability from 'reducers/productAvailability/getAvailability';
import Button from 'components/Button';
import FullSizeModal from 'components/FullSizeModal/FullSizeModal';
import Page from 'components/Page/Page';
import SearchFilter from 'components/SearchFilter/SearchFilter';
import { useSearch } from 'hooks/useSearch';
import { ActionHeader } from 'components/Page/Header';
import Grid from '@mui/material/Grid';
import ProductAvailabilityDetails from '../ProductAvailabilityDetails';
import TotalProducts from './components/TotalProducts';
import TotalProductsOverTime from './components/TotalProductsOverTime';
import TotalUnavailable from './components/TotalUnavailable';
import TotalsPer from './components/TotalsPer';

const ProductAvailability: React.FC = () => {
  const { regionCode } = useContext(ConfigContext);
  const dispatch = useDispatch();
  const { availabilityLoading, totalsOverTime, totalsUnavailable } =
    useSelector((state: RootState) => state.productAvailability);
  const { cubeAccessToken } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const {
    handleSearchClear,
    handleSearchSubmit,
    handleSearchChange,
    searchFilter,
    requestSearchFilter,
  } = useSearch();

  useEffect(() => {
    dispatch(getAvailability(regionCode));
  }, [dispatch, cubeAccessToken, regionCode]);

  return (
    <Page
      date={moment(Date.now())}
      title="Product Availability"
      navMargin="0 24px"
      renderNav={() => (
        <Button
          onClick={() => setModalOpen(true)}
          size="small"
          style={{ marginLeft: 'auto' }}
        >
          Details
        </Button>
      )}
      NavWrapper={ActionHeader}
      scrollable
    >
      <Stack spacing="24px" alignItems="stretch" mx="24px">
        <TotalProducts />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing="24px">
            <Grid xs={6} item>
              <TotalsPer isLoading={availabilityLoading} />
            </Grid>
            <Grid xs={6} item>
              <Stack spacing="24px">
                <TotalProductsOverTime
                  data={totalsOverTime}
                  isLoading={availabilityLoading}
                />
                <TotalUnavailable
                  data={totalsUnavailable}
                  isLoading={availabilityLoading}
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Stack>
      <FullSizeModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        headerProps={{
          title: 'Product availability in detail',
          titleDateFilter: false,
          renderNav: () => (
            <Stack sx={{ ml: 'auto' }}>
              <SearchFilter
                onChange={handleSearchChange}
                onSubmit={handleSearchSubmit}
                onClear={handleSearchClear}
                value={searchFilter}
                isDisabled={false}
              />
            </Stack>
          ),
        }}
      >
        <ProductAvailabilityDetails searchFilter={requestSearchFilter} />
      </FullSizeModal>
    </Page>
  );
};

export default ProductAvailability;
