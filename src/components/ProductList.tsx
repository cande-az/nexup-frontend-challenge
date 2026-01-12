import React from 'react';
import styled from 'styled-components';
import { Product } from '../models/Product';
import { ProductItem } from './ProductItem';

interface ProductListProps {
  productList: Product[];
}

const Styled = {
  Container: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
  `,
};
export const ProductList: React.FC<ProductListProps> = ({ productList }) => {
  return (
    <Styled.Container>
      {productList.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Styled.Container>
  );
};
