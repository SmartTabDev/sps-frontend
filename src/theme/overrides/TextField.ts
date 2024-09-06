import { Theme } from '@mui/material/styles';

export default function TextField(theme: Theme) {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: 'none',
          },

          color: theme.palette.primary.main,

          '&:hover': {
            '[data-shrink="true"]:not(.Mui-error):not(.Mui-disabled)': {
              color: theme.palette.text.primary,
            },
          },
        },
      },
    },
  };
}
