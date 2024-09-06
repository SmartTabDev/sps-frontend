import React from 'react';
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
} from '@mui/material';
import BaseLink from 'components/BaseLink/BaseLink';
import RoundPanel from 'pages/Marketplaces/components/RoundPanel';
import TableSkeletons from 'components/TableSkeletons/TableSkeletons';
import formatPrice from 'utils/formatPrice';
import { Badges } from 'components/Badges/Badges';
import { EdgeCell, TableHeaderCell } from 'components/TableCell/TableCell';
import { NoDataRow } from 'components/Table/NoDataRow/NoDataRow';
import { PictureCell } from 'components/Table/PictureCell/PictureCell';
import OrderButton, { OrderType } from 'components/OrderButton';
import { AllegroOffer } from './types/AllegroOffer';

type AllegroTableProps = {
  handleModalOpen: (id: string | null) => void;
  handleOrderChange: (isActive: boolean, key: string, type: OrderType) => void;
  isOfferListLoading: boolean;
  limit: number;
  offers: AllegroOffer[];
  orderKey: string;
  orderType: OrderType;
  showNoData: boolean;
};

const AllegroTable: React.FC<AllegroTableProps> = ({
  handleModalOpen,
  isOfferListLoading,
  limit,
  offers,
  orderKey,
  showNoData,
  handleOrderChange,
  orderType,
}) => (
  <RoundPanel
    sx={{
      margin: '0 24px 52px 24px',
      width: 'calc(100% - 24px * 2)',
    }}
  >
    <TableContainer sx={{ height: 'calc(100vh - 208px)' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <EdgeCell />
            <TableHeaderCell $left>
              <OrderButton
                activeOrderKey={orderKey}
                orderKey="pageProductName"
                orderType={orderType}
                text="Offer"
                toggleOrder={handleOrderChange}
              />
            </TableHeaderCell>
            <TableHeaderCell $left>
              <OrderButton
                activeOrderKey={orderKey}
                orderKey="seller"
                orderType={orderType}
                text="Vendor"
                toggleOrder={handleOrderChange}
              />
            </TableHeaderCell>
            <TableHeaderCell $right>
              <OrderButton
                activeOrderKey={orderKey}
                align="right"
                orderKey="price"
                orderType={orderType}
                text="Current Price (zł)"
                toggleOrder={handleOrderChange}
              />
            </TableHeaderCell>
            <TableHeaderCell $right>
              <OrderButton
                activeOrderKey={orderKey}
                align="right"
                orderKey="unitsSold"
                orderType={orderType}
                text="Sales Volume (last 30 days)"
                toggleOrder={handleOrderChange}
              />
            </TableHeaderCell>
            <EdgeCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {isOfferListLoading === false
            ? offers.map((offer, index) => (
                <React.Fragment key={index}>
                  <TableRow
                    hover
                    sx={{
                      '&.MuiTableRow-hover': {
                        '&:hover': {
                          backgroundColor: 'rgba(115, 165, 231, 0.25)',
                        },
                      },
                    }}
                  >
                    <EdgeCell />
                    <TableCell
                      align="left"
                      sx={{ borderBottom: 'none', width: '500px' }}
                    >
                      <Stack
                        direction="row"
                        spacing={4}
                        sx={{ alignItems: 'center' }}
                      >
                        <Box>
                          <PictureCell
                            productName={offer.pageProductName}
                            pictureUrl={offer.imageUrl}
                          />
                        </Box>
                        <Box>
                          <Typography sx={{ fontSize: 12, color: '#525F81' }}>
                            {offer.brand}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: 16,
                              color: '#447EEB',
                              fontWeight: 600,
                              cursor: 'pointer',
                            }}
                            onClick={() => handleModalOpen(offer.offerId)}
                          >
                            {offer.pageProductName}
                          </Typography>

                          <Stack spacing={1} direction="row">
                            <Typography sx={{ fontSize: 11, color: '#98AFCF' }}>
                              ID:
                            </Typography>
                            <BaseLink href={offer.productUrl}>
                              <Typography
                                sx={{
                                  fontSize: 11,
                                  color: '#447EEB',
                                  fontWeight: 600,
                                }}
                              >
                                {offer.offerId}
                              </Typography>
                            </BaseLink>
                          </Stack>
                          <Badges
                            trophy={offer.isSuperPrice} // supercena
                            isSponsored={offer.isPromoted} // oferta promowana
                            bidding={offer.isSuperSeller} // super sprzedawca
                            freeShipping={offer.hasFreeDelivery}
                            trophyTooltipTitle="Superprice"
                            isSponsoredTooltipTitle="Sponsored offer"
                            biddingTooltipTitle="Superseller"
                            freeShippingTooltipTitle="Free delivery"
                          />
                        </Box>
                      </Stack>
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ borderBottom: 'none', width: '200px' }}
                    >
                      {offer.seller}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ borderBottom: 'none', width: '200px' }}
                    >
                      {formatPrice(offer.price)}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ borderBottom: 'none', width: '200px' }}
                    >
                      {offer.unitsSold || 0}
                    </TableCell>
                    <EdgeCell />
                  </TableRow>
                </React.Fragment>
              ))
            : null}
          {isOfferListLoading || !showNoData ? (
            <TableSkeletons
              horizontalCount={5}
              verticalCount={limit}
              skeletonsWrapper={TableRow}
              skeletonWrapper={TableCell}
              disabledSkeletonWrapper={EdgeCell}
              disabledIndexes={[0, 5]}
              skeletonHeight="60px"
              skeletonWidths={['', '500px', '200px', '200px', '200px', '']}
            />
          ) : null}
          {offers.length === 0 && isOfferListLoading === false && showNoData ? (
            <NoDataRow colSpan={6} />
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  </RoundPanel>
);

export default AllegroTable;
