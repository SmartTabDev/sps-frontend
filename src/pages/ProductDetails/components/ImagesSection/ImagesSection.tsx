import { Box } from '@mui/material';
import { UnifyCard, UnifyCardTitle } from 'components/UnifyCard/UnifyCard';
import React from 'react';
import { OrderType } from 'components/OrderButton';
import useTableOrder from 'hooks/useTableOrder';
import { SECTION_DESCRIPTION } from './constants';
import ReferenceImagesSection from '../ReferenceImagesSection/ReferenceImagesSection';
import ImagesTable from '../ImagesTable/ImagesTable';
import { RetailerImagesRatingSummary } from '../ImagesTable/types';

interface ImagesSectionProps {
  referenceImageUrls: string[];
  retailerImagesRatingSummaries: RetailerImagesRatingSummary[];
  handleImagesTableOrderChange: ReturnType<
    typeof useTableOrder
  >['handleOrderChange'];
  imagesTableOrderType: OrderType;
  isLoading?: boolean;
}

const ImagesSection = ({
  referenceImageUrls,
  retailerImagesRatingSummaries,
  handleImagesTableOrderChange,
  imagesTableOrderType,
  isLoading,
}: ImagesSectionProps) => {
  return (
    <UnifyCard>
      <UnifyCardTitle tooltipProps={{ title: SECTION_DESCRIPTION }}>
        Images
      </UnifyCardTitle>
      <Box mt={4}>
        <ReferenceImagesSection imageUrls={referenceImageUrls} />
      </Box>
      <Box mt={8}>
        <ImagesTable
          isLoading={isLoading}
          retailerImagesRatingSummaries={retailerImagesRatingSummaries}
          handleOrderChange={handleImagesTableOrderChange}
          orderType={imagesTableOrderType}
        />
      </Box>
    </UnifyCard>
  );
};

export default ImagesSection;
