import { Theme } from '@mui/material/styles';

export default function InputAdornment(_theme: Theme) {
  return {
    MuiInputAdornment: {
      styleOverrides: {
        filled: {
          marginTop: '0 !important',
          width: '40px',
        },
      },
    },
  };
}
