import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import { Stack } from '@mui/system';
import { Box } from '@mui/material';
import { Picture } from './Picture';
import Rating from '../Rating';
import { Headline } from './Headline';
import {
  ProductAttributeRow,
  ProductAttributesTable,
} from './ProductAttributesTable';
import { ProductBox, StyledUnifyCard, StyledSkeleton } from './style';

interface Headline {
  title: string;
  url?: string;
}

interface Reviews {
  totalCount?: number;
  reviewsText?: string;
  scoring?: number;
}

type Props = {
  productAttributes?: ProductAttributeRow[];
  headline?: Headline;
  reviews?: Reviews;
  pictureUrl?: string;
};

const ProductPageDetails: React.FC<Props> = ({
  headline = { title: '' },
  pictureUrl,
  productAttributes,
  reviews,
}) => {
  const { palette } = useTheme();
  const { title, url } = headline;
  return (
    <>
      <StyledUnifyCard>
        <Stack direction="row">
          <Picture src={pictureUrl} name={title} />
          <ProductBox>
            <Box mb="16px">
              {title === undefined ? (
                <Skeleton
                  width={260}
                  height={36}
                  style={{ marginTop: '-8px' }}
                />
              ) : (
                <Headline lineHeight={1.2} name={title} url={url} />
              )}
            </Box>
            {reviews === undefined ? (
              <StyledSkeleton />
            ) : (
              <Rating
                scoring={reviews.scoring}
                scoringFontSize="14px"
                textColor={palette.blueGrey[400]}
                reviewsCount={reviews.totalCount}
                reviewsText={reviews.reviewsText}
              />
            )}
            <ProductAttributesTable
              loading={productAttributes === undefined}
              attributes={productAttributes}
            />
          </ProductBox>
        </Stack>
      </StyledUnifyCard>
    </>
  );
};

export default ProductPageDetails;
