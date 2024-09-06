import React, { useContext } from 'react';
import { RadarChart } from 'components/Charts/RadarChart';
import LinearLoader from 'components/LinearLoader';
import LoaderWrapper from 'components/LoaderWrapper';
import { UnifyCard, UnifyCardTitle } from 'components/UnifyCard/UnifyCard';
import { ConfigContext } from 'contexts/ConfigContext';
import * as Cube from '@cubejs-client/core';
import { useDistributionGraph } from 'pages/MarketRadar/hooks/useDistributionGraph';
import { MarketRadarFilters } from '../ExpandedFilters/ExpandedFilters';

type Props = {
  granularity: Cube.TimeDimensionGranularity;
  brands: string[];
  allRetailers: MarketRadarFilters['selectedRetailers'];
  retailers: MarketRadarFilters['selectedRetailers'];
  categories: MarketRadarFilters['selectedCategories'];
  timeDimension: MarketRadarFilters['timeDimension'];
};

const DistributionGraph: React.FC<Props> = ({
  granularity,
  brands,
  retailers,
  allRetailers,
  categories,
  timeDimension,
}) => {
  const { regionCode } = useContext(ConfigContext);
  const { values, isLoading, allRetailersMax } = useDistributionGraph(
    regionCode,
    granularity,
    timeDimension,
    brands,
    retailers,
    categories,
    allRetailers
  );

  return (
    <UnifyCard sx={{ minHeight: '272px' }}>
      {isLoading ? (
        <LoaderWrapper>
          <LinearLoader width={300} />
        </LoaderWrapper>
      ) : (
        <>
          <UnifyCardTitle
            tooltipProps={{
              title:
                'This radar chart provides you with information about which of your brands has the widest distribution. You can compare your brand against competitors in given categories and timeframes',
            }}
          >
            TOP 10 DISTRIBUTION GRAPH
          </UnifyCardTitle>
          <RadarChart
            items={values}
            indicator={allRetailersMax}
            isLoading={false}
          />
        </>
      )}
    </UnifyCard>
  );
};

export default DistributionGraph;
