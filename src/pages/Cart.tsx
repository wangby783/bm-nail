import { Link } from 'react-router-dom';
import { Trash2, ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeItem, updateQty, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">购物车是空的</h1>
        <p className="text-gray-500 mb-8">还没有添加任何商品，去挑选喜欢的美甲产品吧</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-pink-500 text-white px-8 py-3 rounded-full font-medium hover:bg-pink-600 transition-colors"
        >
          去逛逛
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">购物车</h1>
        <button
          onClick={clearCart}
          className="text-sm text-gray-400 hover:text-red-500 transition-colors"
        >
          清空购物车
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center gap-4 p-6 border-b border-gray-100 last:border-0"
          >
            <Link to={`/products/${item.productId}`} className="flex-1">
              <h3 className="font-medium text-gray-900 hover:text-pink-600 transition-colors">
                {item.name}
              </h3>
            </Link>
            <span className="text-pink-600 font-medium w-20 text-right">¥{item.price}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQty(item.productId, item.quantity - 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center text-sm">{item.quantity}</span>
              <button
                onClick={() => updateQty(item.productId, item.quantity + 1)}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <span className="font-bold text-gray-900 w-24 text-right">
              ¥{(item.price * item.quantity).toFixed(2)}
            </span>
            <button
              onClick={() => removeItem(item.productId)}
              className="text-gray-300 hover:text-red-500 transition-colors ml-4"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-1 text-gray-500 hover:text-pink-600"
        >
          <ArrowLeft className="w-4 h-4" /> 继续选购
        </Link>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-sm text-gray-500">合计 </span>
            <span className="text-2xl font-bold text-pink-600">¥{totalPrice.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            className="bg-pink-500 text-white px-8 py-3 rounded-full font-medium hover:bg-pink-600 transition-colors"
          >
            去结算
          </Link>
        </div>
      </div>
    </div>
  );
}
