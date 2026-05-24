import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccess() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-gray-900 mb-4">下单成功！</h1>
      <p className="text-gray-500 mb-8">
        感谢您的购买，我们会尽快处理您的订单。如有疑问请随时联系我们。
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/products"
          className="bg-pink-500 text-white px-8 py-3 rounded-full font-medium hover:bg-pink-600 transition-colors"
        >
          继续购物
        </Link>
        <Link
          to="/"
          className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
