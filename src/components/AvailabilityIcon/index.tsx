import { styled } from '@mui/system';
import React from 'react';
import { ReactComponent as CheckCircle } from './CheckCircle.svg';
import { ReactComponent as TimesCircle } from './TimesCircle.svg';

const StyledCheckCircle = styled(CheckCircle)`
  width: 16px;
  height: 16px;
  color: #28a745;
`;

const StyledTimesCircle = styled(TimesCircle)`
  width: 16px;
  height: 16px;
  color: #eb5757;
`;

type Props = {
    availability: boolean
};

const BaseLink: React.FC<Props> = ({ availability }) => (availability
  ? <StyledCheckCircle />
  : <StyledTimesCircle />);

export default BaseLink;
