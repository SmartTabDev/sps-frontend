import { useQuery } from '@tanstack/react-query';
import { ApiResponse, fetchAppServerApiData } from 'api/fetchData';

interface UseProductStatQueryProps {
  productId: string;
  date: string;
}

interface Stat {
  content_score: number[] | undefined;
  product_listed: number[] | undefined;
  rich_content: number[] | undefined;
  packshot_match: number[] | undefined;
  bulletpoints: number[] | undefined;
  keywords: number[] | undefined;
  images: number[] | undefined;
  ratings: number[] | undefined;
  reviews: number[] | undefined;
  video: number[] | undefined;
}

interface Retailer {
  name: string;
  product: Stat;
}

export interface ProductStat {
  retailers: Retailer[];
}

type ProductStatApiResponse = ApiResponse<ProductStat>;

export const useProductStatQuery = ({
  productId,
  date,
}: UseProductStatQueryProps) => {
  return useQuery({
    queryKey: ['productStat', productId, date],
    queryFn: () =>
      fetchAppServerApiData<ProductStatApiResponse>(
        `/compass/${productId}/productstats?date=${date}`
      ),
  });
};
