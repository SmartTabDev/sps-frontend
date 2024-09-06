import { styled, css } from '@mui/system';

type Props = {
  $padding?: string;
};

const StyledPage = styled('main', {
  shouldForwardProp: (props) => props !== '$padding',
})<Props>`
  width: calc(100% - 60px);
  margin-left: 60px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  ${({ $padding }) =>
    $padding
      ? css`
          padding: ${$padding};
        `
      : ''};

  & > * {
    position: relative;
  }
`;

export default StyledPage;
