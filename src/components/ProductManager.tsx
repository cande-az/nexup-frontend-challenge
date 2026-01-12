import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { ProductList } from './ProductList';
import { CategoryFilter } from './CategoryFilter';
import { useProducts } from '../hooks/useProducts';
import { ProductCategory } from '../models/ProductCategory';
import type { ProductFilters } from '../models/Product';
import { readCategoryFromSearch, writeCategoryToUrl } from '../utils/category';

const Layout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 32px;
  width: 100%;
  max-width: 90%;
  margin: 24px auto;
`;

const Sidebar = styled.div`
  min-width: 260px;
  max-width: 320px;
  background: var(--color-bg-base);
  border: 1px solid var(--color-border-base);
  border-radius: 8px;
  padding: 24px 16px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: sticky;
  top: 24px;
`;

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

  // ?: Creamos el filtro de productos cuando cambia la categoría.
  const filters: ProductFilters = useMemo(
    () => ({ category: selectedCategory ?? undefined }),
    [selectedCategory],
  );

  const { products, loading, error } = useProducts(filters);

  // ?: Escribimos el category en la url cuando cambia.
  useEffect(() => {
    writeCategoryToUrl(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onPopState = () => {
      setSelectedCategory(readCategoryFromSearch(window.location.search));
    };

    // ?: Escuchamos el evento popstate para actualizar el estado cuando el usuario navega con los botones del navegador.
    window.addEventListener('popstate', onPopState);

    // ?: Limpiamos el evento popstate cuando el componente se desmonta.
    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, []);

  return (
    <Layout>
      <Sidebar>
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </Sidebar>

      <Main>
        <ProductList productList={products} loading={loading} error={error} />
      </Main>
    </Layout>
  );
};
