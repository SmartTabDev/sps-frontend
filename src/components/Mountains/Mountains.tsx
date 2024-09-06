import React from 'react';
import { styled } from '@mui/system';
import { ReactComponent as MountainsVector } from 'components/FiltersDrawer/background/mountains.svg';

const StyledBackground = styled('div', {
  shouldForwardProp: (props) => props !== '$grey',
})<{ $grey: boolean }>`
  opacity: 0.3;
  filter: ${({ $grey }) => ($grey ? 'grayscale(1)' : 'initial')};

  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: -1;

  svg {
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    fill: ${({ theme }) => theme.palette.secondary.darker};
  }
`;

type Props = {
  grey?: boolean;
};

const Mountains: React.FC<Props> = ({ grey = false }) => (
  <StyledBackground $grey={grey}>
    <MountainsVector />
  </StyledBackground>
);

export default Mountains;
