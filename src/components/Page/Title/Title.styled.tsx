import { styled } from '@mui/system';
import Typography from '@mui/material/Typography';

const Title = styled(Typography)`
  font-weight: bold;
  font-size: 18px;
  line-height: 40px;
  color: '#3B455E';

  &:empty {
    display: none;

    + h4 {
      margin-left: 0px;
    }
  }
`;

export default Title;
