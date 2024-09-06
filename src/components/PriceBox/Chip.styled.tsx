import { styled } from '@mui/system';

const StyledChip = styled('div', {
  shouldForwardProp: (props) => props !== '$style',
})<{ $style: 'light' | 'dark'; [key: string]: any }>`
  height: 19px;
  font-weight: bold;
  font-size: 10px;
  line-height: 19px;
  color: ${({ theme }) => theme.palette.grey[500]};
  margin-top: 4px;
  border: none;
  cursor: default;
  display: inline-flex;
  outline: 0;
  padding: 0;
  box-sizing: border-box;
  transition: background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  align-items: center;
  font-family: Lato;
  white-space: nowrap;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;

  span {
    padding-left: 8px;
    padding-right: 8px;
    text-overflow: ellipsis;
    border: 1px solid ${({ $style, theme }) => ($style === 'light'
    ? theme.palette.secondary.dark
    : theme.palette.primary.main)};
    border-radius: 3px;

  }
}
`;

export default StyledChip;
