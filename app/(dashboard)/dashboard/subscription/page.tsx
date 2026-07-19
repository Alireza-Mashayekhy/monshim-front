// app/(dashboard)/subscription/page.tsx
'use client';

import { CheckCircle, Gem } from 'lucide-react';
import { useState } from 'react';

import DashboardShell from '@/components/dashboard/layout/dashboard-shell';
import AppCard from '@/components/shared/app-card';
import FadeIn from '@/components/shared/fade-in';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

type Duration = 'monthly' | 'quarterly' | 'yearly';

export default function SubscriptionPage() {
  const [selectedDuration, setSelectedDuration] = useState<Duration>('monthly');

  const handleUpgrade = (planLevel: string) => {
    console.log(planLevel);
  };

  return (
    <DashboardShell>
      <FadeIn>
        <AppCard className="text-center">
          <div className="w-16 h-16 bg-linear-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gem size={32} className="text-orange-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-1">
            سطح فعلی: طلایی
          </h2>
          <p className="text-xs text-red-500 mb-2">
            انقضا: {new Date().toLocaleDateString('fa-IR')}
          </p>
          <p className="text-sm text-gray-500">
            شما مجاز به آپلود 10 عکس در نمونه‌کارها هستید.
          </p>
        </AppCard>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="flex bg-gray-100 p-1 rounded-xl mb-4">
          {(['monthly', 'quarterly', 'yearly'] as Duration[]).map(d => (
            <button
              key={d}
              onClick={() => setSelectedDuration(d)}
              className={cn(
                'flex-1 py-2 rounded-lg text-xs font-bold transition-all',
                selectedDuration === d
                  ? 'bg-white shadow text-gray-900'
                  : 'text-gray-500',
              )}
            >
              {d === 'monthly' && 'ماهانه'}
              {d === 'quarterly' && 'سه ماهه'}
              {d === 'yearly' && 'سالانه'}
            </button>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <h3 className="font-bold text-gray-800 text-lg mb-3">پلن‌های ارتقا</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5].map(plan => {
            const isActive = plan === 2;
            return (
              <AppCard
                key={plan}
                className={cn(
                  'border-2 relative',
                  isActive ? 'border-primary shadow-lg' : 'border-gray-100',
                )}
              >
                {isActive && (
                  <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-lg">
                    فعال
                  </div>
                )}
                <h4 className="font-bold text-lg text-gray-800 mb-2">طلایی</h4>
                <p className="text-2xl font-black text-gray-900 mb-4">
                  {formatPrice(100000)}
                  <span className="text-xs text-gray-400 font-normal">
                    {' '}
                    تومان
                  </span>
                </p>
                <ul className="space-y-2 mb-6">
                  {[0, 1, 2, 3, 4, 5].map((f, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <CheckCircle size={14} className="text-green-500" /> {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  variant={isActive ? 'secondary' : 'default'}
                  disabled={isActive}
                  onClick={() => handleUpgrade(plan.toString())}
                >
                  {isActive ? 'پلن فعلی' : 'انتخاب و پرداخت'}
                </Button>
              </AppCard>
            );
          })}
        </div>
      </FadeIn>
    </DashboardShell>
  );
}
