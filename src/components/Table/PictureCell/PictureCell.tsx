import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/system';
import LazyLoad from 'react-lazyload';
import { NoImage } from 'components/NoImage/NoImage';

const Placeholder: React.FC = () => (
  <Skeleton
    variant="rectangular"
    style={{ borderRadius: '3px' }}
    width={70}
    height={70}
  />
);

const ExternalImage: React.FC<Partial<HTMLImageElement>> = (props) => {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const { src, alt } = props;

  return (
    <>
      <img
        style={{ display: loaded ? 'block' : 'none' }}
        onLoad={() => setLoaded(true)}
        src={src}
        alt={alt}
      />
      {!loaded && <Placeholder />}
    </>
  );
};

const PictureWrapper = styled('div')`
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: auto;
    height: auto;
    max-width: 70px;
    max-height: 70px;
    margin: auto;
  }
`;

export const PictureCell: React.FC<{
  pictureUrl?: string;
  productName?: string;
  isLoading?: boolean;
}> = ({ pictureUrl, productName, isLoading }) => {
  if (isLoading) {
    return <Skeleton height={125} width={70} />;
  }

  return (
    <>
      {pictureUrl ? (
        <PictureWrapper>
          <LazyLoad height={125} placeholder={<Placeholder />} once throttle>
            <ExternalImage src={pictureUrl} alt={productName || ''} />
          </LazyLoad>
        </PictureWrapper>
      ) : (
        <NoImage />
      )}
    </>
  );
};
