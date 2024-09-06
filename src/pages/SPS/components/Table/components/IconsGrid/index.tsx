import { styled } from '@mui/system';

const IconsGrid = styled('div')`
  display: grid;
  grid-template-rows: 12px 12px;
  grid-template-columns: 9px;
  width: 10px;
  position: absolute;
  right: -16px;
  top: 44%;
  transform: translateY(-50%);
  align-items: center;

  svg {
    width: 9px;
    height: 9px;
  }
`;

export default IconsGrid;
