import { GridAggregationFunction } from '@mui/x-data-grid-premium';
import {
  ContentCompassRowPrevValues,
  ContentCompassRowCurrentValues,
} from 'types/contentCompass/dataTable';

const createAggregationFunction = ({
  prevKey,
  currentKey,
}: {
  prevKey: keyof ContentCompassRowPrevValues;
  currentKey: keyof ContentCompassRowCurrentValues;
}): GridAggregationFunction<{
  prev: number;
  current: number;
}> => {
  return {
    label: '',
    getCellValue: ({ row }) => ({
      prev: row[prevKey],
      current: row[currentKey],
    }),
    apply: ({ values }) => {
      let prev = 0;
      let current = 0;

      values.forEach((value) => {
        if (value) {
          prev += value.prev ? 1 : 0;
          current += value.current ? 1 : 0;
        }
      });

      return {
        prev,
        current,
      };
    },
    valueFormatter: (params) => {
      return {
        prev: params.value.prev,
        current: params.value.current,
      };
    },
  };
};

const contentScore = createAggregationFunction({
  prevKey: 'contentScorePrev',
  currentKey: 'contentScore',
});

const productListed = createAggregationFunction({
  prevKey: 'productListedPrev',
  currentKey: 'productListed',
});

const richContent = createAggregationFunction({
  prevKey: 'richContentPrev',
  currentKey: 'richContent',
});

const packshotMatch = createAggregationFunction({
  prevKey: 'packshotMatchPrev',
  currentKey: 'packshotMatch',
});

const bulletpoints = createAggregationFunction({
  prevKey: 'bulletpointsPrev',
  currentKey: 'bulletpoints',
});

const keywords = createAggregationFunction({
  prevKey: 'keywordsPrev',
  currentKey: 'keywords',
});

const images = createAggregationFunction({
  prevKey: 'imagesPrev',
  currentKey: 'images',
});

const video = createAggregationFunction({
  prevKey: 'videoPrev',
  currentKey: 'video',
});

const ratings = createAggregationFunction({
  prevKey: 'ratingsPrev',
  currentKey: 'ratings',
});

const reviews = createAggregationFunction({
  prevKey: 'reviewsPrev',
  currentKey: 'reviews',
});

export {
  bulletpoints,
  contentScore,
  images,
  keywords,
  packshotMatch,
  productListed,
  ratings,
  reviews,
  richContent,
  video,
};
