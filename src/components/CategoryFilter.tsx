import React from 'react';
import styled from 'styled-components';

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
    color: #1a1a1a;
  `,
  List: styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  ListItem: styled.li`
    list-style: none;
    cursor: pointer;
    &:hover {
      background-color: #e5e5e5;
    }
  `,
};

interface CategoryFilterProps {}

export const CategoryFilter: React.FC<CategoryFilterProps> = () => {
  return (
    <Styled.Container>
      <Styled.Title>Categoría</Styled.Title>
      <Styled.List>
        <Styled.ListItem>Todos</Styled.ListItem>
        <Styled.ListItem>Fruit</Styled.ListItem>
        <Styled.ListItem>Vegetables</Styled.ListItem>
        <Styled.ListItem>Meat</Styled.ListItem>
      </Styled.List>
    </Styled.Container>
  );
};
