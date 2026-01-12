import { useEffect, useState } from 'react';
import { readUrlParam, writeUrlParam } from '../utils/url';

const DEBOUNCE_DELAY = 300; // ms

export interface UseSearchReturn {
  searchInput: string;
  searchQuery: string;
  handleSearchChange: (value: string) => void;
  clearSearch: () => void;
}

export function useSearch(): UseSearchReturn {
  const [searchInput, setSearchInput] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    return readUrlParam(window.location.search, 'q') || '';
  });

  const [searchQuery, setSearchQuery] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    return readUrlParam(window.location.search, 'q') || '';
  });

  // ?: Debounce del searchInput
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(searchInput);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // ?: Escribimos el query de búsqueda en la url cuando cambia.
  useEffect(() => {
    writeUrlParam('q', searchQuery.trim());
  }, [searchQuery]);

  // ?: Sincronizar con popstate (navegación del navegador)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onPopState = () => {
      const urlQuery = readUrlParam(window.location.search, 'q') || '';
      setSearchInput(urlQuery);
      setSearchQuery(urlQuery);
    };

    window.addEventListener('popstate', onPopState);

    // ?: Limpiar evento popstate porque el componente se desmonta.
    // eslint-disable-next-line consistent-return
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
  };

  const clearSearch = () => {
    setSearchInput('');
    setSearchQuery('');
  };

  return {
    searchInput,
    searchQuery,
    handleSearchChange,
    clearSearch,
  };
}
