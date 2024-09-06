import React, { useContext } from 'react';
import { styled } from '@mui/system';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { Badges } from 'components/Badges/Badges';
import BaseLink from 'components/BaseLink/BaseLink';
import { Difference } from 'components/Difference/Difference';
import FormatPrice from 'components/FormatPrice/FormatPrice';
import { relDiff } from 'utils/getPercentage';
import TableSkeletons from 'components/TableSkeletons/TableSkeletons';
import MarketplaceContext from 'pages/Marketplaces/MarketplaceContext';
import { CeneoOffer, MarketplaceOffer } from 'pages/Marketplaces/types';
import AvailabilityIcon from 'components/AvailabilityIcon';
import { EdgeCell, TableHeaderCell } from 'components/TableCell/TableCell';
import { NoDataRow } from 'components/Table/NoDataRow/NoDataRow';
import RoundPanel from '../../RoundPanel';
import Table from '../../Table/components/Table.styled';
import TableRow from '../../Table/components/TableRow.styled';
import Rating from '../../../../../components/Rating';

const StyledRoundPanel = styled(RoundPanel)`
  margin-top: 13px;
  padding: 0;
`;

const BoldBaseLink = styled(BaseLink)`
  font-weight: 700;
`;

const CenterTableCell = styled(TableCell)`
  text-align: center;

  > div {
    display: flex;
    justify-content: center;
  }
`;

type PriceDrilldownProps = {
  offers: (MarketplaceOffer | undefined)[];
  clientPrice: number | undefined;
  isLoading: boolean;
};

const isCeneoOffer = (offer: any): offer is CeneoOffer =>
  typeof offer?.ceneoProductId !== 'undefined';

// product page offers listing
export const PriceDrilldown: React.FC<PriceDrilldownProps> = ({
  offers = [],
  clientPrice,
  isLoading,
}) => {
  const { marketplace, baseUrl } = useContext(MarketplaceContext);
  const isCeneoMarketplace = marketplace === 'ceneo';
  const columnCount = isCeneoMarketplace ? 9 : 8;

  return (
    <StyledRoundPanel>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <EdgeCell />
            <TableHeaderCell $left>RETAILER</TableHeaderCell>
            <TableHeaderCell $left>RETAILER PRODUCT NAME</TableHeaderCell>
            <TableHeaderCell>RATING</TableHeaderCell>
            {isCeneoMarketplace && <TableHeaderCell>BADGES</TableHeaderCell>}
            <TableHeaderCell>PRICE</TableHeaderCell>
            <TableHeaderCell>STOCK</TableHeaderCell>
            <TableHeaderCell>DIFFERENCE</TableHeaderCell>
            <EdgeCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {offers
            .filter(
              (item): item is MarketplaceOffer => typeof item !== 'undefined'
            )
            .map((offer, index) => {
              const {
                available,
                description,
                goToShopUrl,
                price,
                retailer,
                reviewsCount,
                scoring,
              } = offer;

              const difference =
                clientPrice &&
                price &&
                (clientPrice >= price
                  ? -Math.abs(clientPrice - price)
                  : Math.abs(clientPrice - price));

              const percentage =
                clientPrice &&
                price &&
                (Math.round(relDiff(clientPrice, price) * 100) / 100).toFixed(
                  2
                );

              return (
                <TableRow key={`row-${index}`}>
                  <EdgeCell />
                  <TableCell>
                    <BaseLink href={`//${retailer}`}>{retailer}</BaseLink>
                  </TableCell>
                  <TableCell style={{ maxWidth: '389px' }}>
                    {goToShopUrl ? (
                      <BoldBaseLink href={`${baseUrl}${goToShopUrl}`}>
                        {description}
                      </BoldBaseLink>
                    ) : (
                      description
                    )}
                  </TableCell>
                  <CenterTableCell style={{ minWidth: '200px' }}>
                    <Rating
                      scoring={scoring}
                      reviewsCount={reviewsCount}
                      reviewsTextFontSize="12px"
                      reviewsText="ratings"
                      breakLine
                    />
                  </CenterTableCell>
                  {isCeneoOffer(offer) && (
                    <CenterTableCell>
                      <Badges
                        trophy={
                          offer.position !== null &&
                          offer.position !== undefined &&
                          offer.position <= 2
                        }
                        isPromotion={offer.promo}
                        bidding={offer.type === 'bidding'}
                        freeShipping={offer.deliveryPrice === 0}
                      />
                    </CenterTableCell>
                  )}
                  <CenterTableCell>
                    <FormatPrice size="small-medium" price={price} />
                  </CenterTableCell>
                  <CenterTableCell>
                    <AvailabilityIcon availability={available} />
                  </CenterTableCell>
                  <CenterTableCell>
                    <Difference
                      difference={difference}
                      percentage={percentage || ''}
                    />
                  </CenterTableCell>
                  <EdgeCell />
                </TableRow>
              );
            })}
          {isLoading === false && offers.length === 0 ? (
            <NoDataRow colSpan={9} />
          ) : null}
          {isLoading ? (
            <TableSkeletons
              horizontalCount={columnCount}
              verticalCount={5}
              skeletonsWrapper={TableRow}
              skeletonWrapper={TableCell}
              disabledSkeletonWrapper={EdgeCell}
              disabledIndexes={[0, columnCount - 1]}
            />
          ) : null}
        </TableBody>
      </Table>
    </StyledRoundPanel>
  );
};
