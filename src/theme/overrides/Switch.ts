import { Theme } from '@mui/material/styles';

export default function Switch(theme: Theme) {
  return {
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: theme.palette.grey[100],
        },
        thumb: {
          boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)',
        },
        track: {
          backgroundColor: 'rgba(34, 31, 31, 0.26)',
          opacity: 1,
        },
      },
    },
  };
}
