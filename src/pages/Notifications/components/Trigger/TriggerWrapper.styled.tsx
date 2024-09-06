import { styled, css } from '@mui/system';

const StyledTriggerWrapper = styled('div', {
  shouldForwardProp: (props) => props !== '$border',
})<{ $border: boolean }>`
  display: flex;
  align-items: center;

  > div:first-of-type {
    flex: 1;
    box-sizing: border-box;
    border-radius: 3px;
    padding-top: 0;
    margin: 20px 0;

    ${({ $border, theme }) =>
      $border &&
      css`
        box-shadow: 0px 4px 0px 9px white,
          0px 4px 0px 10px ${theme.palette.blueGrey[300]};
      `};
  }
`;

export default StyledTriggerWrapper;
