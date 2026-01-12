import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';
import { Product, ProductFilters } from '../models/Product';
import { getProducts } from '../api/products';
import { toError } from '../utils/api';

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: Error | null;
  setFilters: (filters: ProductFilters) => void;
  refetch: () => void;
  filters: ProductFilters | undefined;
}

export function useProducts(
  initialFilters?: ProductFilters,
): UseProductsReturn {
  const [filters, setFilters] = useState<ProductFilters | undefined>(
    initialFilters,
  );

  // ?: Si cambia filters, cambia la key => SWR cachea aunque combinemos filtros.
  const key = useMemo(() => ['products', filters ?? null] as const, [filters]);

  const { data, error, isLoading, isValidating, mutate } = useSWR<
    Product[],
    Error
  >(
    key,
    async ([, currentFilters]: [unknown, Partial<ProductFilters> | null]) => {
      try {
        return await getProducts(
          (currentFilters ?? undefined) as ProductFilters | undefined,
        );
      } catch (e) {
        throw toError(e);
      }
    },
    {
      revalidateOnFocus: false,
      // ?: Evita "recargar" los datos cuando cambian los filtros.
      keepPreviousData: true,
    },
  );

  const refetch = useCallback(() => {
    mutate();
  }, [mutate]);

  return {
    products: data ?? [],
    loading: isLoading || isValidating,
    error: error ?? null,
    setFilters,
    refetch,
    filters,
  };
}
