import { styled } from '@mui/system';

const Overlay = styled('div')`
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.15);
  z-index: 999;
  top: 0;
`;

export default Overlay;
