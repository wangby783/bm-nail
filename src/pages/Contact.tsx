import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">联系我们</h1>
      <p className="text-gray-500 text-center mb-12">有任何疑问或建议？我们很乐意听到你的声音</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="space-y-6">
          {[
            { icon: Phone, label: '电话', value: '400-888-6666', sub: '周一至周五 9:00-18:00' },
            { icon: Mail, label: '邮箱', value: 'hello@bm-nail.com', sub: '24小时内回复' },
            { icon: MapPin, label: '地址', value: '上海市静安区南京西路1688号', sub: 'BM 美甲体验中心' },
            { icon: Clock, label: '工作时间', value: '09:00 - 18:00', sub: '周一至周五（节假日除外）' },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-2xl shadow-sm p-6 flex gap-4">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{item.label}</h3>
                <p className="text-gray-700">{item.value}</p>
                <p className="text-sm text-gray-400">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">发送消息</h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
              <input
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="请输入您的姓名"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="请输入您的邮箱"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">消息</label>
              <textarea
                rows={4}
                className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
                placeholder="请输入您想说的话..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded-full font-medium hover:bg-pink-600 transition-colors"
            >
              发送消息
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
