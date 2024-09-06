import React from 'react';
import upperFirst from 'lodash/upperFirst';
import { styled, css } from '@mui/system';
import { Totals } from 'pages/Notifications/types';

const StyledTotal = styled('span')`
  margin-right: 23px;
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
`;

const StyledTotalName = styled('span')`
`;

const StyledTotalValue = styled('span', {
  shouldForwardProp: (props) => props !== '$error',
})<{ $error?: boolean }>`
  color: ${({ theme }) => theme.palette.secondary.light};
  margin-left: 5px;

  ${({ $error }) => $error && css`
    color: #EB5757
  `}
`;

type TotalStatsProps = {
  data?: Totals;
};

const TotalStats: React.FC<TotalStatsProps> = ({ data }) => (
  <>
    {data ? (
      <div>
        {data.map(({
          name, value, button, onButtonClick, error,
        }) => (
          <StyledTotal key={name}>
            <StyledTotalName>{upperFirst(name)}</StyledTotalName>
            :
            <StyledTotalValue
              onClick={onButtonClick}
              style={onButtonClick ? { cursor: 'pointer' } : {}}
              $error={error}
            >
              {value}
              {' '}
              {button ? <span>{button}</span> : null}
            </StyledTotalValue>
          </StyledTotal>
        ))}
      </div>
    ) : null}
  </>
);

export default TotalStats;
