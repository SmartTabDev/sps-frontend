import React from 'react';
import { styled, css } from '@mui/system';
import Box from '@mui/material/Box';
import BaseLink from 'components/BaseLink/BaseLink';

const StyledBox = styled(Box)`
  border-bottom: 1px solid #bdbdbd;
`;

const StyledFilterValue = styled('strong', {
  shouldForwardProp: (props) => props !== '$gray',
})<{ $gray?: boolean }>`
  font-size: 18px;
  line-height: 22px;
  padding-left: 12px;

  ${({ $gray, theme }) =>
    $gray &&
    css`
      color: ${theme.palette.grey[500]};
    `}
`;

const StyledFilterRow = styled('span')`
  color: ${({ theme }) => theme.palette.common.black};
  font-size: 14px;
  line-height: 17px;
  margin-right: 28px;
  font-weight: bold;
  font-family: 'Lato';
`;

type InfoBarProps = {
  filterName?: string;
  filterValue?: string;
  retailer?: string;
  result: string;
  url?: string;
};

const InfoBar: React.FC<InfoBarProps> = ({
  filterName,
  filterValue,
  retailer,
  result,
  url,
}) => (
  <StyledBox pl="30px" pb="15px" width={1}>
    <StyledFilterRow>
      {filterName}:
      {url ? (
        <BaseLink href={url}>
          <StyledFilterValue>{filterValue}</StyledFilterValue>
        </BaseLink>
      ) : (
        <StyledFilterValue>{filterValue}</StyledFilterValue>
      )}
    </StyledFilterRow>
    <StyledFilterRow>
      Retailer: <StyledFilterValue>{retailer}</StyledFilterValue>
    </StyledFilterRow>
    <StyledFilterRow>
      Result: <StyledFilterValue $gray>{result}</StyledFilterValue>
    </StyledFilterRow>
  </StyledBox>
);

export default InfoBar;
