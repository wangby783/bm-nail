import type { Product, Order } from '../types';
import { productStore, orderStore } from '../data/store';

function delay<T>(data: T, ms = 100): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

export function useApi() {
  return {
    getProducts: (params?: string) => delay(productStore.getAll(params)),
    getProduct: (id: number) => delay(productStore.getById(id) as Product),
    createProduct: (data: Omit<Product, 'id'>) => delay(productStore.create(data)),
    updateProduct: (id: number, data: Partial<Product>) =>
      delay(productStore.update(id, data) as Product),
    deleteProduct: (id: number) => delay(productStore.delete(id)),

    getOrders: () => delay(orderStore.sortByDate(orderStore.getAll())),
    getOrder: (id: number) => delay(orderStore.getById(id) as Order),
    createOrder: (data: Omit<Order, 'id'>) => delay(orderStore.create(data)),
    updateOrder: (id: number, data: Partial<Order>) =>
      delay(orderStore.update(id, data) as Order),
  };
}
