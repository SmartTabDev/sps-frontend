import { styled } from '@mui/system';
import { ReactComponent as CalendarIcon } from './calendar-alt-regular.svg';

const Calendar = styled(CalendarIcon)`
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.palette.blueGrey[400]};
`;

export default Calendar;
