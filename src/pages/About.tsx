import { Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">关于 BM</h1>
        <p className="text-xl text-gray-500">Beauty in Motion — 美在指尖流动</p>
      </div>

      {/* Story */}
      <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">品牌故事</h2>
        <div className="text-gray-600 leading-relaxed space-y-4">
          <p>
            BM 美甲创立于 2023 年，源于创始人对美甲艺术的热爱。我们发现市场上缺乏一个兼具品质与设计感的美甲产品品牌，于是决定自己创造一个。
          </p>
          <p>
            BM 的名字取自 "Beauty in Motion"，寓意美在指尖流动。我们相信，每一个指尖都是一块小小的画布，值得被精心装点。
          </p>
          <p>
            从甲油胶到美甲饰品，从专业工具到新手套装，BM 用心臻选每一件产品。我们与国内外优质供应商合作，确保每一件产品都经过严格的质量检验。
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            title: '品质至上',
            desc: '严格筛选原材料，每批产品经过多重质检，确保安全环保。',
          },
          {
            title: '设计驱动',
            desc: '紧跟国际美甲潮流，每月上新，让你始终走在时尚前沿。',
          },
          {
            title: '用心服务',
            desc: '7天无理由退换，售前售后全程陪伴，让每一次购物都安心无忧。',
          },
        ].map((v) => (
          <div key={v.title} className="bg-white rounded-2xl shadow-sm p-6 text-center">
            <Heart className="w-8 h-8 text-pink-500 mx-auto mb-4" />
            <h3 className="font-bold text-gray-900 mb-3">{v.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Join */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-400 rounded-2xl p-8 md:p-12 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">加入 BM 大家庭</h2>
        <p className="text-pink-100 mb-6">关注我们的社交媒体，获取最新产品资讯和美甲灵感</p>
        <div className="flex justify-center gap-6 text-3xl">
          <span className="cursor-pointer hover:scale-110 transition-transform">📱</span>
          <span className="cursor-pointer hover:scale-110 transition-transform">📷</span>
          <span className="cursor-pointer hover:scale-110 transition-transform">🎵</span>
        </div>
      </div>
    </div>
  );
}
