import { useQuery } from '@tanstack/react-query';
import { ApiResponse, fetchAppServerApiData } from 'api/fetchData';

interface UseProductDescriptionQueryProps {
  productId: string;
  date: string;
}

export interface ProductDescription {
  brand: string;
  ean: string;
  last_updated: string;
  max_price: number;
  min_price: number;
  name: string;
  rating: number;
  total_ratings: number;
  image: string;
}

type ProductDescriptionApiResponse = ApiResponse<ProductDescription>;

export const useProductDescriptionQuery = ({
  productId,
  date,
}: UseProductDescriptionQueryProps) => {
  return useQuery({
    queryKey: ['productDescription', productId, date],
    queryFn: () =>
      fetchAppServerApiData<ProductDescriptionApiResponse>(
        `/compass/${productId}/description?date=${date}`
      ),
  });
};
