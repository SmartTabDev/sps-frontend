import React from 'react';
import {
  Skeleton,
  Stack,
  Typography,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
  Box,
} from '@mui/material';
import RoundPanel from 'pages/Marketplaces/components/RoundPanel';
import { EdgeCell, TableHeaderCell } from 'components/TableCell/TableCell';
import { PictureCell } from 'components/Table/PictureCell/PictureCell';
import { Badges } from 'components/Badges/Badges';
import BaseLink from 'components/BaseLink/BaseLink';
import formatPrice from 'utils/formatPrice';
import { NoDataRow } from 'components/Table/NoDataRow/NoDataRow';
import TableSkeletons from 'components/TableSkeletons/TableSkeletons';
import { ShopeeOffer } from './types/ShopeeOffer';
import { ShopeeSellers } from './hooks/useSellers';

type ShopeeTableProps = {
  handleModalOpen: (id: string | null) => void;
  limit: number;
  offers: ShopeeOffer[];
  isOfferListLoading: boolean;
  showNoData: boolean;
  sellers: ShopeeSellers;
};

const ShopeeTable: React.FC<ShopeeTableProps> = ({
  handleModalOpen,
  limit,
  offers,
  isOfferListLoading,
  showNoData,
  sellers,
}) => {
  return (
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
              <TableHeaderCell $left>Offer</TableHeaderCell>
              <TableHeaderCell $left>Vendor</TableHeaderCell>
              <TableHeaderCell $right>Current Price (zł)</TableHeaderCell>
              <TableHeaderCell $right>Sales Volume</TableHeaderCell>
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
                        sx={{ width: '500px', borderBottom: 'none' }}
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
                              <Typography
                                sx={{ fontSize: 11, color: '#98AFCF' }}
                              >
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
                              bidding={offer.isSuperSeller}
                              freeShipping={offer.hasFreeDelivery}
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
                        {sellers[offer.shopId] ?? (
                          <Skeleton sx={{ height: '60px' }} />
                        )}
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
            {offers.length === 0 &&
            isOfferListLoading === false &&
            showNoData ? (
              <NoDataRow colSpan={6} />
            ) : (
              <></>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </RoundPanel>
  );
};

export default ShopeeTable;
