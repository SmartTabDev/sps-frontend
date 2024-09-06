import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/system';
import { hoveredImageSxStyle } from './styles';
import getMoreImagesCount from './utils/getMoreImagesCount';
import getVisibleImages from './utils/getVisibleImages';

const SQUARE_IMAGE_SIZE = '60px';

interface ReferenceImagesProps {
  imageUrls: string[];
  onImageClick?: (imageIndex: number) => void;
  limit?: number;
  center?: boolean;
}

const ReferenceImages = ({
  imageUrls,
  onImageClick,
  limit,
  center = false,
}: ReferenceImagesProps) => {
  const { palette } = useTheme();

  const moreImagesCount = getMoreImagesCount(imageUrls.length, limit);

  const visibleImages = getVisibleImages(imageUrls, limit);

  const moreImagesThumbnailStyle = {
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
      backgroundColor: alpha(palette.common.black, 0.6),
      content: `"+${moreImagesCount}"`,
      height: SQUARE_IMAGE_SIZE,
      width: SQUARE_IMAGE_SIZE,
      color: 'white',
      borderRadius: '5px',
      fontSize: 18,
      fontWeight: 600,
    },
  };

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      gap="16px"
      justifyContent={center ? 'center' : 'flex-start'}
    >
      {visibleImages.map((imageUrl, index) => (
        <Box
          position="relative"
          onClick={onImageClick ? () => onImageClick(index) : undefined}
          key={imageUrl}
          sx={
            onImageClick
              ? [
                  hoveredImageSxStyle,
                  moreImagesCount > 0 && index === visibleImages.length - 1
                    ? moreImagesThumbnailStyle
                    : {},
                ]
              : undefined
          }
        >
          <img
            src={imageUrl}
            srcSet={imageUrl}
            alt={`image_${index + 1}`}
            loading="lazy"
            style={{
              borderRadius: '5px',
              border: `1px solid ${palette.tableDivider.main}`,
              aspectRatio: '1',
              objectFit: 'contain',
              width: SQUARE_IMAGE_SIZE,
              height: SQUARE_IMAGE_SIZE,
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ReferenceImages;
