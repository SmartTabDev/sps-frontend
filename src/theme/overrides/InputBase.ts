import { Theme } from '@mui/material/styles';

export default function InputBase(_theme: Theme) {
  return {
    MuiInputBase: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            transitionDelay: '9999s',
            transitionProperty: 'background-color, color',
          },
        },
      },
    },
  };
}
