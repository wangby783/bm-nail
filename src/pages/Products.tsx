import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/Product/ProductCard';
import ProductGrid from '../components/Product/ProductGrid';
import { useApi } from '../hooks/useApi';
import { type Product, type CategoryKey } from '../types';

const categoryList: { key: CategoryKey | ''; label: string }[] = [
  { key: '', label: '全部' },
  { key: 'gel-polish', label: '甲油胶' },
  { key: 'nail-stickers', label: '美甲贴纸' },
  { key: 'nail-tools', label: '美甲工具' },
  { key: 'nail-accessory', label: '美甲饰品' },
];

export default function Products() {
  const { getProducts } = useApi();
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = activeCategory ? `category=${activeCategory}` : '';
    getProducts(params)
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">全部产品</h1>

      {/* Category Filter */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categoryList.map((cat) => (
          <button
            key={cat.key}
            onClick={() => {
              const url = new URL(window.location.href);
              if (cat.key) url.searchParams.set('category', cat.key);
              else url.searchParams.delete('category');
              window.history.pushState({}, '', url);
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat.key
                ? 'bg-pink-500 text-white'
                : 'bg-white text-gray-600 hover:bg-pink-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">加载中...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-gray-400">暂无产品</div>
      ) : (
        <ProductGrid>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </ProductGrid>
      )}
    </div>
  );
}
