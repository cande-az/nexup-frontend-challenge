import { ProductCategory } from '../models/ProductCategory';
import { readUrlParam, writeUrlParam } from './url';

const CATEGORY_SET = new Set<string>(Object.values(ProductCategory));

/**
 * Lee la categoría desde los parámetros de búsqueda de la URL.
 * Valida que la categoría sea válida según CATEGORY_SET.
 * @param search - String de búsqueda de la URL (ej: "?category=Fruit")
 * @returns La categoría encontrada o null si no existe o no es válida
 */
export function readCategoryFromSearch(search: string): ProductCategory | null {
  const raw = readUrlParam(search, 'category');
  if (!raw) return null;
  return CATEGORY_SET.has(raw) ? (raw as ProductCategory) : null;
}

/**
 * Actualiza la URL del navegador con la categoría especificada.
 * Valida que la categoría sea válida antes de escribirla.
 * @param category - Categoría a establecer o null para eliminar
 */
export function writeCategoryToUrl(category: ProductCategory | null): void {
  writeUrlParam('category', category);
}
