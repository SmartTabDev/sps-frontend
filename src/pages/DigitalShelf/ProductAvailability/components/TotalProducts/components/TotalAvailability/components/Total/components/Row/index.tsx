import React from 'react';
import { styled } from '@mui/system';
import Line from '../Line';
import Value from '../Value';

type Props = {
  color: string;
  value: number;
};

const RowWrapper = styled('div')`
  width: 100%;
  display: block;
`;

const Row: React.FC<Props> = ({ color, value }) => (
  <RowWrapper>
    <Line color={color} width={value} />
    <Value value={value} />
  </RowWrapper>
);

export default Row;
