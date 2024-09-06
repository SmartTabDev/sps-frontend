import { Box } from '@mui/material';
import { styled, css } from '@mui/system';

const RoundPanel = styled(Box, {
  shouldForwardProp: (props) => props !== '$error',
})<{ $error?: boolean }>`
  border-radius: 10px;
  box-shadow: 0px -2px 0px rgba(0, 0, 0, 0.02), 0px 4px 16px rgba(0, 0, 0, 0.15);
  background: ${({ theme }) => theme.palette.common.white};
  overflow: auto;

  ${(props) =>
    props.$error &&
    css`
      border: 1px solid #f00f00;
      box-shadow: 0px 4px 4px rgba(240, 15, 0, 0.25),
        0px -1px 6px rgba(240, 15, 0, 0.15);
    `};

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default RoundPanel;
