import React from 'react';
import { styled, css } from '@mui/system';
import { Styled } from 'types/Utils';
import Label from './components/Label';
import Row from './components/Row';

type Props = {
  name: 'inStock' | 'outOfStock' | 'void';
  value: number;
  isLast: boolean;
};

const config = {
  inStock: { color: '#286DCB', label: 'In stock' },
  outOfStock: { color: '#4BD9EC', label: 'Out of stock' },
  void: { color: '#828282', label: 'Void' },
};

type WrapperProps = Styled<Pick<Props, 'isLast'> & { color: string }>;

const TotalWrapper = styled('div', {
  shouldForwardProp: (props) => props !== '$isLast' && props !== '$color',
})<WrapperProps>`
  width: calc(100% - 44px);
  color: ${({ $color }) => $color};
  position: relative;
  margin-bottom: 25px;

  ${({ $isLast }) => $isLast
    && css`
      margin-bottom: 0px;
    `}
`;

const Total: React.FC<Props> = ({ name, value, isLast }) => {
  const { label, color } = config[name];

  return (
    <TotalWrapper $color={color} $isLast={isLast}>
      <Label name={label} />
      <Row color={color} value={value} />
    </TotalWrapper>
  );
};

export default Total;
