import { Theme } from '@mui/material/styles';

export default function Radio(theme: Theme) {
  return {
    MuiRadio: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          paddingTop: '6px',
          paddingBottom: '6px',
        },
      },
    },
  };
}
