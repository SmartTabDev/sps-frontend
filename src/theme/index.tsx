import { createTheme, ThemeOptions } from '@mui/material/styles';
import componentsOverride from './overrides';
import palette from './palette';

declare module '@mui/material/styles' {
  interface Palette {
    modviseBlue: Palette['primary'];
  }

  interface PaletteOptions {
    modviseBlue: PaletteOptions['primary'];
  }
}

export const themeOptions: ThemeOptions = {
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1400,
    drawer: 1500,
    modal: 1600,
    tooltip: 1500,
    snackbar: 1600,
  },
  typography: {
    fontFamily: ["'Lato'", 'sans-serif'].join(', '),
    allVariants: {
      color: '#3B455E',
    },
  },
  palette: palette.light,
};

const theme = createTheme(themeOptions);

theme.components = componentsOverride(theme);

export default theme;
