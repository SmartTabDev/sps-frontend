import { styled } from '@mui/system';
import { ReactComponent as Pen } from './pen-regular.svg';

const Edit = styled(Pen)`
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.palette.blueGrey[400]};
    margin-right: 4px;
    position: absolute;
    top: 18px;
    right: 18px;
`;

export default Edit;
