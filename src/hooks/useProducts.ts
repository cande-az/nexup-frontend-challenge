import useSWR from 'swr';
import type { Product, ProductFilters } from '../models/Product';
import { getProducts } from '../api/products';
import { toError } from '../utils/api';

export interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

type ProductsKey = readonly ['products', ProductFilters | null];

export function useProducts(filters?: ProductFilters): UseProductsReturn {
  const key: ProductsKey = ['products', filters ?? null];

  const { data, error, isLoading, isValidating, mutate } = useSWR<
    Product[],
    Error
  >(
    key,
    async ([, currentFilters]) => {
      try {
        return await getProducts(currentFilters as ProductFilters | undefined);
      } catch (e) {
        throw toError(e);
      }
    },
    {
      revalidateOnFocus: false,
      keepPreviousData: true,
    },
  );

  return {
    products: data ?? [],
    loading: isLoading || isValidating,
    error: error ?? null,
    refetch: () => mutate(),
  };
}
