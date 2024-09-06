import React from 'react';
import { styled } from '@mui/system';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import BaseLink from 'components/BaseLink/BaseLink';
import { relDiff, getRangePercentage } from 'utils/getPercentage';
import TableSkeletons from 'components/TableSkeletons/TableSkeletons';
import PriceRange from 'components/PriceRange/PriceRange';
import round from 'lodash/round';
import { Difference } from 'components/Difference/Difference';
import AvailabilityIcon from 'components/AvailabilityIcon';
import TableContainer from '@mui/material/TableContainer';
import { EdgeCell, TableHeaderCell } from 'components/TableCell/TableCell';
import { NoDataRow } from 'components/Table/NoDataRow/NoDataRow';
import RoundPanel from '../../../Marketplaces/components/RoundPanel';
import Table from '../../../Marketplaces/components/Table/components/Table.styled';

const StyledTableRow = styled(TableRow)`
  max-height: 145px;
  padding: 22px 16px;
`;

const StyledRoundPanel = styled(RoundPanel)`
  margin-top: 13px;
  padding: 0;
`;

const BoldBaseLink = styled(BaseLink)`
  font-weight: 700;
`;

const CenterTableCell = styled(TableCell)`
  text-align: center;
  padding: 32px 16px;
`;

export type Offer = {
  available?: boolean;
  productName?: string | null;
  goToShopUrl?: string;
  price?: number | null;
  retailer?: string;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
};

type Props = {
  offers: Offer[] | undefined;
  rrp: number | null;
  isLoading: boolean;
};

export const PriceDrilldown: React.FC<Props> = ({
  offers = [],
  rrp,
  isLoading,
}) => {
  const columnCount = 7;

  return (
    <StyledRoundPanel>
      <TableContainer sx={{ maxHeight: 390 }}>
        <Table stickyHeader>
          <TableHead>
            <StyledTableRow>
              <EdgeCell />
              <TableHeaderCell $left>RETAILER</TableHeaderCell>
              <TableHeaderCell $left>RETAILER PRODUCT NAME</TableHeaderCell>
              <TableHeaderCell>AVAILABILITY</TableHeaderCell>
              <TableHeaderCell>{rrp && 'RRP DIFF'}</TableHeaderCell>
              <TableHeaderCell>
                PRICE FLUCTUATIONS (LAST 7 DAYS)
              </TableHeaderCell>
              <EdgeCell />
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {offers.map((offer, index) => {
              const {
                available,
                productName,
                goToShopUrl,
                price,
                retailer,
                minPrice,
                maxPrice,
              } = offer || {};

              const percentagePosition = getRangePercentage(
                price,
                maxPrice,
                minPrice
              );
              const newPosition =
                percentagePosition === 0
                  ? 1
                  : round(percentagePosition / 10, 2);

              const difference =
                rrp &&
                price &&
                (rrp >= price ? -Math.abs(rrp - price) : Math.abs(rrp - price));

              const percentage =
                rrp &&
                price &&
                (round(relDiff(rrp, price) * 100) / 100).toFixed(2);

              return (
                <StyledTableRow key={`row-${index}`}>
                  <EdgeCell />
                  <TableCell>
                    <BaseLink href={goToShopUrl}>{retailer}</BaseLink>
                  </TableCell>
                  <TableCell style={{ maxWidth: '389px' }}>
                    {goToShopUrl ? (
                      <BoldBaseLink href={goToShopUrl}>
                        {productName}
                      </BoldBaseLink>
                    ) : (
                      productName
                    )}
                  </TableCell>
                  <CenterTableCell>
                    <AvailabilityIcon
                      availability={available !== undefined ? available : false}
                    />
                  </CenterTableCell>
                  <CenterTableCell>
                    {rrp !== null && (
                      <Difference
                        difference={
                          difference === null ? undefined : difference
                        }
                        percentage={percentage || ''}
                      />
                    )}
                  </CenterTableCell>
                  <CenterTableCell>
                    <PriceRange
                      minPrice={minPrice}
                      minPriceRetailer=""
                      minPriceRetailerUrl=""
                      maxPrice={maxPrice}
                      maxPriceRetailer=""
                      maxPriceRetailerUrl=""
                      offers={10}
                      position={newPosition}
                      isLoading={isLoading}
                      tooltipValue={price ? String(price) : '-'}
                      clientPrice={price || undefined}
                      labels={!!price}
                    />
                  </CenterTableCell>
                  <EdgeCell />
                </StyledTableRow>
              );
            })}
            {isLoading === false && offers.length === 0 ? (
              <NoDataRow colSpan={9} />
            ) : null}
            {isLoading ? (
              <TableSkeletons
                horizontalCount={columnCount}
                verticalCount={5}
                skeletonsWrapper={StyledTableRow}
                skeletonWrapper={TableCell}
                disabledSkeletonWrapper={EdgeCell}
                disabledIndexes={[0, columnCount - 1]}
              />
            ) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledRoundPanel>
  );
};
