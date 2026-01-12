import React from 'react';
import { styled } from 'styled-components';
import { ProductManager } from './components/ProductManager';

const Styled = {
  Nav: styled.nav`
    background: var(--color-primary);
    color: #fff;
    padding: 1rem 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  `,
  Title: styled.h1`
    margin: 0;
    font-size: 1.6rem;
    letter-spacing: 1;
  `,
  Container: styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
  `,
};

const App: React.FC = () => {
  return (
    <Styled.Container>
      <Styled.Nav>
        <Styled.Title>Nexup Frontend Challenge</Styled.Title>
      </Styled.Nav>
      <ProductManager />
    </Styled.Container>
  );
};

export default App;
