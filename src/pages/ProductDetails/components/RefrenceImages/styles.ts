import { Theme } from '@mui/material';
import { CSSSelectorObjectOrCssVariables } from '@mui/system';

export const hoveredImageSxStyle: CSSSelectorObjectOrCssVariables<Theme> = {
  '&:hover': {
    cursor: 'pointer',
    filter: 'brightness(110%)',
  },
};
