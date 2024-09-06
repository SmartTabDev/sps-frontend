import React from 'react';
import {
  SimpleModal,
  useSimpleModal,
} from 'components/SimpleModal/SimpleModal';
import Gallery from './components/Gallery/Gallery';

interface ModalGalleryProps {
  open: boolean;
  imageUrls: string[];
  initialSlideIndex?: number;
  onClose: () => void;
}

const ModalGallery = ({
  imageUrls,
  open,
  onClose,
  initialSlideIndex,
}: ModalGalleryProps) => {
  const { handleModalClose } = useSimpleModal(onClose);
  return (
    <SimpleModal
      maxHeight="90%"
      openModal={open}
      handleModalClose={handleModalClose}
    >
      <Gallery
        height="70vh"
        initialSlideIndex={initialSlideIndex}
        imageUrls={imageUrls}
      />
    </SimpleModal>
  );
};

export default ModalGallery;
