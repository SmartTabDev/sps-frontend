import React, { useState, useEffect, useContext } from 'react';
import Button from 'components/Button';
import FullSizeModal from 'components/FullSizeModal/FullSizeModal';
import Page from 'components/Page/Page';
import SearchFilter from 'components/SearchFilter/SearchFilter';
import moment from 'moment-timezone';
import { ConfigContext } from 'contexts/ConfigContext';
import { Stack } from '@mui/system';
import { formatRequestDate } from 'components/FormatDate/FormatDate';
import { useDispatch } from 'react-redux';
import { useSearch } from 'hooks/useSearch';
import {
  getRatingAndReviews,
  getRatingDetails,
} from 'reducers/ratingAndReviews/actions';
import { ActionHeader } from 'components/Page/Header';
import { TotalRatings } from './components/TotalRatings/TotalRatings';
import { RetailerChart } from './components/RetailerChart';
import { DailyChart } from './components/DailyChart';
import Details from './components/Details';

const RatingAndReviews: React.FC = () => {
  const { regionCode } = useContext(ConfigContext);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [date, setDate] = useState<moment.Moment>(moment(Date.now()));

  const {
    handleSearchClear,
    handleSearchSubmit,
    handleSearchChange,
    searchFilter,
    requestSearchFilter,
  } = useSearch();

  useEffect(() => {
    dispatch(getRatingAndReviews(regionCode));
  }, [dispatch, regionCode]);

  useEffect(() => {
    dispatch(getRatingDetails(regionCode, requestSearchFilter));
  }, [dispatch, regionCode, requestSearchFilter]);

  useEffect(() => {
    const requestDate = formatRequestDate(date);
    dispatch(getRatingDetails(regionCode, requestSearchFilter, requestDate));
  }, [dispatch, date, regionCode, requestSearchFilter]);

  return (
    <Page
      title="Ratings & Reviews"
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
      date={moment(Date.now())}
      NavWrapper={ActionHeader}
      scrollable
    >
      <Stack spacing="24px" alignItems="stretch" mx="24px">
        <TotalRatings />
        <DailyChart />
        <RetailerChart />
      </Stack>
      <FullSizeModal
        headerProps={{
          title: 'Rating & Reviews in detail',
          titleDateFilter: true,
          date,
          showYear: true,
          onDateChange: setDate,
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
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <Details />
      </FullSizeModal>
    </Page>
  );
};

export default RatingAndReviews;
