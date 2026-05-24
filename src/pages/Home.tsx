import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Truck, Shield, Star } from 'lucide-react';
import ProductCard from '../components/Product/ProductCard';
import ProductGrid from '../components/Product/ProductGrid';
import { useApi } from '../hooks/useApi';
import { CATEGORIES, type Product, type CategoryKey } from '../types';

const categoryList: { key: CategoryKey; icon: string }[] = [
  { key: 'gel-polish', icon: '💅' },
  { key: 'nail-stickers', icon: '✨' },
  { key: 'nail-tools', icon: '🔧' },
  { key: 'nail-accessory', icon: '💎' },
];

export default function Home() {
  const { getProducts } = useApi();
  const [featured, setFeatured] = useState<Product[]>([]);

  useEffect(() => {
    getProducts('featured=true&_limit=8').then(setFeatured).catch(console.error);
  }, []);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="text-8xl absolute top-10 left-10">💅</div>
          <div className="text-6xl absolute bottom-10 right-20">✨</div>
          <div className="text-7xl absolute top-20 right-10">💎</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-wide">
            BM 美甲
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-pink-100 max-w-lg">
            精致美甲，从这里开始。发现属于你的指尖艺术。
          </p>
          <div className="flex gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-pink-600 px-6 py-3 rounded-full font-medium hover:bg-pink-50 transition-colors"
            >
              立即选购 <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 border-2 border-white/50 text-white px-6 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              品牌故事
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Sparkles, title: '精选好物', desc: '严选品质产品' },
            { icon: Truck, title: '满99包邮', desc: '全国快速送达' },
            { icon: Shield, title: '正品保证', desc: '100%官方授权' },
            { icon: Star, title: '会员专属', desc: '积分换购好礼' },
          ].map((f) => (
            <div key={f.title} className="text-center bg-white rounded-2xl p-6 shadow-sm">
              <f.icon className="w-8 h-8 text-pink-500 mx-auto mb-3" />
              <h3 className="font-medium text-gray-900 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">产品分类</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoryList.map((cat) => (
            <Link
              key={cat.key}
              to={`/products?category=${cat.key}`}
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <span className="text-4xl block mb-3">{cat.icon}</span>
              <span className="font-medium text-gray-900">{CATEGORIES[cat.key]}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">精选推荐</h2>
          <Link to="/products" className="text-pink-600 hover:text-pink-700 font-medium flex items-center gap-1">
            查看更多 <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <ProductGrid>
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </ProductGrid>
      </section>
    </div>
  );
}
