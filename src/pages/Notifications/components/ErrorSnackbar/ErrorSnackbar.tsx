import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

type Props = {
  message?: string;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

Alert.displayName = 'Alert';

const ErrorSnackbar: React.FC<Props> = ({
  message = 'Mandatory information is missing.',
  isOpen,
  setOpen,
}) => (
  <Snackbar
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    open={isOpen}
    autoHideDuration={3000}
    onClose={() => setOpen(false)}
  >
    <Alert severity="error" sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);

export default ErrorSnackbar;
