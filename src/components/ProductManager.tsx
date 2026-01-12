import React from 'react';
import styled from 'styled-components';
import { ProductList } from './ProductList';
import { CategoryFilter } from './CategoryFilter';
import { useProducts } from '../hooks/useProducts';

const Styled = {
  Layout: styled.div`
    display: flex;
    align-items: flex-start;
    gap: 32px;
    width: 100%;
    max-width: 90%;
    margin: 24px auto;
  `,
  Sidebar: styled.div`
    min-width: 260px;
    max-width: 320px;
    background: #fafbfc;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    padding: 24px 16px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: sticky;
    top: 24px;
  `,
  Main: styled.div`
    flex: 1 1 0px;
    min-width: 0;
  `,
};

export const ProductManager: React.FC = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>Error al cargar productos: {error.message}</div>;
  }

  return (
    <Styled.Layout>
      <Styled.Sidebar>
        <CategoryFilter />
      </Styled.Sidebar>
      <Styled.Main>
        <ProductList productList={products} />
      </Styled.Main>
    </Styled.Layout>
  );
};
