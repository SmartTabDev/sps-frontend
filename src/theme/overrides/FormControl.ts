import { Theme } from '@mui/material/styles';

export default function FormControl(_theme: Theme) {
  return {
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '0',

          '.MuiFormLabel-root.Mui-disabled.Mui-error': {
            color: 'rgba(0,0,0,0.38)',
          },
        },
      },
    },
  };
}
