import React from 'react';
import { styled } from '@mui/system';
import { Styled } from 'types/Utils';

type Props = {
  color: string;
  width: number;
};

type StyledProps = Styled<Props>;

const LineWrapper = styled('div', {
  shouldForwardProp: (props) => props !== '$width' && props !== '$color',
})<StyledProps>`
  border-top: 3px solid ${({ $color }) => $color};
  width: calc(2px + ${({ $width }) => $width}%);
`;

const Line: React.FC<Props> = ({ color, width }) => (
  <LineWrapper $color={color} $width={width} />
);

export default Line;
