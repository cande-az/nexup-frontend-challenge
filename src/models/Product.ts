import { ProductStatus } from './ProductStatus';
import { ProductCategory } from './ProductCategory';

export interface Product {
  // ?: Me tome la libertad de modificar el tipo de dato del id a string para simular datos mas realista.
  id: string;
  name: string;
  status: ProductStatus;
  category: ProductCategory;
  price: number;
}
