import React from 'react';
import { styled } from '@mui/system';
import Skeleton from '@mui/material/Skeleton';
import { NoImage } from 'components/NoImage/NoImage';

interface Props {
  src: string | undefined;
  name: string | undefined;
}

const Image = styled('img')`
  width: auto;
  height: auto;
  max-height: 222px;
  max-width: 222px;
  margin: auto;
`;

const PictureWrapper = styled('div')`
  height: 222px;
  width: 222px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Picture: React.FC<Props> = ({ src, name }) =>
  src || (!src && name) ? (
    <PictureWrapper>
      {src ? (
        <Image src={src} alt={name} />
      ) : (
        <NoImage width={222} height={222} />
      )}
    </PictureWrapper>
  ) : (
    <Skeleton
      variant="rectangular"
      style={{ borderRadius: '3px' }}
      width={222}
      height={222}
    />
  );
