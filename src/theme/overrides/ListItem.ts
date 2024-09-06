import { Theme } from '@mui/material/styles';

export default function ListItem(_theme: Theme) {
  return {
    MuiListItem: {
      styleOverrides: {
        root: {
          fontFamily: 'Lato',
        },
      },
    },
  };
}
