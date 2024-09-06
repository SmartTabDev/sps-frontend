import { Theme } from '@mui/material/styles';

export default function Tooltip(theme: Theme) {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.common.white,
          boxShadow:
            '0px -2px 0px rgba(0, 0, 0, 0.02), 0px 4px 16px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.05)',
          borderRadius: '5px',
          fontFamily: 'Lato',
          fontSize: '12px',
          lineHeight: '16px',
          padding: '12px 16px',
          maxWidth: 300,
          color: theme.palette.text.primary,
        },
        arrow: {
          color: theme.palette.common.white,
          fontSize: 17,
          '&:before': {
            border: '1px solid rgba(0, 0, 0, 0.10)',
          },
        },
      },
    },
  };
}
