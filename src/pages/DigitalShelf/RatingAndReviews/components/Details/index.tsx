import React from 'react';
import Switcher from 'components/Switcher';
import Box from '@mui/material/Box';
import { TableView } from 'types/KPITable';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentView,
  setInitialView,
} from 'reducers/ratingAndReviews/actions';
import { DetailsTable } from './components/DetailsTable';

const Details: React.FC = () => {
  const { viewOptions, view } = useSelector(
    (state: RootState) => state.ratingAndReviews
  );

  const dispatch = useDispatch();

  const handleOnChange = (val: TableView) => {
    dispatch(setCurrentView(val));
  };

  React.useEffect(() => {
    dispatch(setInitialView());
  }, [dispatch]);

  return (
    <>
      <Box
        pl="30px"
        pb="15px"
        pt="20px"
        width={1}
        sx={{
          backgroundColor: (theme) => theme.palette.common.white,
          borderBottom: (theme) => `1px solid ${theme.palette.grey[200]}`,
        }}
      >
        <Switcher<TableView>
          active={view}
          options={viewOptions}
          action={(option) => handleOnChange(option)}
          title="Show by:"
        />
      </Box>

      <DetailsTable />
    </>
  );
};

export default Details;
