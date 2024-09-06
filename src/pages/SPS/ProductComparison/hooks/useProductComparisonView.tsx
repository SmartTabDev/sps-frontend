import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getViewOptions } from 'reducers/productComparison/getViewOptions';
import { TableView } from 'types/SPSTable';
import { setShowBy, setTableView } from 'reducers/productComparison/actions';
import { ProductComparisonView } from 'reducers/productComparison/productComparison';

export const useProductComparisonView = (): {
  isDaily: boolean;
  tableView: TableView | undefined;
  tableViewOptions: TableView[];
  handleChangeView: (val: TableView) => void
  showBy: ProductComparisonView;
  setGroupBy: (option: ProductComparisonView) => void;
} => {
  const dispatch = useDispatch();

  const isDaily = useSelector((state: RootState) => state.config.sps.isDaily);
  const tableView = useSelector(
    (state: RootState) => state.productComparison.tableView,
  );
  const tableViewOptions = useSelector(
    (state: RootState) => state.productComparison.tableViewOptions,
  );
  const showBy = useSelector(
    (state: RootState) => state.productComparison.showBy,
  );

  const setGroupBy = (option: ProductComparisonView) => {
    dispatch(setShowBy(option));
  };

  const handleChangeView = (val: TableView) => {
    dispatch(setTableView(val));
  };

  useEffect(() => {
    dispatch(getViewOptions(isDaily));
  }, [dispatch, isDaily]);

  return {
    isDaily,
    tableView,
    tableViewOptions,
    handleChangeView,
    setGroupBy,
    showBy,
  };
};
