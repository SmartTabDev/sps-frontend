import { ConfigContext } from 'contexts/ConfigContext';
import { useCallback, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getChartRecords from 'reducers/productComparison/getChartRecords';
import getOption from '../components/Chart/getOption';

export const useProductComparisonChart = (
  isDaily: boolean
): {
  isChartLoading: boolean;
  chartVariants: any[];
  getOption: () => any;
  isOpen: boolean;
  handleOpen: () => void;
  handleClose: () => void;
} => {
  const { regionCode } = useContext(ConfigContext);
  const [isOpen, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const isChartLoading = useSelector(
    (state: RootState) => state.productComparison.isChartLoading
  );
  const chartVariants = useSelector(
    (state: RootState) => state.productComparison.chartVariants
  );

  const handleOpen = useCallback(() => {
    setOpen(true);
    dispatch(getChartRecords(regionCode));
  }, [dispatch, regionCode]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const getOptionForView = useCallback(() => getOption(isDaily), [isDaily]);

  return {
    chartVariants,
    getOption: getOptionForView,
    handleClose,
    handleOpen,
    isChartLoading,
    isOpen,
  };
};
