import React, { useContext } from 'react';
import { BrandsShelf } from 'components/Charts/BrandsShelf/BrandsShelf';
import LinearLoader from 'components/LinearLoader';
import LoaderWrapper from 'components/LoaderWrapper';
import { ConfigContext } from 'contexts/ConfigContext';
import { useAllCount } from 'pages/MarketRadar/hooks/useAllCount';
import { UnifyCard, UnifyCardTitle } from 'components/UnifyCard/UnifyCard';
import * as Cube from '@cubejs-client/core';
import { MarketRadarFilters } from '../ExpandedFilters/ExpandedFilters';

type Props = {
  granularity: Cube.TimeDimensionGranularity;
  brands: string[];
  retailers: MarketRadarFilters['selectedRetailers'];
  categories: MarketRadarFilters['selectedCategories'];
  timeDimension: MarketRadarFilters['timeDimension'];
};

const ShareOfShelf: React.FC<Props> = ({
  granularity,
  brands,
  retailers,
  categories,
  timeDimension,
}) => {
  const { regionCode } = useContext(ConfigContext);
  const { dates, values, isLoading } = useAllCount(
    regionCode,
    granularity,
    timeDimension,
    brands,
    retailers,
    categories
  );

  return (
    <UnifyCard sx={{ minHeight: '272px' }}>
      {isLoading ? (
        <LoaderWrapper sx={{ minHeight: '272px' }}>
          <LinearLoader width={300} />
        </LoaderWrapper>
      ) : (
        <>
          <UnifyCardTitle
            tooltipProps={{
              title:
                'This chart shows the breakdown of the Top 10 brands in the monitored set of retailers. The Top 10 brands are determined by the number of TOTAL SKU. By using the filters you can you narrow down the results to given retailers, categories and their combinations.',
            }}
          >
            TOP 10 SHARE OF SHELF
          </UnifyCardTitle>
          <BrandsShelf data={values} XAxisData={dates} isLoading={isLoading} />
        </>
      )}
    </UnifyCard>
  );
};

export default ShareOfShelf;
