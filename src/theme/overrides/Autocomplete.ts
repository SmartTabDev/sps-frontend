import { Theme } from '@mui/material/styles';

export default function Autocomplete(theme: Theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          top: '1px !important',
        },
        paper: {
          boxShadow: '0px 4px 9px rgba(82, 95, 129, 0.35)',
          borderRadius: '0px 0px 5px 5px',
          opacity: '0.95',
        },
        listbox: {
          '& .MuiAutocomplete-option': {
            height: '40px',
            paddingLeft: '7px',
            fontSize: '14px',
            '&[aria-selected="true"]': {
              backgroundColor: 'rgba(82, 95, 129, 0.1)', // textColor with opacity 0.1
            },
            '&[data-focus="true"]': {
              backgroundColor: 'rgba(82, 95, 129, 0.05)',
            },
            '&:active': {
              backgroundColor: 'rgba(82, 95, 129, 0.11)',
            },
          },
          '& .MuiAutocomplete-option[aria-selected="true"].Mui-focused': {
            backgroundColor: 'rgba(82, 95, 129, 0.05)',
          },
        },
        groupLabel: {
          color: theme.palette.blueGrey['500'],
          fontSize: '16px',
          fontWeight: 'bold',
        },
        root: {
          '.MuiAutocomplete-clearIndicator svg': {
            fill: theme.palette.text.primary,
          },
          '.MuiAutocomplete-popupIndicator svg': {
            fill: theme.palette.text.primary,
          },
          '.MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
            padding: '9px',
          },
        },
      },
    },
  };
}
