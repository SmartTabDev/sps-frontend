import { Theme } from '@mui/material/styles';

export default function InputLabel(_theme: Theme) {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '14px',
          fontWeight: 400,
        },
      },
    },
  };
}
