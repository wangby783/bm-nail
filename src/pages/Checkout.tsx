import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useApi } from '../hooks/useApi';
import type { Customer } from '../types';

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { createOrder } = useApi();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    phone: '',
    address: '',
    note: '',
  });

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg mb-4">购物车为空，请先添加商品</p>
        <button onClick={() => navigate('/products')} className="text-pink-600 hover:text-pink-700">
          去选购
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customer.name || !customer.phone || !customer.address) return;
    setSubmitting(true);
    try {
      await createOrder({
        items,
        customer,
        totalAmount: totalPrice,
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
      clearCart();
      navigate('/order-success');
    } catch (err) {
      console.error(err);
      alert('提交失败，请重试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/cart')}
        className="inline-flex items-center gap-1 text-gray-500 hover:text-pink-600 mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> 返回购物车
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">确认订单</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Customer Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 space-y-5">
          <h2 className="text-lg font-bold text-gray-900 mb-2">收货信息</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">收件人 *</label>
            <input
              required
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="请输入姓名"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">手机号 *</label>
            <input
              required
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="请输入手机号"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">收货地址 *</label>
            <input
              required
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              placeholder="请输入详细地址"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
            <textarea
              value={customer.note}
              onChange={(e) => setCustomer({ ...customer, note: e.target.value })}
              rows={3}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
              placeholder="如有特殊要求请注明（选填）"
            />
          </div>
        </form>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
          <h2 className="text-lg font-bold text-gray-900 mb-4">订单明细</h2>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-gray-600 truncate flex-1 mr-2">
                  {item.name} x{item.quantity}
                </span>
                <span className="text-gray-900 font-medium">
                  ¥{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between items-center">
            <span className="text-gray-900 font-bold">合计</span>
            <span className="text-2xl font-bold text-pink-600">¥{totalPrice.toFixed(2)}</span>
          </div>
          <button
            type="submit"
            disabled={submitting}
            onClick={handleSubmit}
            className="w-full mt-6 bg-pink-500 text-white py-3 rounded-full font-medium hover:bg-pink-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {submitting ? '提交中...' : '提交订单'}
          </button>
        </div>
      </div>
    </div>
  );
}
