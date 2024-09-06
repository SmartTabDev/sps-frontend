import React, { useContext } from 'react';
import { styled } from '@mui/system';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import BaseLink from 'components/BaseLink/BaseLink';
import FormatPrice from 'components/FormatPrice/FormatPrice';
import TableSkeletons from 'components/TableSkeletons/TableSkeletons';
import MarketplaceContext from 'pages/Marketplaces/MarketplaceContext';
import { MarketplaceOffer } from 'pages/Marketplaces/types';
import AvailabilityIcon from 'components/AvailabilityIcon';
import { EdgeCell, TableHeaderCell } from 'components/TableCell/TableCell';
import { NoDataRow } from 'components/Table/NoDataRow/NoDataRow';
import RoundPanel from '../../RoundPanel';
import Table from '../../Table/components/Table.styled';
import TableRow from '../../Table/components/TableRow.styled';

import { CeneoOfferRaw } from '../../../ceneo/types';

const StyledRoundPanel = styled(RoundPanel)`
  margin-top: 13px;
  padding: 0;
`;

const BoldBaseLink = styled(BaseLink)`
  font-weight: 700;
`;

const CenterTableCell = styled(TableCell)`
  text-align: center;
`;

type Props = {
  offers: (MarketplaceOffer | undefined)[];
  isLoading: boolean;
};

export const Promotions: React.FC<Props> = ({ offers, isLoading }) => {
  const { baseUrl } = useContext(MarketplaceContext);

  return (
    <StyledRoundPanel>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <EdgeCell />
            <TableHeaderCell $left>RETAILER</TableHeaderCell>
            <TableHeaderCell $left>RETAILER PRODUCT NAME</TableHeaderCell>
            <TableHeaderCell $left>PROMOTION</TableHeaderCell>
            <TableHeaderCell>PRICE</TableHeaderCell>
            <TableHeaderCell>STOCK</TableHeaderCell>
            <EdgeCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {offers.map((offer, index) => {
            const {
              available,
              description,
              goToShopUrl,
              price,
              promo,
              retailer,
            } = (offer as CeneoOfferRaw) || {};

            return (
              <TableRow key={index}>
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
                <TableCell>{promo}</TableCell>
                <CenterTableCell>
                  <FormatPrice size="small-medium" price={price} />
                </CenterTableCell>
                <CenterTableCell>
                  <AvailabilityIcon availability={available} />
                </CenterTableCell>
                <EdgeCell />
              </TableRow>
            );
          })}
          {isLoading === false && offers.length === 0 ? (
            <NoDataRow colSpan={7} />
          ) : null}
          {isLoading ? (
            <TableSkeletons
              horizontalCount={7}
              verticalCount={5}
              skeletonsWrapper={TableRow}
              skeletonWrapper={TableCell}
              disabledSkeletonWrapper={EdgeCell}
              disabledIndexes={[0, 6]}
            />
          ) : null}
        </TableBody>
      </Table>
    </StyledRoundPanel>
  );
};
