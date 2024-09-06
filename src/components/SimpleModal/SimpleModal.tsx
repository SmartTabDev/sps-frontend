import { Modal, Box } from '@mui/material';
import React, { useState, useCallback } from 'react';
import { CloseSharp } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

type UseSimpleModal = {
  openModal: boolean;
  handleModalOpen: (id: string | null) => void;
  handleModalClose: () => void;
};

type SimpleModalProps = {
  maxHeight?: string | number;
} & Omit<UseSimpleModal, 'handleModalOpen'>;

export const useSimpleModal = (
  openModalCallback: (id: string | null) => void
): UseSimpleModal => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleModalOpen = useCallback(
    (_offerId: string | null) => {
      setOpenModal(true);
      openModalCallback(_offerId);
    },
    [openModalCallback]
  );

  const handleModalClose = useCallback(() => {
    setOpenModal(false);
    openModalCallback(null);
  }, [openModalCallback]);

  return {
    openModal,
    handleModalOpen,
    handleModalClose,
  };
};

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  p: '40px 30px',
  boxShadow:
    '0px -2px 0px rgba(0, 0, 0, 0.02), 0px 4px 16px rgba(0, 0, 0, 0.15)',
  borderRadius: '10px' as any,
  outline: 'none',
};

export const SimpleModal: React.FC<SimpleModalProps> = ({
  children,
  openModal,
  handleModalClose,
  maxHeight,
}) => {
  const theme = useTheme();

  return (
    <Modal
      open={openModal}
      onClose={handleModalClose}
      sx={{
        zIndex: theme.zIndex.snackbar,
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box sx={{ ...modalStyle, maxHeight }}>
        <CloseSharp
          onClick={handleModalClose}
          sx={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            fontSize: '18px',
            color: '#000',
            cursor: 'pointer',
          }}
        />
        {children}
      </Box>
    </Modal>
  );
};
