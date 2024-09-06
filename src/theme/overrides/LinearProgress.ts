import { Theme } from '@mui/material/styles';

export default function LinearProgress(theme: Theme) {
  return {
    MuiLinearProgress: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: theme.palette.grey[100],
        },
      },
    },
  };
}
