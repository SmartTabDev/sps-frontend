import { styled } from '@mui/system';
import React from 'react';

const StyledBaseLink = styled('a')`
  color: ${({ theme }) => theme.palette.primary.main};
`;

type Props = {
  href?: string;
  style?: React.CSSProperties;
};

const BaseLink: React.FC<Props> = ({ href, style }) => {
  return href ? (
    <StyledBaseLink
      href={href}
      style={style}
      rel="noreferrer"
      target="_blank"
    />
  ) : null;
};

export default BaseLink;
