import { useQuery } from '@tanstack/react-query';
import { ApiResponse, fetchAppServerApiData } from 'api/fetchData';

interface UseProductKeywordsQueryProps {
  productId: string;
  date: string;
}

interface ProductKeywords {
  name: string;
  keywords: string;
}

type ProductKeywordsApiResponse = ApiResponse<ProductKeywords>;

export const useProductKeywordsQuery = ({
  productId,
  date,
}: UseProductKeywordsQueryProps) => {
  return useQuery({
    queryKey: ['productKeywords', productId, date],
    queryFn: () =>
      fetchAppServerApiData<ProductKeywordsApiResponse>(
        `/compass/${productId}/keywords?date=${date}`
      ),
  });
};
