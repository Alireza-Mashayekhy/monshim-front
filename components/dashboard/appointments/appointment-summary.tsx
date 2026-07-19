import { Wallet } from 'lucide-react';

import AppCard from '@/components/shared/app-card';

export default function AppointmentSummary() {
  return (
    <AppCard className="bg-linear-to-br from-primary to-primary-700 text-white">
      <div className="flex justify-between">
        <div>
          <p className="text-white/70">امروز</p>

          <h2 className="mt-2 text-4xl font-bold">12</h2>

          <p className="mt-1">نوبت ثبت شده</p>
        </div>

        <div className="text-right">
          <Wallet size={28} />

          <h3 className="mt-3 text-2xl font-bold">۳.۸ میلیون</h3>

          <p className="text-white/70">درآمد امروز</p>
        </div>
      </div>
    </AppCard>
  );
}
