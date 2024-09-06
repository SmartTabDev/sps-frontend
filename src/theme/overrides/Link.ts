import { Theme } from '@mui/material/styles';

export default function Link(_theme: Theme) {
  return {
    MuiLink: {
      styleOverrides: {
        underlineAlways: {
          textDecoration: 'none',

          '&:hover': {
            textDecoration: 'underline',
          },
        },
      },
    },
  };
}
