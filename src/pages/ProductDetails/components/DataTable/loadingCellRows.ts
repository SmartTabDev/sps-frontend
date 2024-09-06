import { ContentCompassRow } from 'types/contentCompass/dataTable';

const LOADING_ROWS_COUNT = 5;

const getLoadingRows = () => {
  const data: ContentCompassRow[] = [];
  for (let i = 0; i < LOADING_ROWS_COUNT; i += 1) {
    data.push({
      retailer: 'name',
      brand: '',
      bulletpoints: undefined,
      bulletpointsPrev: undefined,
      contentScore: undefined,
      contentScorePrev: undefined,
      ean: 0,
      id: i,
      images: undefined,
      imagesPrev: undefined,
      keywords: undefined,
      keywordsPrev: undefined,
      packshotMatch: undefined,
      packshotMatchPrev: undefined,
      product: '',
      productListed: undefined,
      productListedPrev: undefined,
      richContent: undefined,
      richContentPrev: undefined,
      video: undefined,
      videoPrev: undefined,
      ratings: undefined,
      ratingsPrev: undefined,
      reviews: undefined,
      reviewsPrev: undefined,
    });
  }

  return data;
};

export const loadingDataTableRows: ContentCompassRow[] = getLoadingRows();
