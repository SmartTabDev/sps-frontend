import React, { useContext, useEffect, useMemo } from 'react';
import { styled } from '@mui/system';
import { Route, Switch, useParams } from 'react-router-dom';
import FullSizeModal from 'components/FullSizeModal/FullSizeModal';
import { useDispatch, useSelector } from 'react-redux';
import getChartRecords from 'reducers/productAnalysis/getChartRecords';
import { setSelectedProduct } from 'reducers/productAnalysis/actions';
import ChartWrapper from 'components/CustomLegendChart/ChartWrapper';
import useExpandedFilters from 'hooks/useExpandedFilters';
import { LocationTabs } from 'components/LocationTabs/LocationTabs';
import { PriceAnalysisTimeframe } from 'pages/SPS/ProductAnalysis/types';
import { ConfigContext } from 'contexts/ConfigContext';
import { PriceDrilldown } from '../../ProductAnalysis/components/PriceDrilldown';
import { useTableView } from '../../ProductAnalysis/hooks/useTableView';
import { spsFiltersInitialState } from '../../ProductAnalysis/components/ExpandedFilters/ExpandedFilters';
import { PriceAnalysisFilters } from '../../ProductAnalysis/components/ExpandedFilters/types';
import usePriceAnalysisTimeframe from '../../ProductAnalysis/utils/usePriceAnalysisTimeframe';

const StyledModalContent = styled('div')`
  width: 100%;
  height: auto;
  background: rgba(255, 255, 255, 0.95);
  outline: 0;
  box-sizing: border-box;
  position: absolute;
  top: 156px;
  left: 50%;
  transform: translate(-50%, 0%);
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 50px;
`;

const ChartShadowWrapper = styled('div')`
  box-shadow: 0px -2px 0px rgba(0, 0, 0, 0.02), 0px 4px 16px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 20px 0;
  margin-bottom: 15px;
`;

type Props = {
  open: boolean;
  handleClose: () => void;
  getOptionForView: ReturnType<typeof useTableView>['getOptionForView'];
  dateRange: string;
};

const ProductModal: React.FC<Props> = ({
  open,
  handleClose,
  getOptionForView,
  dateRange,
}) => {
  const { configId, regionCode } = useContext(ConfigContext);
  const dates = useMemo(() => dateRange, [dateRange]);

  const dispatch = useDispatch();
  const { dispatch: filterDispatch, refreshKey } =
    useExpandedFilters<PriceAnalysisFilters>(spsFiltersInitialState);

  usePriceAnalysisTimeframe(filterDispatch, refreshKey);

  const params = useParams<{
    productId: string | undefined;
  }>();
  const { productId } = params;

  const selectedProduct = useSelector(
    (state: RootState) => state.productAnalysis.selectedProduct
  );

  const isChartLoading = useSelector(
    (state: RootState) => state.productAnalysis.isChartLoading
  );

  const chartVariants = useSelector(
    (state: RootState) => state.productAnalysis.chartVariants
  );

  const offers = useSelector(
    (state: RootState) => state.productAnalysis.offers
  );

  const rrp = useSelector((state: RootState) => state.productAnalysis.rrp);

  const namesMap = useSelector((state) => state.config.sps.namesMap);
  let productName = '';

  if (productId) {
    productName = namesMap[productId] || '-';
  }

  useEffect(() => {
    if (dates && regionCode && configId) {
      const reqDates = dates.split('~') as PriceAnalysisTimeframe;
      dispatch(getChartRecords(configId, regionCode, reqDates, productId));
    }
  }, [dates, productId, dispatch, configId, regionCode]);

  // set selected product on refresh
  useEffect(() => {
    if (productId) {
      dispatch(setSelectedProduct(productId));
    }
  }, [productId, dispatch]);

  return (
    <FullSizeModal
      open={open}
      onClose={handleClose}
      headerProps={{
        title: productName || '',
        date: null,
      }}
    >
      <StyledModalContent>
        <ChartShadowWrapper>
          {selectedProduct && dates ? (
            <ChartWrapper
              isLoading={isChartLoading}
              data={chartVariants}
              getOption={getOptionForView() as any}
              key={`chart-${selectedProduct}`}
            />
          ) : (
            <></>
          )}
        </ChartShadowWrapper>
        <LocationTabs
          pages={[{ name: 'price-drilldown' }]}
          mainPath={`/price-analysis/price-performance/${productId}`}
        />
        <Switch>
          <Route path="/price-analysis/price-performance/:productId/price-drilldown">
            <PriceDrilldown
              offers={isChartLoading ? undefined : offers}
              rrp={rrp}
              isLoading={isChartLoading}
            />
          </Route>
        </Switch>
      </StyledModalContent>
    </FullSizeModal>
  );
};

export default ProductModal;
