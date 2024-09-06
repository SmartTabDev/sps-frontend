import React from 'react';
import { Close } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

export function SnackbarCloseButton({ snackbarKey }: any) {
  const { closeSnackbar } = useSnackbar();

  return (
    <Close
      sx={{ color: 'white', mr: '10px', cursor: 'pointer' }}
      onClick={() => closeSnackbar(snackbarKey)}
    />
  );
}
