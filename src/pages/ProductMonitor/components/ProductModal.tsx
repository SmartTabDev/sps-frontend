import React from 'react';
import { styled } from '@mui/system';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Modal from '@mui/material/Modal';

const StyledModalContent = styled('div')`
  width: 90%;
  height: auto;
  background: rgba(255, 255, 255, 0.95);
  padding: 30px;
  outline: 0;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
`;

const StyledModalHeader = styled('div')`
    justify-content: space-between;
    align-items: center;
    display: flex;

    h2 { 
        font-family: Lato;
        font-weight: bold;
        font-size: 22px;
        line-height: 26px;
    }

    svg {
        cursor: pointer;
    }
}
`;

type Props = {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: React.ReactChild;
};

const ProductModal: React.FC<Props> = ({
  open,
  handleClose,
  title,
  children,
}) => (
  <Modal open={open} onClose={handleClose}>
    <StyledModalContent>
      <StyledModalHeader>
        <h2>{title}</h2>
        <HighlightOffIcon onClick={handleClose} fontSize="small" />
      </StyledModalHeader>
      {children}
    </StyledModalContent>
  </Modal>
);

export default ProductModal;
