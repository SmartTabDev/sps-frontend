import { Theme } from '@mui/material/styles';

export default function FilledInput(theme: Theme) {
  return {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: '5px 5px 0px 0px',
          lineHeight: '16px',
          background: 'rgba(82, 95, 129, 0.1)',
          color: theme.palette.blueGrey['500'],
          fontSize: '14px',
          fontWeight: 500,

          '&.Mui-focused': {
            fontWeight: '500',
          },

          '&.Mui-disabled': {
            fontWeight: '600',
          },

          '&:hover:not($disabled)': {
            backgroundColor: 'rgba(82, 95, 129, 0.1)',
          },

          input: {
            '&:-webkit-autofill': {
              WebkitTextFillColor: theme.palette.text.primary,
            },
          },
        },
        underline: {
          '&:before': {
            borderBottomWidth: '2px !important',
            borderColor: 'rgba(82, 95, 129, 0.3)',
          },
          '&:after': {
            borderBottomWidth: '2px !important',
            borderColor: 'rgba(82, 95, 129, 0.3)',
          },
          '&:hover:not(.Mui-disabled):before': {
            borderBottom: `2px solid ${theme.palette.primary.main}`,
            borderColor: theme.palette.primary.main,
          },
          '&:hover:not(.Mui-disabled):after': {
            borderBottom: `2px solid ${theme.palette.text.primary}`,
            borderColor: theme.palette.primary.main,
          },
        },
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: 'none',
            WebkitTextFillColor: theme.palette.grey[500],
          },
        },
      },
    },
  };
}
