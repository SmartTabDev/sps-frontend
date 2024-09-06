import React from 'react';
import LinearLoader from 'components/LinearLoader';
import LoaderWrapper from 'components/LoaderWrapper';
import { CandleStickChart } from 'components/Charts/CandleStick';
import { ChartData } from 'pages/RSPIndex/types/Chart';
import StyledRRPChartsBox from '../StyledRRPChartsBox';

type Props = {
  data: ChartData[];
  isLoading?: boolean;
};

const RRPPerStore: React.FC<Props> = ({ isLoading = false, data }) => {
  return (
    <>
      {isLoading ? (
        <LoaderWrapper>
          <LinearLoader width={300} />
        </LoaderWrapper>
      ) : (
        <StyledRRPChartsBox>
          <CandleStickChart data={data} isLoading={false} />
        </StyledRRPChartsBox>
      )}
    </>
  );
};

export default RRPPerStore;
