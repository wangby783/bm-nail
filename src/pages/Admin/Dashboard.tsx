import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import type { Product, Order } from '../../types';
import { Package, ShoppingBag, DollarSign, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const { getProducts, getOrders } = useApi();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
    getOrders().then(setOrders).catch(console.error);
  }, []);

  const totalRevenue = orders
    .filter((o) => o.status !== 'cancelled')
    .reduce((s, o) => s + o.totalAmount, 0);

  const stats = [
    { icon: Package, label: '产品总数', value: products.length, color: 'text-blue-500', bg: 'bg-blue-100' },
    { icon: ShoppingBag, label: '订单总数', value: orders.length, color: 'text-green-500', bg: 'bg-green-100' },
    { icon: DollarSign, label: '总营收', value: `¥${totalRevenue.toFixed(2)}`, color: 'text-pink-500', bg: 'bg-pink-100' },
    { icon: TrendingUp, label: '待处理', value: orders.filter((o) => o.status === 'pending').length, color: 'text-orange-500', bg: 'bg-orange-100' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">仪表盘</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center`}>
                <s.icon className={`w-6 h-6 ${s.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">最近订单</h2>
        {orders.length === 0 ? (
          <p className="text-gray-400 py-8 text-center">暂无订单</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-3 font-medium">订单号</th>
                  <th className="pb-3 font-medium">客户</th>
                  <th className="pb-3 font-medium">金额</th>
                  <th className="pb-3 font-medium">状态</th>
                  <th className="pb-3 font-medium">时间</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.id} className="border-b last:border-0">
                    <td className="py-3 font-medium">#{o.id}</td>
                    <td className="py-3">{o.customer.name}</td>
                    <td className="py-3">¥{o.totalAmount.toFixed(2)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        o.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        o.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                        o.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                        o.status === 'completed' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {o.status === 'pending' ? '待确认' :
                         o.status === 'confirmed' ? '已确认' :
                         o.status === 'shipped' ? '已发货' :
                         o.status === 'completed' ? '已完成' : '已取消'}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500">{new Date(o.createdAt).toLocaleDateString('zh-CN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
