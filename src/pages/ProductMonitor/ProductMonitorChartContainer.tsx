import React, { useContext } from 'react';
import ChartWrapper from 'components/CustomLegendChart/ChartWrapper';
import getOption from 'pages/SPS/ProductAnalysis/components/Chart/getOption';
import { ConfigContext } from 'contexts/ConfigContext';
import ProductModal from './components/ProductModal';
import { useProductMonitorChartData } from './hooks/useProductMonitorChartData';
import { ProductMonitorRetailer, ProductMonitorRun } from './types';

interface Props {
  handleClose: () => void;
  selectedProductId?: number;
  selectedProductName?: string;
  retailers?: ProductMonitorRetailer[];
  runs?: ProductMonitorRun[];
}

export const ProductMonitorChartContainer: React.FC<Props> = ({
  selectedProductId,
  retailers,
  runs,
  handleClose,
  selectedProductName,
}) => {
  const { regionCode } = useContext(ConfigContext);
  const { chartData } = useProductMonitorChartData(
    regionCode,
    selectedProductId,
    retailers,
    runs
  );

  return (
    <ProductModal
      handleClose={handleClose}
      open={!!selectedProductId}
      title={selectedProductName || ''}
    >
      <ChartWrapper
        isLoading={!chartData}
        data={chartData as any}
        getOption={getOption(true) as any}
        key="product-monitor"
      />
    </ProductModal>
  );
};
