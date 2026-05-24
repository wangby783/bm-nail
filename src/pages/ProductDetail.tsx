import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Minus, Plus } from 'lucide-react';
import { useApi } from '../hooks/useApi';
import { useCart } from '../context/CartContext';
import { CATEGORIES, type Product } from '../types';

const CATEGORY_GRADIENTS: Record<string, string> = {
  'gel-polish': 'from-pink-400 to-rose-400',
  'nail-stickers': 'from-purple-400 to-pink-400',
  'nail-tools': 'from-rose-400 to-orange-400',
  'nail-accessory': 'from-amber-400 to-pink-400',
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { getProduct } = useApi();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (id) {
      getProduct(Number(id)).then(setProduct).catch(console.error);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">
        加载中...
      </div>
    );
  }

  const gradient = CATEGORY_GRADIENTS[product.category] || 'from-pink-400 to-rose-400';

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <Link to="/products" className="inline-flex items-center gap-1 text-gray-500 hover:text-pink-600 mb-8">
        <ArrowLeft className="w-4 h-4" /> 返回产品列表
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className={`h-80 md:h-96 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center`}>
          <span className="text-8xl opacity-30 select-none">💅</span>
        </div>

        {/* Product Info */}
        <div>
          <span className="text-sm text-pink-500 font-medium">
            {CATEGORIES[product.category]}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-pink-600 mb-6">¥{product.price}</p>
          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          {product.inStock ? (
            <>
              <div className="flex items-center gap-4 mb-8">
                <span className="text-gray-700 font-medium">数量</span>
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={() => {
                  addItem({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: qty,
                  });
                }}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-pink-500 text-white px-10 py-3 rounded-full font-medium hover:bg-pink-600 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" /> 加入购物车
              </button>
            </>
          ) : (
            <p className="text-gray-400 text-lg">该产品暂时缺货</p>
          )}
        </div>
      </div>
    </div>
  );
}
