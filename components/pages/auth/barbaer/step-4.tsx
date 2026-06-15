import { Button } from '@/components/ui/button';
import { Plus, Scissors, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface servicesType {
  id: string;
  name: string;
  price: string;
  duration: string;
}
export default function BarbaerStep4() {
  const [services, setServices] = useState<servicesType[]>([]);

  const removeService = (id: string) => {
    setServices(services.filter(s => s.id !== id));
  };

  const updateService = (id: string, field: string, value: string) => {
    // If updating price, format it
    const finalValue = value;

    const newServices = services.map(s =>
      s.id === id ? { ...s, [field]: finalValue } : s,
    );
    setServices(newServices);
  };

  const handleServiceAdd = () => {
    setServices([
      ...services,
      { id: Date.now().toString(), name: '', price: '', duration: '30' },
    ]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ... same services step ... */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3 text-green-600 border border-green-100 shadow-sm">
          <Scissors size={28} />
        </div>
        <h2 className="text-lg font-bold text-gray-800">خدمات و قیمت‌ها</h2>
        <p className="text-xs text-gray-500 mt-1">حداقل یک خدمت اضافه کنید</p>
      </div>

      <div className="space-y-4">
        {services.map((service, index) => (
          <div
            key={service.id}
            className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm relative group hover:border-primary-200 transition-colors"
          >
            <Button
              onClick={e => {
                e.stopPropagation();
                removeService(service.id);
              }}
              className="absolute top-3 left-3 text-gray-400 hover:text-red-500 p-1 hover:bg-red-50 rounded-lg transition-colors z-10"
            >
              <Trash2 size={16} />
            </Button>
            <h4 className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px]">
                {index + 1}
              </span>
              مشخصات خدمت
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <input
                  placeholder="نام خدمت (مثلا اصلاح مو)"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:bg-white focus:border-primary-500 outline-none transition-colors"
                  value={service.name}
                  onChange={e =>
                    updateService(service.id, 'name', e.target.value)
                  }
                />
              </div>
              <input
                placeholder="قیمت (تومان)"
                type="text"
                inputMode="numeric"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:bg-white focus:border-primary-500 outline-none transition-colors dir-ltr text-right"
                value={service.price}
                onChange={e =>
                  updateService(service.id, 'price', e.target.value)
                }
              />
              <select
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 text-sm text-gray-900 focus:bg-white focus:border-primary-500 outline-none transition-colors"
                value={service.duration}
                onChange={e =>
                  updateService(service.id, 'duration', e.target.value)
                }
              >
                <option value="15">۱۵ دقیقه</option>
                <option value="30">۳۰ دقیقه</option>
                <option value="45">۴۵ دقیقه</option>
                <option value="60">۱ ساعت</option>
              </select>
            </div>
          </div>
        ))}

        <button
          onClick={handleServiceAdd}
          className="w-full py-3 border-2 border-dashed border-primary-200 text-primary-600 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary-50 hover:border-primary-300 transition-all text-sm active:scale-95"
        >
          <Plus size={18} />
          افزودن خدمت جدید
        </button>
      </div>
    </div>
  );
}
