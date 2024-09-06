import { Theme } from '@mui/material/styles';

export default function FormHelperText(theme: Theme) {
  return {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          color: theme.palette.text.primary,
        },
      },
    },
  };
}
