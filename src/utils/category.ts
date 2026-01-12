import { ProductCategory } from '../models/ProductCategory';
import { buildQueryString } from './api';

const CATEGORY_SET = new Set<string>(Object.values(ProductCategory));

/**
 * Lee la categoría desde los parámetros de búsqueda de la URL.
 * @param search - String de búsqueda de la URL (ej: "?category=Fruit")
 * @returns La categoría encontrada o null si no existe o no es válida
 */
export function readCategoryFromSearch(search: string): ProductCategory | null {
  const params = new URLSearchParams(search);
  const raw = params.get('category');
  if (!raw) return null;
  return CATEGORY_SET.has(raw) ? (raw as ProductCategory) : null;
}

/**
 * Construye una URL con la categoría especificada, preservando otros parámetros existentes.
 * @param category - Categoría a establecer o null para eliminar
 * @returns URL completa con los parámetros actualizados
 */
export function buildUrlWithCategory(category: ProductCategory | null): string {
  const currentParams = new URLSearchParams(window.location.search);
  const updatedParams: Record<string, string> = {};

  // Nos quedamos todos los parametros excepto category
  currentParams.forEach((value, key) => {
    if (key !== 'category') {
      updatedParams[key] = value;
    }
  });

  // Solo seteamos category si tiene valor
  if (category) {
    updatedParams.category = category;
  }

  const queryString = buildQueryString(updatedParams);
  const basePath = window.location.pathname;

  return `${basePath}${queryString}`;
}

/**
 * Actualiza la URL del navegador con la categoría especificada.
 * @param category - Categoría a establecer o null para eliminar
 */
export function writeCategoryToUrl(category: ProductCategory | null): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  if (category) {
    url.searchParams.set('category', category);
  } else {
    url.searchParams.delete('category');
  }

  const next = url.toString();
  if (next !== window.location.href) {
    window.history.pushState({}, '', next);
  }
}
