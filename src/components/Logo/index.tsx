import React from 'react';
import { styled } from '@mui/system';
import { Link, LinkProps } from 'react-router-dom';

const LogoBox = styled((props: LinkProps) => <Link {...props} />)<LinkProps>`
  position: absolute;
  top: 35px;
  margin: 0 auto;
  z-index: 1000;

  @media only screen and (min-width: 800px) {
    top: 15px;
  }
`;

const LogoImg = styled('img')`
  width: ${(props) => (props.width ? props.width : '12rem')};
  height: auto;
  cursor: pointer;
`;

type Props = {
  withWrapper?: boolean;
};

const Logo: React.FC<Props> = ({ withWrapper = false }) =>
  withWrapper ? (
    <LogoBox to="/" style={{ textDecoration: 'none' }}>
      <LogoImg src="/logo.png" alt="" />
    </LogoBox>
  ) : (
    <LogoImg src="/logo.png" alt="" />
  );

export default Logo;
