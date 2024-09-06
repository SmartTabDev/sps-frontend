import React from 'react';
import Button from 'components/Button';
import { ActionProps } from 'pages/Notifications/types';
import CircularProgress from '@mui/material/CircularProgress';

const PrimaryAction: React.FC<ActionProps> = ({ action }) => {
  if (!action) {
    return null;
  }

  const {
    disabled,
    handleClick,
    handleError,
    error,
    text,
    showSnackbar,
    isLoading,
  } = action;

  const handleActionClick = () => {
    if (handleClick) {
      handleClick();
    }

    if (showSnackbar) {
      if (error) {
        if (handleError) {
          handleError();
        }
      }
    }
  };

  return (
    <>
      <Button size="medium" onClick={handleActionClick} disabled={disabled}>
        {isLoading ? <CircularProgress sx={{ color: 'white ' }} size={20} /> : text}
      </Button>
    </>
  );
};

export default PrimaryAction;
