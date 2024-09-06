import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { ReactComponent as ExclamationRriangle } from './exclamation-triangle-regular.svg';

const BootstrapDialog = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    maxWidth: 500,
  },
  '& .MuiDialogTitle-root': {
    padding: '20px 30px',
  },
  '& .MuiDialogContent-root': {
    padding: '30px',
  },
  '& .MuiDialogActions-root': {
    padding: '10px 30px',
  },
  '& .MuiButtonBase-root': {
    fontWeight: 'bold',
    fontSize: '14px',
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 20,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const StyledTitle = styled('div')`
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;
  text-transform: uppercase;
  display: flex;
  align-items: center;

  svg {
    width: 16px;
    height: 16px;
    color: #f00f00;
    margin-right: 12px;
  }
`;

const StyledDescirption = styled(Typography)`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`;

type Props = {
  title: string;
  description: string;
  color: 'danger';
  handleClose: () => void;
  onDangerButtonClick: () => void;
  isOpen: boolean;
  dangerButtonText: string;
};

const ActionDialog: React.FC<Props> = ({
  title,
  description,
  color,
  handleClose,
  isOpen,
  onDangerButtonClick,
  dangerButtonText,
}) => (
  <div>
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
      >
        <StyledTitle>
          {color === 'danger' ? <ExclamationRriangle /> : ''}
          {title}
        </StyledTitle>
      </BootstrapDialogTitle>
      <DialogContent dividers>
        <StyledDescirption gutterBottom>{description}</StyledDescirption>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="text"
          sx={{
            ml: 1,
            '&.MuiButtonBase-root:hover': {
              bgcolor: 'transparent',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onDangerButtonClick}
          autoFocus
          color="warning"
          variant="text"
          sx={{
            ml: 1,
            '&.MuiButtonBase-root:hover': {
              bgcolor: 'transparent',
            },
          }}
        >
          {dangerButtonText}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  </div>
);

export default ActionDialog;
