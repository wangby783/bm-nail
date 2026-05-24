import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { ORDER_STATUS, type Order } from '../../types';
import { ChevronDown } from 'lucide-react';

export default function OrderManager() {
  const { getOrders, updateOrder } = useApi();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const loadOrders = () => {
    getOrders()
      .then(setOrders)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadOrders(); }, []);

  const handleStatusChange = async (id: number, status: Order['status']) => {
    try {
      await updateOrder(id, { status });
      loadOrders();
    } catch (err) {
      console.error(err);
      alert('更新失败');
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-400">加载中...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">订单管理</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center text-gray-400">
          暂无订单
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Order Header */}
              <div
                className="p-6 flex flex-wrap items-center justify-between gap-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-6">
                  <span className="font-bold text-gray-900">#{order.id}</span>
                  <span className="text-gray-600">{order.customer.name}</span>
                  <span className="text-gray-400 text-sm">{order.customer.phone}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-pink-600">¥{order.totalAmount.toFixed(2)}</span>
                  <select
                    value={order.status}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                    className={`px-3 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                      order.status === 'completed' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {Object.entries(ORDER_STATUS).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                  <span className="text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleString('zh-CN')}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedId === order.id ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Order Detail */}
              {expandedId === order.id && (
                <div className="border-t px-6 py-4 bg-gray-50">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">收货信息</h4>
                    <p className="text-sm text-gray-600">
                      {order.customer.name} · {order.customer.phone}
                    </p>
                    <p className="text-sm text-gray-600">{order.customer.address}</p>
                    {order.customer.note && (
                      <p className="text-sm text-gray-400 mt-1">备注：{order.customer.note}</p>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">商品明细</h4>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {item.name} x{item.quantity}
                          </span>
                          <span className="text-gray-900 font-medium">
                            ¥{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
