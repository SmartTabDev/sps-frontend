import React from 'react';
import LinearLoader from 'components/LinearLoader';
import LoaderWrapper from 'components/LoaderWrapper';
import { StackedLineChart } from 'components/Charts/StackedLineChart';
import { ChartData } from 'pages/RSPIndex/types/Chart';
import StyledRRPChartsBox from '../StyledRRPChartsBox';

type Props = {
  isLoading?: boolean;
  data: ChartData[];
  xAxisData: string[];
};

const RRPPerStoreInTime: React.FC<Props> = ({
  isLoading = false,
  data,
  xAxisData,
}) => {
  return (
    <>
      {isLoading ? (
        <LoaderWrapper>
          <LinearLoader width={300} />
        </LoaderWrapper>
      ) : (
        <StyledRRPChartsBox>
          <StackedLineChart
            data={data}
            xAxisData={xAxisData}
            isLoading={false}
          />
        </StyledRRPChartsBox>
      )}
    </>
  );
};

export default RRPPerStoreInTime;
