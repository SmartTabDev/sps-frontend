import React from 'react';
import Alert from '@mui/material/Alert';

const ErrorMessage = () => (
  <Alert severity="error" style={{ order: -1 }}>
    Something went wrong.
  </Alert>
);

export default ErrorMessage;
