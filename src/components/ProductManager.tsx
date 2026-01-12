import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ProductList } from './ProductList';
import { CategoryFilter } from './CategoryFilter';
import { SearchInput } from './SearchInput';
import { useProducts } from '../hooks/useProducts';
import { useSearch } from '../hooks/useSearch';
import { ProductCategory } from '../models/ProductCategory';
import type { ProductFilters } from '../models/Product';
import { readCategoryFromSearch, writeCategoryToUrl } from '../utils/category';

const Styled = {
  Layout: styled.div`
    display: flex;
    align-items: flex-start;
    gap: 32px;
    width: 100%;
    max-width: 90%;
    margin: 24px auto;
    @media (max-width: 640px) {
      flex-direction: column;
      gap: 16px;
      & > * {
        width: 100%;
        max-width: 100% !important;
      }
    }
  `,
  Sidebar: styled.div`
    display: flex;
    flex-direction: column;
    min-width: 260px;
    max-width: 320px;
    background: var(--color-bg-base);
    border: 1px solid var(--color-border-base);
    border-radius: 8px;
    padding: 24px 16px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
    gap: 16px;
    position: sticky;
    top: 24px;
    z-index: 100;
  `,
  Main: styled.div`
    flex: 1 1 0px;
    min-width: 0;
  `,
};

const Main = styled.div`
  flex: 1 1 0px;
  min-width: 0;
`;

export const ProductManager: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<ProductCategory | null>(() => {
      if (typeof window === 'undefined') return null;
      return readCategoryFromSearch(window.location.search);
    });

  // ![ categorias ]
  // ?: Escribimos el category en la url cuando cambia.
  useEffect(() => {
    writeCategoryToUrl(selectedCategory);
  }, [selectedCategory]);

  // ?: Sincronización de categoría con popstate
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onPopState = () => {
      setSelectedCategory(readCategoryFromSearch(window.location.search));
      // El hook useSearch maneja la sincronización de búsqueda con popstate
    };

    // ?: Escuchamos el evento popstate para actualizar el estado cuando el usuario navega con los botones del navegador.
    window.addEventListener('popstate', onPopState);

    // ?: Limpiamos el evento popstate cuando el componente se desmonta.
    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  // ![ búsqueda ]
  // ?: Hook de búsqueda
  const { searchInput, searchQuery, handleSearchChange, clearSearch } =
    useSearch();

  // ![ AMBOS ]
  // ?: Handlers que interactúan entre búsqueda y categoría
  const handleSearchChangeWithCategory = (value: string) => {
    handleSearchChange(value);
    if (value.trim()) {
      setSelectedCategory(null); // Limpiar categoría cuando hay búsqueda
    }
  };

  const handleCategoryChange = (category: ProductCategory | null) => {
    setSelectedCategory(category);
    if (category) {
      clearSearch(); // Limpiar búsqueda cuando hay categoría
    }
  };

  // ![ filtros combinados ]
  // ?: olo uno u otro, nunca ambos
  const filters: ProductFilters = useMemo(() => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      return { q: trimmedQuery };
    }
    return { category: selectedCategory ?? undefined };
  }, [selectedCategory, searchQuery]);

  const { products, loading, error } = useProducts(filters);

  return (
    <Styled.Layout>
      <Styled.Sidebar>
        <SearchInput
          value={searchInput}
          onChange={handleSearchChangeWithCategory}
        />
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </Styled.Sidebar>

      <Main>
        <ProductList productList={products} loading={loading} error={error} />
      </Main>
    </Styled.Layout>
  );
};
