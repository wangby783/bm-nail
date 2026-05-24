import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();

  const links = [
    { to: '/admin', icon: LayoutDashboard, label: '仪表盘', exact: true },
    { to: '/admin/products', icon: Package, label: '产品管理' },
    { to: '/admin/orders', icon: ShoppingBag, label: '订单管理' },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0 hidden md:block">
        <div className="p-6">
          <Link to="/admin" className="text-xl font-bold tracking-widest text-pink-400">
            BM 后台
          </Link>
        </div>
        <nav className="px-4 space-y-1">
          {links.map((link) => {
            const active = link.exact
              ? location.pathname === link.to
              : location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  active
                    ? 'bg-pink-600 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="px-4 mt-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-500 hover:text-white text-sm px-4 py-3 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> 返回前台
          </Link>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 text-white z-50">
        <div className="flex justify-around py-3">
          {links.map((link) => {
            const active = link.exact
              ? location.pathname === link.to
              : location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex flex-col items-center gap-1 text-xs ${
                  active ? 'text-pink-400' : 'text-gray-400'
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 md:p-8 pb-20 md:pb-8">
        <Outlet />
      </div>
    </div>
  );
}
