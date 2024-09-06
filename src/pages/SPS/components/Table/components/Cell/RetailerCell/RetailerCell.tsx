import React, { ReactChild } from 'react';
import { styled } from '@mui/system';

const StyledLink = styled('a')`
  color: inherit;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const FakeLink = styled('span', {
  shouldForwardProp: (prop) => prop !== '$showCursor',
})<{ $showCursor: boolean }>`
  cursor: ${({ $showCursor }) => ($showCursor ? 'pointer' : 'default')};
`;

const RetailerCell: React.FC<{
  url?: string;
  showCursor: boolean;
  children: ReactChild;
}> = ({ url, children, showCursor }): JSX.Element =>
  url ? (
    <StyledLink href={url} target="_blank" rel="noopener noreferrer">
      {children}
    </StyledLink>
  ) : (
    <FakeLink $showCursor={showCursor}>{children}</FakeLink>
  );

export default RetailerCell;
