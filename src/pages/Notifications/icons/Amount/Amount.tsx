import { styled } from '@mui/system';
import { ReactComponent as AmountIcon } from './usd-circle-light.svg';

const Amount = styled(AmountIcon)`
  height: 19px;
  fill: ${({ theme }) => theme.palette.blueGrey[400]};
`;

export default Amount;
