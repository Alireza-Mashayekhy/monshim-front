// app/(dashboard)/financial/page.tsx
'use client';

import DashboardShell from '@/components/dashboard/layout/dashboard-shell';
import AppCard from '@/components/shared/app-card';
import FadeIn from '@/components/shared/fade-in';
import { formatPrice } from '@/lib/utils';

export default function FinancialPage() {
  // const [showCardModal, setShowCardModal] = useState(false);
  // const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const transactions = [];

  return (
    <DashboardShell>
      <FadeIn>
        <AppCard className="bg-linear-to-br from-primary to-primary-700 text-white">
          <div></div>
          {/* <div className="flex justify-between items-start">
            <div>
              <p className="text-white/70">موجودی کیف پول</p>
              <h2 className="mt-2 text-4xl font-bold">{formatPrice(0)}</h2>
              <p className="text-white/70 text-sm">تومان</p>
            </div>
            <Wallet size={32} className="text-white/50" />
          </div>
          <div className="mt-6 flex gap-3">
            <Button
              variant="secondary"
              className="flex-1 text-primary"
              onClick={() => setShowWithdrawModal(true)}
            >
              <ArrowDownLeft size={16} /> درخواست تسویه
            </Button>
            <Button
              variant="secondary"
              className="flex-1 text-primary"
              onClick={() => setShowCardModal(true)}
            >
              <Plus size={16} /> مدیریت کارت‌ها
            </Button>
          </div> */}
        </AppCard>
      </FadeIn>

      <FadeIn delay={0.1}>
        <h3 className="font-bold text-gray-800 text-sm mb-3">
          تراکنش‌های اخیر
        </h3>
        <div className="space-y-3">
          {transactions.length > 0 ? (
            [0, 1, 2].slice(0, 10).map(t => (
              <AppCard key={t} className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-800 text-sm">توضیحات</p>
                  <span className="text-xs text-gray-400">{Date()}</span>
                </div>
                <span
                  className={`text-sm font-bold ${
                    t % 2 === 0 ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {t % 2 === 0 ? '+' : '-'}
                  {formatPrice(100000)}
                </span>
              </AppCard>
            ))
          ) : (
            <p className="text-gray-400 text-center py-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              تراکنشی یافت نشد
            </p>
          )}
        </div>
      </FadeIn>

      {/* <CardModal open={showCardModal} onOpenChange={setShowCardModal} />
      <WithdrawModal
        open={showWithdrawModal}
        onOpenChange={setShowWithdrawModal}
      /> */}
    </DashboardShell>
  );
}
