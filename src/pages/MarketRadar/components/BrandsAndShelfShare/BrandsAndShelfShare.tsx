import * as Cube from '@cubejs-client/core';
import React, { useContext } from 'react';
import { UnifyCard, UnifyCardTitle } from 'components/UnifyCard/UnifyCard';
import { SunburstChart } from 'components/Charts/Sunburst';
import LinearLoader from 'components/LinearLoader';
import LoaderWrapper from 'components/LoaderWrapper';
import { ConfigContext } from 'contexts/ConfigContext';
import { useBrandsAndShelfShare } from 'pages/MarketRadar/hooks/useBrandsAndShelfShare';
import Grid from '@mui/material/Grid';
import TopBrandsTable from './Table/Table';
import { MarketRadarFilters } from '../ExpandedFilters/ExpandedFilters';

type Props = {
  retailers: MarketRadarFilters['selectedRetailers'];
  categories: MarketRadarFilters['selectedCategories'];
  timeDimension: MarketRadarFilters['timeDimension'];
  granularity: Cube.TimeDimensionGranularity;
};

const BrandsAndShelfShare: React.FC<Props> = ({
  granularity,
  timeDimension,
  retailers,
  categories,
}) => {
  const { regionCode } = useContext(ConfigContext);

  const { chartData, tableData, isLoading } = useBrandsAndShelfShare(
    regionCode,
    granularity,
    timeDimension,
    retailers,
    categories
  );

  return (
    <UnifyCard sx={{ minHeight: '272px' }}>
      <UnifyCardTitle
        tooltipProps={{
          title:
            'This dynamic sunburst chart gives you the possibility to analyse the distribution of Retailers, Categories and Brands on the market based on the number of SKU. By clicking on a given retailer you can then further explore which categories are the biggest and which 3 brands are dominant in the given category.',
        }}
      >
        TOP 3 OVERVIEW OF BRANDS AND SHELF SHARE
      </UnifyCardTitle>
      {isLoading ? (
        <LoaderWrapper sx={{ minHeight: '272px' }}>
          <LinearLoader width={300} />
        </LoaderWrapper>
      ) : (
        <>
          <Grid
            sx={{ width: '100%', mt: '32px' }}
            container
            rowSpacing="12px"
            columnSpacing="12px"
          >
            <Grid item xs={12} lg={6}>
              <SunburstChart data={chartData} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TopBrandsTable data={tableData} />
            </Grid>
          </Grid>
        </>
      )}
    </UnifyCard>
  );
};

export default BrandsAndShelfShare;
