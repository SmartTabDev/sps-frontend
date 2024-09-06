import React from 'react';
import { styled, css } from '@mui/system';
import FormatPrice from '../FormatPrice/FormatPrice';
import Link from './Link.styled';
import Chip from './Chip.styled';

type Align = 'left' | 'right';

const Wrapper = styled('div', {
  shouldForwardProp: (props) => props !== '$align' && props !== '$noPaddings',
})<{ $align: Align; $noPaddings: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: ${({ $align }) => $align};
  top: -5px;
  padding-right: ${({ $align }) => ($align === 'right' ? '10px' : 0)};
  padding-left: ${({ $align }) => ($align === 'left' ? '10px' : 0)};
  align-items: ${({ $align }) => ($align === 'right' ? 'flex-end' : 'flex-start')};

  ${({ $noPaddings }) => $noPaddings
    && css`
      padding-left: 0 !important;
      padding-right: 0 !important;
    `}
`;

const StyledChip = styled(Chip)`
  width: fit-content;

  span {
    white-space: pre;
  }
`;

const DetailsWrapper = styled('div')`
  position: absolute;
  top: 17px;
`;

export type PriceBoxProps = {
  price?: number;
  priceSize?: 'small' | 'medium' | 'big';
  retailer?: string;
  retailerUrl?: string;
  label?: string;
  align?: Align;
  disableLabel?: boolean;
  disableRetailer?: boolean;
  noPaddings?: boolean;
};

const PriceBox: React.FC<PriceBoxProps> = ({
  align = 'left',
  label,
  price,
  priceSize = 'small',
  retailer = '',
  retailerUrl = '',
  disableLabel = false,
  disableRetailer = false,
  noPaddings = false,
}) => (
  <Wrapper $align={align} $noPaddings={noPaddings}>
    <FormatPrice price={price} size={priceSize} />
    <DetailsWrapper>
      {!disableRetailer && retailer && (
        <Link href={retailerUrl} target="_blank">
          {retailer}
        </Link>
      )}
      {!disableLabel && label ? (
        <StyledChip $style="dark">
          <span>{label}</span>
        </StyledChip>
      ) : (
        <></>
      )}
    </DetailsWrapper>
  </Wrapper>
);

export default PriceBox;
