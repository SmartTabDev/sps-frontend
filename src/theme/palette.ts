import { Color } from '@mui/material';

declare module '@mui/material/styles/createPalette' {
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }

  interface PaletteColor {
    lighter: string;
    darker: string;
  }

  interface Palette {
    blueGrey: Color;
    tableDivider: PaletteColor;
    tableBackground: PaletteColor;
  }
}

declare module '@mui/material' {
  interface Color {
    500_8: string;
    500_12: string;
    500_16: string;
    500_24: string;
    500_32: string;
    500_48: string;
    500_56: string;
    500_80: string;
  }
}

const TEXT_COLOR = '#3B455E';

const PRIMARY = {
  lighter: '',
  light: '#2F80ED',
  main: '#447EEB',
  dark: '#286DCB',
  darker: '',
};

const SECONDARY = {
  lighter: '',
  light: '#92DEF7',
  main: '#4BD9EC',
  dark: '#56CCF2',
  darker: '#2D9CDB',
};

const GREY = {
  50: '#FAFAFA',
  100: '#F1F1F1',
  200: '#E0E0E0',
  300: '#CCCCCC',
  400: '#BDBDBD',
  500: '#828282',
  600: '#4F4F4F',
  700: '#333333',
  800: '',
  900: '',
  //   500_8: alpha('#919EAB', 0.08),
  //   500_12: alpha('#919EAB', 0.12),
  //   500_16: alpha('#919EAB', 0.16),
  //   500_24: alpha('#919EAB', 0.24),
  //   500_32: alpha('#919EAB', 0.32),
  //   500_48: alpha('#919EAB', 0.48),
  //   500_56: alpha('#919EAB', 0.56),
  //   500_80: alpha('#919EAB', 0.8),
};

const TABLE_DIVIDER = {
  main: '#CDDAEB',
};

const TABLE_BACKGROUND = {
  main: '#F1F6FD',
};

const BLUE_GREY = {
  100: '#FAFAFB',
  200: '#EEEEEF', // TODO
  300: '#E4E6EC', // PARTIAL TODO
  400: '#525f81',
  500: '#3B455E',
};

const COMMON = {
  primary: {
    ...PRIMARY,
    contrastText: '#fff',
  },
  secondary: {
    ...SECONDARY,
    contrastText: '#fff',
  },
  error: {
    main: '#EB5757',
    light: '#EB5757',
    dark: '#EB5757',
    lighter: '',
    darker: '',
  },
  success: {
    main: '#219653',
    light: '#219653',
    dark: '#219653',
    lighter: '',
    darker: '',
  },
  warning: {
    main: '#F2C94C',
    light: '#F2C94C',
    dark: '#F2C94C',
    lighter: '',
    darker: '',
  },
  grey: GREY,
  blueGrey: BLUE_GREY,
  tableOddRow: '#F1F6FD',
  tableDivider: TABLE_DIVIDER,
  tableBackground: TABLE_BACKGROUND,
  modviseBlue: PRIMARY,
  tableIconsInactive: '#98AFCF',
};

const palette = {
  light: {
    ...COMMON,
    mode: 'light',
    text: { primary: TEXT_COLOR },
  },
  dark: {
    ...COMMON,
    mode: 'dark',
  },
} as const;

export default palette;
