import React from 'react';
import styled from 'styled-components';
import { Product } from '../models/Product';
import { ProductCategory } from '../models/ProductCategory';
import { ProductStatus } from '../models/ProductStatus';

interface ProductItemProps {
  product: Product;
}

// Mapear colores según la categoría
const getCategoryColors = (category: ProductCategory) => {
  const colorMap: Record<ProductCategory, { bg: string; text: string }> = {
    [ProductCategory.Fruit]: {
      bg: '#f7fee7', // lime-50
      text: '#84cc16', // lime-500
    },
    [ProductCategory.Vegetables]: {
      bg: '#f0fdf4', // green-50
      text: '#16a34a', // green-600 (verde oscuro)
    },
    [ProductCategory.Meat]: {
      bg: '#fff7ed', // orange-50
      text: '#fb923c', // orange-400
    },
  };

  return colorMap[category];
};

const Styled = {
  Container: styled.div<{ bgColor: string; isInactive: boolean }>`
    background-color: ${(props) => props.bgColor};
    display: block;
    max-width: 384px;
    padding: 24px;
    border: 1px solid var(--color-border-base);
    border-radius: 8px;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition: background-color 0.2s ease;
    position: relative;
    opacity: ${(props) => (props.isInactive ? 0.6 : 1)};
  `,
  Title: styled.h5<{ isInactive: boolean }>`
    margin-bottom: 12px;
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.025em;
    color: ${(props) =>
      props.isInactive ? '#9ca3af' : 'var(--color-text-base)'};
    line-height: 32px;
  `,
  Category: styled.p<{ textColor: string; isInactive: boolean }>`
    color: ${(props) => (props.isInactive ? '#9ca3af' : props.textColor)};
    font-weight: 600;
    margin-bottom: 8px;
  `,
  Text: styled.p<{ isInactive: boolean }>`
    color: ${(props) =>
      props.isInactive ? '#9ca3af' : 'var(--color-text-muted)'};
  `,
  InactiveBadge: styled.span`
    position: absolute;
    top: 12px;
    right: 12px;
    background-color: #6b7280; // gray-500
    color: white;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  `,
};

export const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const formattedPrice = `$${product.price.toFixed(2)}`;
  const isInactive = product.status === ProductStatus.Inactive;

  // Si está inactivo, usar colores grises
  const colors = isInactive
    ? { bg: '#f9fafb', text: '#9ca3af' } // gray-50 y gray-400 (gris claro y gris oscuro tailwind)
    : getCategoryColors(product.category);

  return (
    <Styled.Container bgColor={colors.bg} isInactive={isInactive}>
      {isInactive && <Styled.InactiveBadge>Inactive</Styled.InactiveBadge>}
      <Styled.Title isInactive={isInactive}>{product.name}</Styled.Title>
      <Styled.Category textColor={colors.text} isInactive={isInactive}>
        {product.category}
      </Styled.Category>
      <Styled.Text isInactive={isInactive}>{formattedPrice}</Styled.Text>
    </Styled.Container>
  );
};
