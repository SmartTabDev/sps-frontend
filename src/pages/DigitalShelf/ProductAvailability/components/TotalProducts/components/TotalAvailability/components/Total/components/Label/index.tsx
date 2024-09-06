import React from 'react';
import { styled } from '@mui/system';

type Props = {
  name: string;
};

const LabelWrapper = styled('div')`
  font-family: inherit;
  font-weight: bold;
  font-size: 12px;
  margin-bottom: 2px;
`;

const Label: React.FC<Props> = ({ name }) => (
  <LabelWrapper>{name}</LabelWrapper>
);

export default Label;
