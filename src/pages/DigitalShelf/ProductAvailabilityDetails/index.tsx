import React, { useContext, useEffect } from 'react';
import { styled } from '@mui/system';
import Switcher from 'components/Switcher';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrentTableView,
  setInitialTableView,
  setCurrentTableFilter,
  setInitialTableFilter,
  AvailabilityFilterOptions,
} from 'reducers/productAvailability';
import getAvailabilityDetails from 'reducers/productAvailability/getAvailabilityDetails';
import { ConfigContext } from 'contexts/ConfigContext';
import { TableView } from 'types/KPITable';
import FakeRadio from './components/FakeRadio';
import { DetailsTable } from './components/DetailsTable';

const StyledBox = styled(Box)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[400]};
`;

const StyledSwitcherWrapper = styled('div')`
  margin-right: 100px;
`;

type ProductAvailabilityDetailsProps = {
  searchFilter: string | undefined;
};

const ProductAvailabilityDetails: React.FC<ProductAvailabilityDetailsProps> = ({
  searchFilter,
}) => {
  const { regionCode } = useContext(ConfigContext);
  const { tableViewOptions, tableView, tableFilter, tableFilterOptions } =
    useSelector((state: RootState) => state.productAvailability);

  const dispatch = useDispatch();

  const handleViewChange = (view: TableView) => {
    dispatch(setCurrentTableView(view));
  };

  const handleFilterChange = (filter: AvailabilityFilterOptions) => {
    dispatch(setCurrentTableFilter(filter));
  };

  useEffect(() => {
    dispatch(setInitialTableView());
    dispatch(setInitialTableFilter());
    dispatch(getAvailabilityDetails(regionCode, searchFilter));
  }, [dispatch, regionCode, searchFilter]);

  return (
    <>
      <StyledBox pl="30px" pb="15px" pt="20px" width={1} display="flex">
        <StyledSwitcherWrapper>
          <Switcher<TableView>
            active={tableView}
            options={tableViewOptions}
            action={(option) => handleViewChange(option)}
            title="Show by:"
          />
        </StyledSwitcherWrapper>
        <Switcher<AvailabilityFilterOptions>
          active={tableFilter}
          options={tableFilterOptions}
          action={(option) => handleFilterChange(option)}
          title=""
          isPrimary={false}
          IconComponent={FakeRadio}
        />
        <div />
      </StyledBox>
      <DetailsTable />
    </>
  );
};

export default ProductAvailabilityDetails;
