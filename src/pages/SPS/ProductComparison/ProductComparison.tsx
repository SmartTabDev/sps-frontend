import React, { useContext, useRef } from 'react';
import Button from 'components/Button';
import ChartWrapper from 'components/CustomLegendChart/ChartWrapper';
import Page from 'components/Page/Page';
import getChartRecords from 'reducers/productComparison/getChartRecords';
import getRuns from 'reducers/productComparison/getRuns';
import Box from '@mui/material/Box';
import { resetVariants } from 'reducers/productComparison/actions';
import { useDispatch, useSelector } from 'react-redux';
import ProductModal from 'pages/ProductMonitor/components/ProductModal';
import { ConfigContext } from 'contexts/ConfigContext';
import ChartTopBar from './components/ChartTopBar/ChartTopBar';
import Table from '../components/Table/components/Wrapper';
import TableOptionsWrapper from './components/TableOptionsWrapper/TableOptionsWrapper';
import TableViewSwitcher from './components/TableViewSwitcher/TableViewSwitcher';
import TableWrapper from './components/TableWrapper/TableWrapper';
import TopBar from './components/TopBar/TopBar';
import { useProductComparisonChart } from './hooks/useProductComparisonChart';
import { useProductComparisonFormValidation } from './hooks/useProductComparisonFormValidation';
import { useProductComparisonInit } from './hooks/useProductComparisonInit';
import { useProductComparisonView } from './hooks/useProductComparisonView';

const ProductComparison: React.FC = () => {
  const { configId, regionCode } = useContext(ConfigContext);
  const dispatch = useDispatch();
  const aboveTableElements = useRef<HTMLDivElement>(null);
  const [editMode, setEditMode] = React.useState<boolean>(false);

  const variants =
    useSelector((state: RootState) => state.productComparison.variants) || [];

  const isTableLoading = useSelector(
    (state: RootState) => state.productComparison.isTableLoading
  );
  const isTableLoaded = useSelector(
    (state: RootState) => state.productComparison.isTableLoaded
  );
  const isRunsLoading = useSelector(
    (state: RootState) => state.productComparison.isRunsLoading
  );

  const clientRuns = useSelector(
    (state: RootState) => state.productComparison.clientRuns
  );

  // clean old data and set initial form
  useProductComparisonInit(configId);

  // manage table view and grouping
  const {
    isDaily,
    tableView = 'Daily',
    tableViewOptions,
    handleChangeView,
    setGroupBy,
    showBy,
  } = useProductComparisonView();

  // chart data
  const {
    chartVariants,
    isOpen,
    getOption,
    handleClose,
    handleOpen,
    isChartLoading,
  } = useProductComparisonChart(isDaily);

  // validate form
  const { isDisabled } = useProductComparisonFormValidation();

  const handleCompare = () => {
    dispatch(resetVariants());
    dispatch(getRuns(regionCode));
  };

  const handleViewChart = () => {
    handleOpen();
    dispatch(getChartRecords(regionCode));
  };

  return (
    <Page
      title="Product Price Comparison"
      overlay={editMode}
      onOverlayClick={() => setEditMode(false)}
      navMargin="0 30px"
      renderNav={() => (
        <Button
          disabled={isDisabled}
          size="small"
          onClick={handleViewChart}
          style={{ marginLeft: 'auto' }}
        >
          View chart
        </Button>
      )}
    >
      <Box>
        <TableOptionsWrapper ref={aboveTableElements}>
          <TopBar
            setGroupBy={setGroupBy}
            isDisabled={isDisabled}
            isOpen={editMode}
            onButtonClick={handleCompare}
            setEditMode={setEditMode}
          />
          <TableViewSwitcher
            view={tableView}
            viewOptions={tableViewOptions}
            handleChangeView={handleChangeView}
            isDaily={isDaily}
          />
        </TableOptionsWrapper>
        {tableView && (
          <TableWrapper hasData={variants.length !== 0}>
            <Table
              isLoading={isTableLoading || isRunsLoading}
              data={variants}
              dates={clientRuns}
              noDataText={
                isTableLoaded === false
                  ? 'Please select products and retailers to compare'
                  : 'Sorry, there is no data to compare for the selected time range'
              }
              view={tableView}
              showBy={showBy}
              elementsSize={
                (aboveTableElements.current?.offsetHeight || 0) - 14
              }
            />
          </TableWrapper>
        )}
      </Box>
      <ProductModal
        handleClose={handleClose}
        open={isOpen}
        title="Product Price Comparison"
      >
        <>
          <ChartWrapper
            isLoading={isChartLoading}
            data={chartVariants}
            getOption={getOption()}
            renderLegend={(echarts) => <ChartTopBar echarts={echarts} />}
            key="product-comparison"
          />
        </>
      </ProductModal>
    </Page>
  );
};

export default ProductComparison;
