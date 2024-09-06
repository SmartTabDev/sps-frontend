import Table from '@mui/material/Table';
import { styled } from '@mui/system';

const StyledTable = styled(Table)`
  background: ${({ theme }) => theme.palette.common.white};
`;

export default StyledTable;
