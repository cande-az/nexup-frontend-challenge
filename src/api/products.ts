import axios from 'axios';
import { Product } from '../models/Product';

// TODO: En un entorno de producción, se debería usar una URL de API real y guardarla en una variable de entorno.
const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
});

export const getProductList = async (): Promise<Product[]> => {
  try {
    const response = await apiClient.get<Product[]>('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
