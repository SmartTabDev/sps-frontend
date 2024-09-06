import { Theme } from '@mui/material/styles';

export default function FormControlLabel(_theme: Theme) {
  return {
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '14px',
          lineHeight: '16px',
        },
      },
    },
  };
}
