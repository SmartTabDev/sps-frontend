import { Theme } from '@mui/material/styles';

export default function OutlinedInput(theme: Theme) {
  return {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: theme.palette.blueGrey[500],
          fontSize: '14px',
          fontWeight: 700,
          label: {
            fontWeight: 400,
          },
          paddingTop: '3px',
          paddingBottom: '3px',

          '&.Mui-focused': {
            '.MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px',
            },
          },

          '&.Mui-focused:not(.Mui-error)': {
            '.MuiOutlinedInput-notchedOutline': {
              border: `1px solid ${theme.palette.primary.main}`,
            },
          },

          '&:hover:not(.Mui-error):not(.Mui-disabled)': {
            '.MuiOutlinedInput-notchedOutline': {
              border: `1px solid ${theme.palette.text.primary}`,
            },
          },

        },
        notchedOutline: {
          borderRadius: '5px',
          border: '1px solid rgba(82, 95, 129, 0.5)',
          top: '-7px',
          color: theme.palette.blueGrey[500],
        },
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: 'none',
            WebkitTextFillColor: theme.palette.blueGrey['500'],
          },
        },
      },
    },
  };
}
