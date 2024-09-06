import { styled } from '@mui/system';

import { ReactComponent as ArrowDown } from './arrow-down.svg';
import { ReactComponent as ArrowUp } from './arrow-up.svg';
import { ReactComponent as Ban } from './ban.svg';

const StyledBan = styled(Ban)`
  color: ${({ theme }) => theme.palette.common.black};
`;

export { ArrowDown, ArrowUp, StyledBan as Ban };
