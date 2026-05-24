import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CATEGORIES, type Product } from '../../types';

const CATEGORY_GRADIENTS: Record<string, string> = {
  'gel-polish': 'from-pink-400 to-rose-400',
  'nail-stickers': 'from-purple-400 to-pink-400',
  'nail-tools': 'from-rose-400 to-orange-400',
  'nail-accessory': 'from-amber-400 to-pink-400',
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const gradient = CATEGORY_GRADIENTS[product.category] || 'from-pink-400 to-rose-400';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group">
      <Link to={`/products/${product.id}`}>
        <div
          className={`h-48 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}
        >
          <span className="text-5xl opacity-30 select-none">💅</span>
          {!product.inStock && (
            <span className="absolute top-3 right-3 bg-gray-900/70 text-white text-xs px-2 py-1 rounded-full">
              暂时缺货
            </span>
          )}
          {product.featured && (
            <span className="absolute top-3 left-3 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
              精选
            </span>
          )}
        </div>
      </Link>
      <div className="p-4">
        <span className="text-xs text-pink-500 font-medium">
          {CATEGORIES[product.category]}
        </span>
        <Link to={`/products/${product.id}`}>
          <h3 className="text-gray-900 font-medium mt-1 mb-1 line-clamp-1 group-hover:text-pink-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-pink-600">¥{product.price}</span>
          <button
            disabled={!product.inStock}
            onClick={() =>
              addItem({
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
              })
            }
            className="flex items-center gap-1 bg-pink-500 text-white px-3 py-1.5 rounded-full text-sm hover:bg-pink-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            加购
          </button>
        </div>
      </div>
    </div>
  );
}
