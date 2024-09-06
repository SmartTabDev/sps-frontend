import React from 'react';
import { styled } from '@mui/system';
import { ImageOutlined } from '@mui/icons-material';

const StyledNoImage = styled('div')`
  background: #f1f6fd;
  border-radius: 5px;
  width: 75px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    fill: #cddaeb;
  }
`;

interface NoImageProps {
  width?: number;
  height?: number;
}

export const NoImage = ({ height, width }: NoImageProps) => {
  return (
    <StyledNoImage sx={{ height, width }}>
      <ImageOutlined />
    </StyledNoImage>
  );
};
