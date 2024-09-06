/* eslint-disable camelcase */
import { ProductStat } from 'api/hooks/useProductStatQuery';
import { ContentCompassRow } from 'types/contentCompass/dataTable';

export const convertProductStatToContentCompassRows = ({
  retailers,
}: ProductStat): ContentCompassRow[] => {
  const contentCompassRows: ContentCompassRow[] = retailers.map(
    ({ name, product }, index) => {
      const {
        bulletpoints,
        content_score,
        images,
        keywords,
        packshot_match,
        product_listed,
        rich_content,
        video,
        ratings,
        reviews,
      } = product;
      return {
        retailer: name,
        brand: '',
        bulletpoints: bulletpoints?.[0],
        bulletpointsPrev: bulletpoints?.[1],
        contentScore: content_score?.[0],
        contentScorePrev: content_score?.[1],
        ean: 0,
        id: index,
        images: images?.[0],
        imagesPrev: images?.[1],
        keywords: keywords?.[0],
        keywordsPrev: keywords?.[1],
        packshotMatch: packshot_match?.[0],
        packshotMatchPrev: packshot_match?.[1],
        product: '',
        productListed: product_listed?.[0],
        productListedPrev: product_listed?.[1],
        richContent: rich_content?.[0],
        richContentPrev: rich_content?.[1],
        video: video?.[0],
        videoPrev: video?.[1],
        ratings: ratings?.[0],
        ratingsPrev: ratings?.[1],
        reviews: reviews?.[0],
        reviewsPrev: reviews?.[1],
      };
    }
  );

  return contentCompassRows;
};
