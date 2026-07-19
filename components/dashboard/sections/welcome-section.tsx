import { ArrowUpRight } from 'lucide-react';

export default function WelcomeCard() {
  return (
    <div className="rounded-[32px] bg-linear-to-br from-primary to-primary-700 text-white p-6 overflow-hidden relative">
      <div className="absolute -left-12 -top-12 h-40 w-40 rounded-full bg-white/10" />

      <div className="absolute right-0 bottom-0 h-28 w-28 rounded-full bg-white/5" />

      <div className="relative">
        <p className="text-white/80">سلام علیرضا 👋</p>

        <h1 className="mt-2 text-3xl font-bold">امروز آماده‌ای؟</h1>

        <p className="mt-3 text-white/80">امروز ۱۲ مشتری داری.</p>

        <button className="mt-6 flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 ">
          مشاهده برنامه امروز
          <ArrowUpRight size={18} />
        </button>
      </div>
    </div>
  );
}
