import { ProductStatus } from './ProductStatus';
import { ProductCategory } from './ProductCategory';

export interface Product {
  // ?: Me tome la libertad de modificar el tipo de dato del id a string para simular datos mas realistas (y no pelearme con react😅).
  id: string;
  name: string;
  status: ProductStatus;
  category: ProductCategory;
  price: number;
}

export interface ProductFilters extends Record<string, unknown> {
  category?: ProductCategory;
  status?: ProductStatus;
  q?: string; // Búsqueda fulltext
}
