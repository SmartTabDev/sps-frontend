import { Theme } from '@mui/material/styles';

export default function Slider(theme: Theme) {
  return {
    MuiSlider: {
      styleOverrides: {
        root: {
          color: theme.palette.secondary.dark,
          height: 6,
        },
        thumb: {
          height: 20,
          width: 20,
          backgroundColor: theme.palette.common.white,
          border: '2px solid currentColor',
          marginTop: 0,

          '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
          },
        },
        active: {},
        valueLabel: {
          left: 'calc(-50% + 4px)',
        },
        track: {
          height: 6,
          borderRadius: 4,
        },
        rail: {
          height: 6,
          borderRadius: 4,
        },
        mark: {
          backgroundColor: theme.palette.secondary.dark,
          borderRadius: 50,
          marginLeft: '-3px',
        },
        markLabel: {
          fontWeight: 'bold',
          fontSize: '12px',
          lineHeight: '14px',
          marginTop: '14px',

          '&[data-index="0"]': {
            transform: 'translateX(0%)',
          },

          '&[data-index="1"]': {
            transform: 'translateX(-100%)',
            marginLeft: '3px',
          },
        },
      },
    },
  };
}
