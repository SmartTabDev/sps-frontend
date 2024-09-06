import { Theme } from '@mui/material/styles';

export default function ButtonBase(_theme: Theme) {
  return {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          fontFamily: 'Lato',
        },
      },
    },
  };
}
