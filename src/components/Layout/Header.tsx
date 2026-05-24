import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

export default function Header() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-widest text-pink-600">
          BM
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-700 hover:text-pink-600 transition-colors">
            首页
          </Link>
          <Link to="/products" className="text-gray-700 hover:text-pink-600 transition-colors">
            全部产品
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-pink-600 transition-colors">
            品牌故事
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-pink-600 transition-colors">
            联系我们
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative text-gray-700 hover:text-pink-600 transition-colors">
            <ShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-3">
          <Link to="/" className="text-gray-700 py-2" onClick={() => setMenuOpen(false)}>首页</Link>
          <Link to="/products" className="text-gray-700 py-2" onClick={() => setMenuOpen(false)}>全部产品</Link>
          <Link to="/about" className="text-gray-700 py-2" onClick={() => setMenuOpen(false)}>品牌故事</Link>
          <Link to="/contact" className="text-gray-700 py-2" onClick={() => setMenuOpen(false)}>联系我们</Link>
        </div>
      )}
    </header>
  );
}
