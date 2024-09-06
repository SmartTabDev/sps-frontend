import Box from '@mui/material/Box';
import { styled } from '@mui/system';

const StyledBox = styled(Box)`
  position: relative;
  min-height: 100vh;
  overflow: hidden !important;
  background: linear-gradient(117.1deg, rgba(82, 95, 129, 0.1) 17.25%, rgba(255, 255, 255, 0.1) 80%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default StyledBox;
