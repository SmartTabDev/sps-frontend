import { useQuery } from '@tanstack/react-query';
import { ApiResponse, fetchAppServerApiData } from 'api/fetchData';

interface UseProductImageStatQueryProps {
  productId: string;
  date: string;
}

export interface Retailer {
  name: string;
  total_images: number;
  packshot: string;
  packshot_match: number;
  other_images: string[];
  video_match: number;
}

interface ProductImageStat {
  refs: string[];
  retailers: Retailer[];
}

type ProductImageStatApiResponse = ApiResponse<ProductImageStat>;

export const useProductImageStatQuery = ({
  productId,
  date,
}: UseProductImageStatQueryProps) => {
  return useQuery({
    queryKey: ['productImageStat', productId, date],
    queryFn: () =>
      fetchAppServerApiData<ProductImageStatApiResponse>(
        `/compass/${productId}/imagestats?date=${date}`
      ),
  });
};
