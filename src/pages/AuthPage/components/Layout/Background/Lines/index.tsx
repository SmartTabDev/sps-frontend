import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { Line } from 'components/Line/Line';

type Props = {
  hideForMobile?: boolean;
};

const StyledBox = styled(Box, {
  shouldForwardProp: (props) => props !== '$hideForMobile',
})<{ $hideForMobile: boolean }>`
  position: absolute;
  top: 32px;
  left: -31px;
  @media (max-width: 900px) {
    ${({ $hideForMobile }) => ($hideForMobile ? 'display:none;' : '')}
  }
`;

const BackgroundLines: React.FC<Props> = ({ hideForMobile = false }) => (
  <StyledBox $hideForMobile={hideForMobile}>
    <Line
      background="linear-gradient(270deg, rgba(82, 95, 129, 0.1) 50%, rgba(255, 255, 255, 0) 96.79%);"
      height={13}
      width={146}
      margin="0 0 13px 0"
    />
    <Line
      background="linear-gradient(270deg, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 97.42%);"
      height={12}
      width={274}
      margin="0 0 18px 0"
    />
    <Line
      background="linear-gradient(270deg, rgba(82, 95, 129, 0.1) 50%, rgba(255, 255, 255, 0) 96.79%);"
      height={13}
      width={186}
      margin="0 0 0 0"
    />
  </StyledBox>
);

export default BackgroundLines;
