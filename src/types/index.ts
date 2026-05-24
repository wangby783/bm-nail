export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: CategoryKey;
  featured: boolean;
  inStock: boolean;
  createdAt: string;
}

export type CategoryKey = 'gel-polish' | 'nail-stickers' | 'nail-tools' | 'nail-accessory';

export const CATEGORIES: Record<CategoryKey, string> = {
  'gel-polish': '甲油胶',
  'nail-stickers': '美甲贴纸',
  'nail-tools': '美甲工具',
  'nail-accessory': '美甲饰品',
};

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Customer {
  name: string;
  phone: string;
  address: string;
  note?: string;
}

export interface Order {
  id: number;
  items: CartItem[];
  customer: Customer;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'completed' | 'cancelled';
  createdAt: string;
}

export const ORDER_STATUS: Record<Order['status'], string> = {
  pending: '待确认',
  confirmed: '已确认',
  shipped: '已发货',
  completed: '已完成',
  cancelled: '已取消',
};
