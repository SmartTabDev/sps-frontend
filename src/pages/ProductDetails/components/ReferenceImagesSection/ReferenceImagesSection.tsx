import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import ModalGallery from 'components/ModalGallery/ModalGallery';
import ReferenceImages from '../RefrenceImages/ReferenceImages';
import { FullWidthHeader } from './styles';

interface ReferenceImagesProps {
  imageUrls: string[];
}

const ReferenceImagesSection = ({ imageUrls }: ReferenceImagesProps) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [initialGallerySlideIndex, setInitialGallerySlideIndex] = useState(0);

  const closeGallery = () => {
    setIsGalleryOpen(false);
    setInitialGallerySlideIndex(0);
  };

  const openGallerySlide = (slideIndex: number) => {
    setIsGalleryOpen(true);
    setInitialGallerySlideIndex(slideIndex);
  };

  return (
    <Box>
      <FullWidthHeader underlined>
        <Typography
          letterSpacing={0}
          paddingLeft="16px"
          fontSize="12px"
          fontWeight={600}
        >
          Reference images
        </Typography>
      </FullWidthHeader>
      <Box paddingX="16px">
        <ReferenceImages
          imageUrls={imageUrls}
          onImageClick={openGallerySlide}
        />
      </Box>
      <ModalGallery
        open={isGalleryOpen}
        onClose={closeGallery}
        initialSlideIndex={initialGallerySlideIndex}
        imageUrls={imageUrls}
      />
    </Box>
  );
};

export default ReferenceImagesSection;
