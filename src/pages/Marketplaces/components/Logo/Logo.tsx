import React from 'react';
import { Marketplace } from 'reducers/auth/auth';
import { styled } from '@mui/system';
import { ReactComponent as CeneoLogo } from './ceneo.svg';
import { ReactComponent as IdealoLogo } from './idealo.svg';

const LogoWrapper = styled('div')`
  display: inline-flex;
  margin-left: 18px;

  svg {
    min-height: 18px;
    max-height: 30px;
    width: auto;
  }
`;

type Props = {
  marketplace: Marketplace;
};

export const Logo: React.FC<Props> = ({ marketplace }) => (
  <LogoWrapper>
    {marketplace === 'ceneo' && <CeneoLogo />}
    {marketplace === 'idealo' && <IdealoLogo />}
  </LogoWrapper>
);
