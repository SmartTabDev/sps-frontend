import React, { useState, useEffect } from 'react';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { StyledTableHead } from 'components/Table/StyledTableHead';
import { useSelector } from 'react-redux';
import { CATEGORY, RETAILER, SKU, TableView } from 'types/KPITable';
import { Product } from 'types/Product';
import { FullWidthLinearLoader } from 'components/LinearLoader';
import uniqBy from 'lodash/uniqBy';
import sortBy from 'lodash/sortBy';
import getProductsGroup from 'utils/table/getProductsGroup';
import { ShuffledTableHead } from 'components/Table/ShuffledTableHead';
import OrderButton, { OrderType, ORDER_TYPES } from 'components/OrderButton';
import { NoDataRow } from 'components/Table/NoDataRow/NoDataRow';
import { CustomizedTableRow } from './components/CustomizedTableRow';

type KeyType = 'retailerid' | 'categoryid' | 'productid';
const productKeyMap = {
  [RETAILER]: 'retailerid',
  [CATEGORY]: 'categoryid',
  [SKU]: 'productid',
};

function compareNumbers(a: Product, b: Product) {
  return b.rating - a.rating;
}

const getVisibleRatingDetails = (
  groupArray: {
    id: number;
  }[],
  products: Product[],
  tableView: TableView,
  order: OrderType
) => {
  const productKey: KeyType = productKeyMap[tableView] as KeyType;

  return groupArray
    .map(({ id, ...rest }: any) => {
      const productsWithKey = products.map((p) => ({
        ...p,
        key: `${p.productid}-${p.categoryid}-${p.retailerid}`,
      }));
      let visibleRatingDetails = uniqBy(productsWithKey, 'key')
        .filter((product) => product[productKey] === id)
        .sort(compareNumbers);

      if (order === ORDER_TYPES.ASC) {
        visibleRatingDetails = visibleRatingDetails.reverse();
      }

      return { ...rest, id, visibleRatingDetails };
    })
    .filter(({ visibleRatingDetails }: any) => visibleRatingDetails.length > 0);
  // .slice(0, 1);
};

type ProductRowsProps = {
  groupIndex: number;
  visibleRatingDetails: Product[];
  tableView: TableView;
};

const ProductRows: React.FC<ProductRowsProps> = ({
  groupIndex,
  visibleRatingDetails,
  tableView,
}) => (
  <>
    {visibleRatingDetails.map((ratingDetail, index) => (
      <CustomizedTableRow
        key={`${tableView}-${ratingDetail.productid}-${ratingDetail.categoryid}-${ratingDetail.retailerid}`}
        $isGroupOdd={groupIndex % 2 === 0}
        isLastRow={index + 1 === visibleRatingDetails.length}
        isFirstRow={index === 0}
        numberOfRows={visibleRatingDetails.length}
        ratingDetail={ratingDetail}
      />
    ))}
  </>
);

const DetailsTableWrapper: React.FC<any> = ({ children }) => {
  const {
    ratingAndReviews: { ratingDetailsLoading },
  } = useSelector((state: RootState) => state);

  if (ratingDetailsLoading) {
    return <FullWidthLinearLoader width={250} text="Building your table" />;
  }

  return (
    <TableContainer style={{ maxHeight: 'calc(100vh - 170px)' }}>
      <Table stickyHeader aria-label="spanning table">
        {children}
      </Table>
    </TableContainer>
  );
};

const ColGroup: React.FC<{ data: number[] }> = ({ data }) => (
  <colgroup>
    {data.map((value, index) => (
      <col width={`${value}%`} key={index} />
    ))}
  </colgroup>
);

const getGroups = (
  view: TableView,
  categories: any,
  retailers: any,
  ratingsDetails: any
) => {
  const viewGroup = {
    [CATEGORY]: categories,
    [RETAILER]: retailers,
    [SKU]: ratingsDetails,
  };

  let group = viewGroup[view];

  if (view === 'SKU') {
    group = getProductsGroup(viewGroup[view]);
  }

  return sortBy(group);
};

export const DetailsTable: React.FC = () => {
  const [order, setOrder] = useState<OrderType>(ORDER_TYPES.DESC);
  const [groupArray, setGroupArray] = useState<{ id: number }[]>([]);
  const categories = useSelector(
    (state: RootState) => state.config.kpi.categories
  );
  const retailers = useSelector(
    (state: RootState) => state.config.kpi.productRetailers
  );
  const ratingsDetails = useSelector(
    (state: RootState) => state.ratingAndReviews.ratingsDetails
  );
  const tableView = useSelector(
    (state: RootState) => state.ratingAndReviews.view
  );

  const toggleOrder = () => {
    setOrder(order === ORDER_TYPES.DESC ? ORDER_TYPES.ASC : ORDER_TYPES.DESC);
  };

  useEffect(() => {
    const group = getGroups(tableView, categories, retailers, ratingsDetails);

    setGroupArray(group);

    return () => {
      setGroupArray([]);
    };
  }, [tableView, ratingsDetails, categories, retailers]);

  const groupArrayWithDetails = React.useMemo(
    () => getVisibleRatingDetails(groupArray, ratingsDetails, tableView, order),
    [groupArray, ratingsDetails, tableView, order]
  );

  return (
    <DetailsTableWrapper>
      <ColGroup data={[15, 15, 35, 15, 20]} />
      <StyledTableHead>
        <TableRow>
          <ShuffledTableHead view={tableView} />
          <TableCell># of reviews</TableCell>
          <TableCell>
            <OrderButton
              activeOrderKey="averageRating"
              orderKey="averageRating"
              orderType={order}
              text="Average rating"
              toggleOrder={toggleOrder}
            />
          </TableCell>
        </TableRow>
      </StyledTableHead>
      <TableBody>
        {groupArrayWithDetails.map(
          ({ visibleRatingDetails, id }, groupIndex) => (
            <ProductRows
              visibleRatingDetails={visibleRatingDetails}
              groupIndex={groupIndex}
              key={id}
              tableView={tableView}
            />
          )
        )}
        {groupArrayWithDetails.length === 0 && <NoDataRow colSpan={5} />}
      </TableBody>
    </DetailsTableWrapper>
  );
};
