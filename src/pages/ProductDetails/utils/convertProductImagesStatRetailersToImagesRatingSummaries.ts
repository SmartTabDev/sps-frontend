/* eslint-disable camelcase */
import { Retailer } from 'api/hooks/useProductImageStatQuery';
import { RetailerImagesRatingSummary } from '../components/ImagesTable/types';

export const convertProductImagesStatRetailersToImagesRatingSummaries = (
  retailers: Retailer[]
): RetailerImagesRatingSummary[] => {
  const retailerImagesRatingSummaries = retailers.map(
    (
      {
        name,
        other_images,
        packshot,
        packshot_match,
        total_images,
        video_match,
      },
      index
    ) => {
      return {
        index,
        otherImagesUrls: other_images,
        packshotMatch: Boolean(packshot_match),
        packshotUrl: packshot,
        retailer: name,
        totalImages: total_images,
        videoMatch: Boolean(video_match),
        videoUrl: '',
      };
    }
  );

  return retailerImagesRatingSummaries;
};
