import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/system';
import Panel from 'components/Panel';
import ProductsTotalsPer from 'components/Charts/ProductsTotalsPer';
import LinearLoader from 'components/LinearLoader';
import LoaderWrapper from 'components/LoaderWrapper';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import Switcher from 'components/Switcher';
import { ChartView } from 'types/ProductAvailability';
import { setCurrentChartView } from 'reducers/productAvailability';
import { getTotalsPer } from 'reducers/productAvailability/getTotalsPer';
import { ConfigContext } from 'contexts/ConfigContext';

const StyledBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  width: 100%;

  span {
    color: ${({ theme }) => theme.palette.blueGrey[400]};
    margin-right: 15px;
    font-size: 14px;
    font-weight: 300;
    text-transform: uppercase;
  }

  li {
    font-size: 12px;
    text-transform: uppercase;
  }
`;

const StyledDataBox = styled(Panel)`
  display: flex;
  background-color: ${({ theme }) => theme.palette.common.white};
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .echarts-for-react {
    margin-top: 25px;
    width: 100%;
  }
`;

type Props = {
  isLoading: boolean;
};

const TotalProductsPer: React.FC<Props> = ({ isLoading }) => {
  const { regionCode } = useContext(ConfigContext);
  const dispatch = useDispatch();

  const [isViewChanged, setViewChanged] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setCurrentChartView('Store'));
  }, [dispatch]);

  const handleOnChange = (view: ChartView, _cb?: () => void) => {
    dispatch(setCurrentChartView(view));
    dispatch(getTotalsPer(regionCode, view, setViewChanged));
  };

  const { totalsPer, chartViewOptions, chartView } = useSelector(
    (state: RootState) => state.productAvailability
  );

  return (
    <StyledDataBox>
      {isLoading || isViewChanged ? (
        <LoaderWrapper>
          <LinearLoader width={300} />
        </LoaderWrapper>
      ) : (
        <>
          <StyledBox>
            <Switcher<ChartView>
              active={chartView}
              options={chartViewOptions}
              action={(option, cb) => handleOnChange(option, cb)}
              title="Total per"
            />
          </StyledBox>
          <ProductsTotalsPer {...totalsPer} />
        </>
      )}
    </StyledDataBox>
  );
};

export default TotalProductsPer;
