import React from 'react';
import styled from 'styled-components';
import { Product } from '../models/Product';
import { ProductItem } from './ProductItem';

interface ProductListProps {
  productList: Product[];
  loading?: boolean;
  error?: Error | null;
}

const Styled = {
  Container: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
  `,
  Loading: styled.div`
    padding: 24px;
    text-align: center;
    font-size: 16px;
    color: var(--color-text-muted);
  `,
  Error: styled.div`
    padding: 24px;
    text-align: center;
    font-size: 16px;
    color: var(--color-text-muted);
    background-color: var(--color-bg-base);
    border-radius: 8px;
    border: 1px solid var(--color-border-base);
  `,
};

export const ProductList: React.FC<ProductListProps> = ({
  productList,
  loading = false,
  error = null,
}) => {
  if (loading) {
    return <Styled.Loading>Loading products...</Styled.Loading>;
  }

  if (error) {
    return <Styled.Error>No products found for this category</Styled.Error>;
  }

  return (
    <Styled.Container>
      {productList.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Styled.Container>
  );
};
