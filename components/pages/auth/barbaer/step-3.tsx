import { ImageIcon, Plus, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

export default function BarbaerStep3() {
  const [portfolio, setPortfolio] = useState<string[]>([]);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const portfolioInputRef = useRef<HTMLInputElement>(null);

  const removePortfolioImage = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setPortfolio(prev => prev.filter((_, i) => i !== index));
  };

  const handlePortfolioClick = () => {
    if (portfolio.length >= 5) {
      toast.warning('در ثبت نام اولیه حداکثر ۵ عکس مجاز است.');
      return;
    }
    portfolioInputRef.current?.click();
  };

  const handlePortfolioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (portfolio.length + files.length > 5) {
        toast.error('مجموع عکس‌ها نباید بیشتر از ۵ باشد.');
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result && typeof reader.result === 'string') {
            setPortfolio([...portfolio, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-3 text-purple-600 border border-purple-100 shadow-sm">
          <ImageIcon size={28} />
        </div>
        <h2 className="text-lg font-bold text-gray-800">نمونه کارها</h2>
        <p className="text-xs text-gray-500 mt-1">
          تصاویری از محیط کار یا نمونه کارهای خود اضافه کنید (حداکثر ۵ عکس برای
          شروع)
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {portfolio.map((img, idx) => (
          <div
            key={idx}
            className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm border border-gray-100"
            onClick={() => setLightboxImage(img)}
          >
            <Image fill alt={`img-${idx}`} src={img} objectFit="cover" />
            <button
              onClick={e => removePortfolioImage(e, idx)}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition-opacity z-10"
            >
              <Trash2 size={12} />
            </button>
          </div>
        ))}
        {portfolio.length < 5 && (
          <div
            onClick={handlePortfolioClick}
            className="aspect-square rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 hover:border-primary-300 transition-colors bg-gray-50"
          >
            <Plus size={24} />
            <span className="text-[10px] mt-1 font-bold">افزودن</span>
          </div>
        )}
        <input
          type="file"
          ref={portfolioInputRef}
          onChange={handlePortfolioChange}
          className="hidden"
          accept="image/*"
          multiple
        />
      </div>
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setLightboxImage(null)}
        >
          <button className="absolute top-5 right-5 text-white bg-white/20 p-2 rounded-full z-[101]">
            <X size={24} />
          </button>
          <div className="max-w-full max-h-[80vh] rounded-lg shadow-2xl z-[101]">
            <Image
              fill
              alt="new image"
              src={lightboxImage}
              onClick={e => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
}
