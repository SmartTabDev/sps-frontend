import React from 'react';
import { UnifyCard, UnifyCardTitle } from 'components/UnifyCard/UnifyCard';
import RRPPerStore from '../RRPPerStore/RRPPerStore';
import { ChartData } from '../../types/Chart';

export const RRPPerStoreCard: React.FC<{
  data: ChartData[];
}> = ({ data }) => {
  return (
    <UnifyCard>
      <UnifyCardTitle
        tooltipProps={{
          title:
            'The data presented in the table illustrates the average cost of RSP relative to the average cost of other products in different stores, all during a specific time period. The table provides valuable insights into how the price of RSP compares to the prices of other products, highlighting potential trends or patterns that may be of interest to those analyzing the data.',
        }}
      >
        rsp index per store
      </UnifyCardTitle>
      <RRPPerStore data={data} />
    </UnifyCard>
  );
};
