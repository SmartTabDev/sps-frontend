import { styled } from '@mui/system';
import { ReactComponent as PercentageIcon } from './percentage-light.svg';

const Percentage = styled(PercentageIcon)`
    height: 17px;
    fill: ${({ theme }) => theme.palette.blueGrey[400]};
`;

export default Percentage;
