import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold tracking-widest mb-4">BM</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            BM 美甲，专注于为每一位爱美的你提供高品质美甲产品。从甲油胶到美甲工具，我们用心臻选每一件好物。
          </p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">快速链接</h4>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/products" className="hover:text-pink-400 transition-colors">全部产品</Link>
            <Link to="/about" className="hover:text-pink-400 transition-colors">品牌故事</Link>
            <Link to="/contact" className="hover:text-pink-400 transition-colors">联系我们</Link>
          </div>
        </div>
        <div>
          <h4 className="text-white font-medium mb-4">联系方式</h4>
          <div className="text-sm space-y-2">
            <p>邮箱：hello@bm-nail.com</p>
            <p>电话：400-888-6666</p>
            <p>地址：上海市静安区南京西路1688号</p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-6 text-sm text-gray-500">
        <p>© 2026 BM Nail. Made with <Heart className="w-3 h-3 inline text-pink-500" /> All rights reserved.</p>
      </div>
    </footer>
  );
}
