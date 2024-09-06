import React, { useContext, useMemo, useCallback } from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import { Waypoint } from 'react-waypoint';
import RoundPanel from 'pages/Marketplaces/components/RoundPanel';
import MarketplaceContext from 'pages/Marketplaces/MarketplaceContext';
import {
  MarketplaceListingProduct,
  MarketplaceOffer,
  MarketplaceProduct,
} from 'pages/Marketplaces/types';
import { getListingProducts } from 'pages/Marketplaces/utils/getProduct';
import OrderButton, { OrderType } from 'components/OrderButton';
import { EdgeCell, TableHeaderCell } from 'components/TableCell/TableCell';
import { PictureCell } from 'components/Table/PictureCell/PictureCell';
import { NoDataRow } from 'components/Table/NoDataRow/NoDataRow';
import { TableContainer } from '@mui/material';
import { ProductNameCell } from './components/ProductNameCell';
import { PositionCell } from './components/PositionCell';
import { PriceCell } from './components/PriceCell';
import { BuyBoxCell } from './components/BuyBoxCell';
import Table from './components/Table.styled';
import TableRow from './components/TableRow.styled';
import { Badges } from '../../../../components/Badges/Badges';

type RowProps = {
  product?: MarketplaceListingProduct;
  isLoading: boolean;
  innerRef?: React.RefObject<HTMLTableRowElement>;
};

const Row: React.FC<RowProps> = ({ product, isLoading, innerRef }) => {
  const { marketplace } = useContext(MarketplaceContext);

  return (
    <TableRow ref={innerRef}>
      <EdgeCell />
      <TableCell>
        <PictureCell
          productName={product?.productName}
          pictureUrl={product?.pictureUrl}
          isLoading={isLoading}
        />
      </TableCell>
      <ProductNameCell product={product}>
        {marketplace === 'ceneo' && (
          <Badges
            trophy={
              product?.clientPosition !== null &&
              product?.clientPosition !== undefined &&
              product?.clientPosition <= 2
            }
            isPromotion={product?.badges?.promo}
            bidding={product?.badges?.type === 'bidding'}
            freeShipping={product?.badges?.deliveryPrice === 0}
          />
        )}
      </ProductNameCell>
      <PriceCell price={product?.clientPrice} isLoading={isLoading} />
      <PositionCell product={product} isLoading={isLoading} />
      {marketplace === 'ceneo' && <BuyBoxCell product={product} />}
      <EdgeCell />
    </TableRow>
  );
};

interface Props {
  products: (MarketplaceProduct | undefined)[];
  clientOffers: (MarketplaceOffer | undefined)[];
  loadNext: () => void;
  isLoading: boolean;
  noData: boolean;
  isMore: boolean;
  orderType: OrderType;
  orderKey: string;
  handleOrderChange: (isActive: boolean, key: string, type: OrderType) => void;
}

export const MarketplaceProductsTable: React.FC<Props> = ({
  products,
  clientOffers = [],
  loadNext,
  isLoading,
  noData,
  isMore,
  orderType,
  orderKey,
  handleOrderChange,
}) => {
  const { marketplace } = useContext(MarketplaceContext);
  const listingProducts = useMemo(
    () => getListingProducts(products, clientOffers),
    [products, clientOffers]
  );

  const onEnterWaypoint = useCallback(() => {
    loadNext();
  }, [loadNext]);

  return (
    <RoundPanel>
      <TableContainer style={{ maxHeight: 'calc(100vh - 170px)' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <EdgeCell />
              <TableHeaderCell>
                <OrderButton
                  activeOrderKey={orderKey}
                  orderKey="productName"
                  orderType={orderType}
                  text="Product"
                  toggleOrder={handleOrderChange}
                />
              </TableHeaderCell>
              <TableHeaderCell />
              <TableHeaderCell $right>
                <OrderButton
                  activeOrderKey={orderKey}
                  align="right"
                  orderKey="clientPrice"
                  orderType={orderType}
                  text="Your price"
                  textPosition="right"
                  toggleOrder={handleOrderChange}
                />
              </TableHeaderCell>
              <TableHeaderCell>
                <OrderButton
                  activeOrderKey={orderKey}
                  align="center"
                  orderKey="clientPosition"
                  orderType={orderType}
                  text="Position"
                  toggleOrder={handleOrderChange}
                />
              </TableHeaderCell>
              {marketplace === 'ceneo' && (
                <TableHeaderCell $left>
                  <OrderButton
                    activeOrderKey={orderKey}
                    align="left"
                    orderKey="price"
                    orderType={orderType}
                    text="Buy box"
                    toggleOrder={handleOrderChange}
                  />
                </TableHeaderCell>
              )}
              <EdgeCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {listingProducts.map((product, index) => (
              <React.Fragment key={product?.productId || index}>
                <Row
                  product={product}
                  isLoading={!product || (!product && isLoading)}
                />
              </React.Fragment>
            ))}
            {products.length > 0 && isMore && isLoading === false ? (
              <>
                <Waypoint onEnter={onEnterWaypoint} scrollableAncestor={window}>
                  <Row product={undefined} isLoading />
                </Waypoint>
              </>
            ) : null}
            {isLoading || (products.length > 0 && isMore)
              ? Array(products.length === 0 ? 5 : 4)
                  .fill(undefined)
                  .map((_, index) => (
                    <React.Fragment key={index}>
                      <Row product={undefined} isLoading />
                    </React.Fragment>
                  ))
              : null}
            {noData && isLoading === false ? <NoDataRow colSpan={9} /> : <></>}
          </TableBody>
        </Table>
      </TableContainer>
    </RoundPanel>
  );
};
