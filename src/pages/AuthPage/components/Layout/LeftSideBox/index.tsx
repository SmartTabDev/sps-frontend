import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const LeftSideBox = styled(Box)`
  overflow: hidden !important;
  min-width: 370px;
  width: 100%;
  max-height: 55rem;
  max-width: 30vw;
  padding: 2.5rem;
  background: ${({ theme }) => theme.palette.blueGrey[100]};
  box-shadow: 0px 4px 22px rgba(82, 95, 129, 0.2);
  border-radius: 5px 0 0 5px;
  display: flex;
  flex-direction: column;
  position: relative;
  flex-basis: 100%;
  flex: 1;

  @media (max-width: 1320px) {
    max-height: 100%;
    max-width: 100%;
  }

  @media (max-width: 900px) {
    border-radius: 5px 5px 0 0;
  }
`;

export default LeftSideBox;
