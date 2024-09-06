import { styled } from '@mui/system';
import Panel from 'components/Panel';

const StyledTopBarPanel = styled(Panel)`
  background: ${({ theme }) => theme.palette.common.white};
  box-shadow: 0px 4px 9px rgba(82, 95, 129, 0.35);
  border: 1px solid rgba(82, 95, 129, 0.3);
  margin: 0;
  z-index: 0;
  padding-top: 25px;
  padding-bottom: 25px;
`;

export default StyledTopBarPanel;
