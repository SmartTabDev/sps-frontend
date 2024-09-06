import React from 'react';
import { UnifyCard, UnifyCardTitle } from 'components/UnifyCard/UnifyCard';
import RRPPerStoreInTime from '../RRPPerStoreInTime/RRPPerStoreInTime';
import { ChartData } from '../../types/Chart';

export const RRPPerStoreInTimeCard: React.FC<{
  data: ChartData[];
  xAxisData: string[];
}> = ({ data, xAxisData }) => {
  return (
    <UnifyCard>
      <UnifyCardTitle
        tooltipProps={{
          title:
            'The chart shows how the average price of RSP develops over a given period of chart. Get valuable insights about how retailers selling your products across the market.',
        }}
      >
        rsp index per store in time
      </UnifyCardTitle>
      <RRPPerStoreInTime data={data} xAxisData={xAxisData} />
    </UnifyCard>
  );
};
