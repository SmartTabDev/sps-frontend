import { styled } from '@mui/system';
import { LinearProgress, linearProgressClasses } from '@mui/material';

export const StyledHeader = styled('div')`
  display: flex;
  align-items: flex-end;
  margin-bottom: 6px;

  > span {
    flex: 1;
    font-weight: 500;
    font-size: 10px;
  }

  > div {
    display: flex;
    align-items: flex-end;

    > span:nth-child(1) {
      margin-right: 8px;
      line-height: 16px;
      font-weight: 500;
      font-size: 16px;
      > span {
        font-size: 20px;
      }
    }

    > span:nth-child(2) {
      font-weight: 500;
      font-size: 10px;
      > span {
        font-size: 12px;
      }
    }
  }
`;

export const StyledBar = styled('div')`
  display: flex;
  align-items: center;

  > div:nth-child(2) {
    width: 8px;
  }
`;

export const BorderLinearProgress = styled(LinearProgress)(() => ({
  flex: 1,
  height: 5,
  borderRadius: 3,
  backgroundImage:
    'linear-gradient(90deg,transparent,transparent 50%,#fff 50%,#fff 100%),linear-gradient(90deg,#56ccf220,#56ccf240,#56ccf260,#56ccf280,#56ccf2)',
  backgroundSize: '4px 5px, 100% 5px',
  backgroundColor: 'unset',
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
  },
}));

export const StyledIconDown = styled('div')`
  width: 5px;
  height: 5px;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 6px solid ${(props) => props.theme.palette.error.main};
`;

export const StyledIconUp = styled('div')`
  width: 5px;
  height: 5px;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 6px solid ${(props) => props.theme.palette.success.main};
`;

export const StyledIconSquare = styled('div')`
  width: 5px;
  height: 5px;
  background-color: ${(props) => props.theme.palette.grey[400]};
`;
