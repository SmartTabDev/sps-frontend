import { Theme } from '@mui/material/styles';

export default function Input(_theme: Theme) {
  return {
    MuiInput: {
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottom: '2px solid #525f814d !important',
          },
          '&:after': {
            borderBottom: '2px solid #525f814d !important',
          },
        },
      },
    },
  };
}
