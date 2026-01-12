import React from 'react';
import styled from 'styled-components';
import { Product } from '../models/Product';

interface ProductItemProps {
  product: Product;
}

const Styled = {
  Container: styled.div`
    background-color: #f5f5f5;
    display: block;
    max-width: 384px;
    padding: 24px;
    border: 1px solid #e5e5e5;
    border-radius: 8px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    cursor: pointer;

    &:hover {
      background-color: #e5e5e5;
    }
  `,
  Title: styled.h5`
    margin-bottom: 12px;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.025em;
    color: #1a1a1a;
    line-height: 32px;
  `,
  Text: styled.p`
    color: #4a4a4a;
  `,
};

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const formattedPrice = `$${product.price.toFixed(2)}`;

  return (
    <Styled.Container>
      <Styled.Title>{product.name}</Styled.Title>
      <Styled.Text>{product.category}</Styled.Text>
      <Styled.Text>{formattedPrice}</Styled.Text>
    </Styled.Container>
  );
};
