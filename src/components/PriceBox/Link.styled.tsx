import Link from '@mui/material/Link';
import { styled } from '@mui/system';

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 11px;
  margin-top: 2px;
`;

export default StyledLink;
