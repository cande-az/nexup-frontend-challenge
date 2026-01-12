import React from 'react';
import styled from 'styled-components';

const Styled = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  Label: styled.label`
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-base);
  `,
  InputWrapper: styled.div`
    position: relative;
    display: flex;
    align-items: center;
  `,
  Input: styled.input`
    width: 100%;
    padding: 12px 16px;
    padding-right: ${(props) => (props.value ? '40px' : '16px')};
    border: 1px solid var(--color-border-base);
    border-radius: 8px;
    font-size: 16px;
    color: var(--color-text-base);
    background-color: white;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
    }

    &::placeholder {
      color: var(--color-text-muted);
    }
  `,
  ClearButton: styled.button`
    position: absolute;
    right: 8px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-text-base);
    }

    &:focus {
      outline: none;
    }
  `,
};

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Buscar productos...',
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <Styled.Container>
      <Styled.Label htmlFor="search-input">Buscar</Styled.Label>
      <Styled.InputWrapper>
        <Styled.Input
          id="search-input"
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
        {value && (
          <Styled.ClearButton
            type="button"
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </Styled.ClearButton>
        )}
      </Styled.InputWrapper>
    </Styled.Container>
  );
};
