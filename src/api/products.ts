import axios from 'axios';
import { Product, ProductFilters } from '../models/Product';
import { buildQueryString } from '../utils/api';

// TODO: En un entorno de producción, se debería usar una URL de API real y guardarla en una variable de entorno.
const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getProducts = async (
  filters?: ProductFilters,
): Promise<Product[]> => {
  try {
    const queryString = buildQueryString<ProductFilters>(filters);
    const response = await apiClient.get<Product[]>(`/products${queryString}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
