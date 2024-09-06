import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

type Props = {
  open: boolean;
  handleClose: () => void;
};

const CategoriesModal: React.FC<Props> = ({ open, handleClose, children }) => (
  <div>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="products-modal-title"
      aria-describedby="products-modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          width: 800,
          borderRadius: '10px',
        }}
      >
        {children}
      </Box>
    </Modal>
  </div>
);

export default CategoriesModal;
