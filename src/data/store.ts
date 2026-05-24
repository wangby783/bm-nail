import type { Product, Order } from '../types';
import { DEFAULT_PRODUCTS } from './defaultProducts';

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}
export const productStore = {
  getAll(params?: string): Product[] {
    let products = load<Product[]>('bm-products', DEFAULT_PRODUCTS);
    if (!params) return products;

    const search = new URLSearchParams(params);

    if (search.get('featured') === 'true') {
      products = products.filter((p) => p.featured);
    }
    if (search.get('category')) {
      products = products.filter((p) => p.category === search.get('category'));
    }
    const limit = search.get('_limit');
    if (limit) {
      products = products.slice(0, Number(limit));
    }
    return products;
  },

  getById(id: number): Product | undefined {
    return this.getAll().find((p) => p.id === id);
  },

  create(data: Omit<Product, 'id'>): Product {
    const products = this.getAll();
    const maxId = products.reduce((m, p) => Math.max(m, p.id), 0);
    const product: Product = { ...data, id: maxId + 1 };
    save('bm-products', [...products, product]);
    return product;
  },

  update(id: number, data: Partial<Product>): Product | undefined {
    const products = this.getAll();
    const idx = products.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    products[idx] = { ...products[idx], ...data };
    save('bm-products', products);
    return products[idx];
  },

  delete(id: number): void {
    const products = this.getAll().filter((p) => p.id !== id);
    save('bm-products', products);
  },
};

export const orderStore = {
  getAll(): Order[] {
    return load<Order[]>('bm-orders', []);
  },

  getById(id: number): Order | undefined {
    return this.getAll().find((o) => o.id === id);
  },

  create(data: Omit<Order, 'id'>): Order {
    const orders = this.getAll();
    const maxId = orders.reduce((m, o) => Math.max(m, o.id), 0);
    const order: Order = { ...data, id: maxId + 1 };
    save('bm-orders', [...orders, order]);
    return order;
  },

  update(id: number, data: Partial<Order>): Order | undefined {
    const orders = this.getAll();
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) return undefined;
    orders[idx] = { ...orders[idx], ...data };
    save('bm-orders', orders);
    return orders[idx];
  },

  sortByDate(orders: Order[]): Order[] {
    return [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
};
