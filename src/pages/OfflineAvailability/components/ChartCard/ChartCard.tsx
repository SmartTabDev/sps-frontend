import * as React from 'react';
import { UnifyCard, UnifyCardTitle } from 'components/UnifyCard/UnifyCard';

type ChartCardProps = {
  title: string;
  chart: React.ReactNode;
  tooltipTitle?: string;
};

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  chart,
  tooltipTitle,
}) => {
  return (
    <UnifyCard>
      <UnifyCardTitle
        tooltipProps={
          tooltipTitle
            ? {
                title: tooltipTitle,
              }
            : undefined
        }
      >
        {title}
      </UnifyCardTitle>
      {chart}
    </UnifyCard>
  );
};

export default ChartCard;
