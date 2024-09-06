import React from 'react';
import { styled } from '@mui/system';
import { Action, Totals } from 'pages/Notifications/types';
import SecondaryAction from '../Actions/SecondaryAction';
import PrimaryAction from '../Actions/PrimaryAction';
import TotalStats from '../TotalStats/TotalStats';

type Props = {
  primaryAction?: Action;
  secondaryAction?: Action;
  totalStats?: Totals;
};

const StyledBottomBar = styled('div')`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1500;
`;

const StyledBottomBarContent = styled('div')`
  background: ${({ theme }) => theme.palette.common.white};
  opacity: 0.9;
  box-shadow: 0px -4px 8px rgba(82, 95, 129, 0.1);
  height: 60px;
  padding: 0 20px 0 90px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledActions = styled('div')`
  margin-left: auto;
`;

const BottomBar: React.FC<Props> = (props) => {
  const { primaryAction, secondaryAction, totalStats } = props;
  return (
    <StyledBottomBar>
      <StyledBottomBarContent>
        <TotalStats data={totalStats} />
        <StyledActions>
          <SecondaryAction action={secondaryAction} />
          <PrimaryAction action={primaryAction} />
        </StyledActions>
      </StyledBottomBarContent>
    </StyledBottomBar>
  );
};

export default BottomBar;
