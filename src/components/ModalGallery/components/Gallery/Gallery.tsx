import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Carousel from 'react-material-ui-carousel';

interface GalleryProps {
  imageUrls: string[];
  initialSlideIndex?: number;
  height?: string | number;
}

const Gallery = ({ imageUrls, initialSlideIndex, height }: GalleryProps) => {
  const { palette } = useTheme();
  const [animationDuration, setAnimationDuration] = useState<
    number | undefined
  >(0);

  const onSlideChange = () => {
    // Prevent slide animation on first render
    if (animationDuration !== undefined) {
      setAnimationDuration(undefined);
    }
  };

  return (
    <Carousel
      duration={animationDuration}
      changeOnFirstRender={false}
      onChange={onSlideChange}
      height={height}
      index={initialSlideIndex}
      autoPlay={false}
      navButtonsAlwaysVisible
      fullHeightHover={false}
      activeIndicatorIconButtonProps={{
        style: {
          color: palette.primary.main,
        },
      }}
      navButtonsProps={{
        style: { backgroundColor: palette.primary.main },
      }}
      navButtonsWrapperProps={{
        style: {
          height: 'initial',
          top: 'calc(50%)',
          transform: 'translateY(-100%)',
        },
      }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {imageUrls.map((imageUrl) => (
        <Box key={imageUrl} height="100%" width="100%" display="flex">
          <Box
            display="flex"
            maxHeight="100%"
            maxWidth="100%"
            component="img"
            margin="auto"
            src={imageUrl}
            alt={imageUrl}
          />
        </Box>
      ))}
    </Carousel>
  );
};

export default Gallery;
