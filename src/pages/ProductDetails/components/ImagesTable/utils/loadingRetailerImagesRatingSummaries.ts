import { RetailerImagesRatingSummary } from '../types';

const LOADING_SKELETON_ROWS_COUNT = 5;

const fillData = () => {
  const data: RetailerImagesRatingSummary[] = [];
  for (let i = 0; i < LOADING_SKELETON_ROWS_COUNT; i += 1) {
    data.push({
      index: i,
      retailer: '',
      otherImagesUrls: [],
      packshotMatch: false,
      packshotUrl: '',
      totalImages: 0,
      videoMatch: false,
      videoUrl: undefined,
    });
  }
  return data;
};

export const loadingRetailerImagesRatingSummaries = fillData();
