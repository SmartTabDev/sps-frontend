import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const RightSideBox = styled(Box)`
  max-height: 65vh;
  width: 100%;
  max-width: 30vw;
  min-width: 370px;
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  position: relative;
  border-radius: 0 5px 5px 0;
  padding: 2.5rem;

  @media (max-width: 1320px) {
    max-height: 100%;
    max-width: 100%;
  }

  @media (max-width: 900px) {
    border-radius: 0 0 5px 5px;
  }
`;

export default RightSideBox;
