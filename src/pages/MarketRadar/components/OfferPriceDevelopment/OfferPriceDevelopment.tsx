import React, { useContext } from 'react';
import { PriceDevelopment } from 'components/Charts/PriceDevelopment/PriceDevelopment';
import LinearLoader from 'components/LinearLoader';
import LoaderWrapper from 'components/LoaderWrapper';
import { UnifyCard, UnifyCardTitle } from 'components/UnifyCard/UnifyCard';
import { ConfigContext } from 'contexts/ConfigContext';
import { useOfferPriceDevelopment } from 'pages/MarketRadar/hooks/useOfferPriceDevelopment';
import * as Cube from '@cubejs-client/core';
import { GroupByKeysCalc } from 'pages/MarketRadar/utils/groupByKeys';
import { MarketRadarFilters } from '../ExpandedFilters/ExpandedFilters';

type Props = {
  brands: string[];
  retailers: MarketRadarFilters['selectedRetailers'];
  categories: MarketRadarFilters['selectedCategories'];
  granularity: Cube.TimeDimensionGranularity;
  calc: GroupByKeysCalc;
  timeDimension: MarketRadarFilters['timeDimension'];
};

const OfferPriceDevelopment: React.FC<Props> = ({
  granularity,
  brands,
  retailers,
  categories,
  calc,
  timeDimension,
}) => {
  const { regionCode } = useContext(ConfigContext);

  const { dates, values, isLoading } = useOfferPriceDevelopment(
    regionCode,
    granularity,
    timeDimension,
    brands,
    retailers,
    categories,
    calc
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
                'This line chart gives you the chance to understand how prices of given brands are changing on the market. You can quickly get access to insights about how your brand is positioning itself against competitors.',
            }}
          >
            TOP 10 OFFER PRICE DEVELOPMENT
          </UnifyCardTitle>
          <PriceDevelopment
            data={values}
            XAxisData={dates}
            isLoading={isLoading}
          />
        </>
      )}
    </UnifyCard>
  );
};

export default OfferPriceDevelopment;
