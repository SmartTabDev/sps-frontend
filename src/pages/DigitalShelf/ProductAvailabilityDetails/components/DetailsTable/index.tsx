import React, { useContext, useEffect, useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
import getAvailabilityHistory from 'reducers/productAvailability/getAvailabilityHistory';
import {
  AvailabilityFilterOptions,
  AvailabilityHistory,
} from 'reducers/productAvailability';
// mui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
// components
import { DetailsTableRow, orderType } from 'components/Table/DetailsTableRow';
import { FullWidthLinearLoader } from 'components/LinearLoader';
import { ShuffledColumns } from 'components/Table/ShuffledColumns';
import { ShuffledTableHead } from 'components/Table/ShuffledTableHead';
import { StyledTableHead } from 'components/Table/StyledTableHead';
import { formatRequestDate } from 'components/FormatDate/FormatDate';
// contexts
import { ConfigContext } from 'contexts/ConfigContext';
// @types
import { CATEGORY, RETAILER, SKU, TableView } from 'types/KPITable';
import { Product } from 'types/Product';
// utils
import getProductsGroup from 'utils/table/getProductsGroup';
import { NoDataRow } from 'components/Table/NoDataRow/NoDataRow';
import { DateRangeColumns } from './components/DateRangeColumns';
import { DateRangeColGroup } from './components/DateRangeColGroup';
import {
  DateRangeTableHead,
  getAvailabilityHistoryRange,
  getInitialTimeRange,
} from './components/DateRangeTableHead';

const productKeyMap = {
  [RETAILER]: 'retailerid',
  [CATEGORY]: 'categoryid',
  [SKU]: 'productid',
};

const getFilteredProducts = ({
  products,
  tableFilter,
}: {
  products: Product[];
  tableFilter: AvailabilityFilterOptions;
}) => {
  let result;
  switch (
    tableFilter // eslint-disable-line
  ) {
    case 'All':
      result = products;
      break;
    case 'In stock':
      result = products.filter((product) => product.available === true);
      break;
    case 'Out of stock':
      result = products.filter(
        ({ ispageavailable, available }) =>
          ispageavailable === false ||
          (ispageavailable === true && available === false)
      );
      break;
    default:
      break;
  }

  return result;
};

const DetailsTableWrapper: React.FC<any> = ({ children }) => {
  const {
    productAvailability: { isTableLoading },
  } = useSelector((state: RootState) => state);

  if (isTableLoading) {
    return <FullWidthLinearLoader width={250} text="Building your table" />;
  }

  return (
    <TableContainer style={{ maxHeight: 'calc(100vh - 129px)' }}>
      <Table stickyHeader aria-label="spanning table">
        {children}
      </Table>
    </TableContainer>
  );
};

type ProductRowProps = {
  el: { id: number };
  groupIndex: number;
  filteredProducts: Product[];
  tableView: TableView;
  dateRange: moment.Moment[];
  productKeyMap: typeof productKeyMap;
  availabilityHistory: AvailabilityHistory;
};

const ProductRow: React.FC<ProductRowProps> = ({
  el,
  groupIndex,
  availabilityHistory,
  filteredProducts,
  tableView,
  dateRange,
  productKeyMap: _productKeyMap,
}) => (
  <DetailsTableRow<Product>
    key={groupIndex}
    isOdd={groupIndex % 2 === 0}
    id={el.id}
    order={orderType.DESC}
    renderColumns={(product, products, index) => (
      <>
        <ShuffledColumns
          product={product}
          groupLength={products.length}
          view={tableView}
          index={index}
        />
        <DateRangeColumns<Product>
          product={product}
          dateRange={dateRange}
          availabilityHistory={availabilityHistory}
        />
      </>
    )}
    products={filteredProducts}
    filterKey={_productKeyMap[tableView] as keyof Product}
  />
);

const DetailsTableBody: React.FC<{
  tableView: TableView;
  dateRange: moment.Moment[];
}> = ({ tableView, dateRange }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [groupArray, setGroupArray] = useState<{ id: number }[]>([]);

  const {
    availabilityHistory,
    tableFilter,
    availabilityDetails: products,
  } = useSelector((state: RootState) => state.productAvailability);

  const { productRetailers = [], categories = [] } = useSelector(
    (state: RootState) => state.config.kpi
  );

  useEffect(() => {
    const filteredProducts = getFilteredProducts({ tableFilter, products }); // eslint-disable-line
    setFilteredProducts(filteredProducts || []);
  }, [tableFilter, products]);

  useEffect(() => {
    const viewGroup = {
      [CATEGORY]: categories,
      [RETAILER]: productRetailers,
      [SKU]: getProductsGroup(products),
    };
    setGroupArray(viewGroup[tableView]);
  }, [tableView, products, categories, productRetailers]);

  return (
    <>
      {groupArray.map((el, groupIndex) => (
        <ProductRow
          el={el}
          groupIndex={groupIndex}
          filteredProducts={filteredProducts}
          availabilityHistory={availabilityHistory}
          tableView={tableView}
          dateRange={dateRange}
          productKeyMap={productKeyMap}
          key={groupIndex} // eslint-disable-line
        />
      ))}
      {filteredProducts.length === 0 && <NoDataRow colSpan={14} />}
    </>
  );
};

export const DetailsTable: React.FC = () => {
  const { regionCode } = useContext(ConfigContext);
  const [dateRange, setDateRange] = useState<moment.Moment[]>([]);
  const dispatch = useDispatch();

  const { tableView } = useSelector(
    (state: RootState) => state.productAvailability
  );

  useEffect(() => {
    setDateRange(getInitialTimeRange());
    dispatch(getAvailabilityHistory(regionCode, 'Today'));
  }, [dispatch, regionCode]);

  useEffect(() => {
    if (dateRange && dateRange.length) {
      const requestDateRange = getAvailabilityHistoryRange(dateRange).map(
        (date) => formatRequestDate(date)
      );

      dispatch(getAvailabilityHistory(regionCode, requestDateRange as any));
    }
  }, [dispatch, dateRange, regionCode]);

  return (
    <DetailsTableWrapper>
      <colgroup>
        <col width="15%" />
        <col width="15%" />
        <col width="15%" />
        <DateRangeColGroup availableWidth={100 - 3 * 15} />
      </colgroup>
      <StyledTableHead>
        <TableRow>
          <ShuffledTableHead view={tableView} />
          <DateRangeTableHead
            dateRange={dateRange}
            setDateRange={setDateRange}
          />
        </TableRow>
      </StyledTableHead>
      <TableBody>
        <DetailsTableBody tableView={tableView} dateRange={dateRange} />
      </TableBody>
    </DetailsTableWrapper>
  );
};
