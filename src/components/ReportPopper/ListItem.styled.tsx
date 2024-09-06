import { styled, css } from '@mui/system';

const ListItem = styled('div', {
  shouldForwardProp: (props) => props !== '$isHover',
})<{ $isHover?: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;

  font-family: Lato;
  font-size: 14px;
  line-height: 17px;
  color: ${({ theme }) => theme.palette.blueGrey[400]};
  padding: 18px 23px 18px 32px;

  cursor: pointer;

  svg {
    width: 14px;
    height: 18px;

    &:first-of-type {
      color: ${({ theme }) => theme.palette.blueGrey[400]};
      margin-right: 35px;
    }

    &:last-of-type {
      color: ${({ theme }) => theme.palette.primary.main};
      margin-left: auto;
    }
  }

  ${({ $isHover }) => $isHover
    && css`
      font-weight: bold;
      background: #EDEFF2;
      border-radius: 5px;
    `}
`;

export default ListItem;
