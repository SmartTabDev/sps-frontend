import { styled, css } from '@mui/system';

const TableWrapper = styled('div', {
  shouldForwardProp: (props) => props !== 'hasData',
})<{ hasData: boolean }>`
  ${({ hasData, theme }) =>
    hasData &&
    css`
      margin: 20px 30px 10px 30px;
      box-shadow: 0px 4px 4px rgb(0 0 0 / 25%), 0px -1px 6px rgb(0 0 0 / 15%);
      border-radius: 10px;
      overflow: hidden;
      background-color: #fff;
    `}
`;

export default TableWrapper;
