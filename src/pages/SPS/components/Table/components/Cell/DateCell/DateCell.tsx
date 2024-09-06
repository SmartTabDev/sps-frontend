import React from 'react';
import { styled } from '@mui/system';
import StyledHour from '../../StyledHour';

const StyledCell = styled('span')`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

type StyledDateProps = { $isVisible: boolean };

const StyledDate = styled('span', {
  shouldForwardProp: (props) => props !== '$isVisible',
})<StyledDateProps>`
  text-transform: uppercase;
  font-size: 12px;
  font-family: Lato;
  font-weight: 600;
  line-height: 16px;
  color: #3b455e;
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
`;

const DateCell: React.FC<{
  date: string;
  isVisible: boolean;
  withHour: boolean;
}> = ({ date, isVisible, withHour }) => {
  const [day, month, hour] = String(date).split(' ');

  return (
    <StyledCell>
      <StyledDate $isVisible={isVisible}>
        {day} {month}
      </StyledDate>
      {withHour && <StyledHour>{hour}</StyledHour>}
    </StyledCell>
  );
};

export default DateCell;
