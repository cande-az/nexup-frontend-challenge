import React from 'react';
import styled from 'styled-components';
import { ProductCategory } from '../models/ProductCategory';
import { buildUrlWithCategory } from '../utils/category';

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
  `,
  Title: styled.h5`
    font-size: 24px;
    font-weight: 600;
    letter-spacing: -0.025em;
    color: var(--color-text-base);
  `,
  List: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  ListItem: styled.li<{ $isActive?: boolean }>`
    list-style: none;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 4px;
    background-color: ${(props) =>
      props.$isActive ? 'var(--color-border-base)' : 'transparent'};
    font-weight: ${(props) => (props.$isActive ? '600' : '400')};
    transition: background-color 0.2s ease;
    &:hover {
      background-color: var(--color-border-base);
    }
  `,
};

interface CategoryFilterProps {
  // eslint-disable-next-line react/require-default-props
  selectedCategory?: ProductCategory | null;
  onCategoryChange: (category: ProductCategory | null) => void;
}

const ALL_CATEGORIES = [
  { label: 'All', value: null },
  { label: 'Fruit', value: ProductCategory.Fruit },
  { label: 'Vegetables', value: ProductCategory.Vegetables },
  { label: 'Meat', value: ProductCategory.Meat },
] as const;

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory = null,
  onCategoryChange,
}) => {
  const handleCategoryClick = (category: ProductCategory | null) => {
    const newUrl = buildUrlWithCategory(category);
    window.history.pushState({}, '', newUrl);
    onCategoryChange(category);
  };

  return (
    <Styled.Container>
      <Styled.Title>Categories</Styled.Title>
      <Styled.List>
        {ALL_CATEGORIES.map((item) => (
          <Styled.ListItem
            key={item.label}
            $isActive={selectedCategory === item.value}
            onClick={() => handleCategoryClick(item.value)}
          >
            {item.label}
          </Styled.ListItem>
        ))}
      </Styled.List>
    </Styled.Container>
  );
};
