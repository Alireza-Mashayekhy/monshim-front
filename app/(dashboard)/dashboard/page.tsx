import { Calendar, DollarSign, Star, Users } from 'lucide-react';

import StatCard from '@/components/dashboard/cards/stat-card';
import DashboardShell from '@/components/dashboard/layout/dashboard-shell';
import WelcomeCard from '@/components/dashboard/sections/welcome-section';
import FadeIn from '@/components/shared/fade-in';

export default function DashboardPage() {
  return (
    <DashboardShell>
      <FadeIn>
        <WelcomeCard />
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="grid gap-2 lg:gap-4 grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="درآمد امروز"
            value="۲,۵۰۰,۰۰۰"
            icon={DollarSign}
            className="col-span-2 xl:col-span-1"
          />
          <StatCard
            title="نوبت امروز"
            value="۱۲"
            icon={Calendar}
            className="col-span-1 xl:col-span-1"
          />
          <StatCard
            title="امتیاز"
            value="۴.۹"
            icon={Star}
            className="col-span-1 xl:col-span-1"
          />
          <StatCard
            title="مشتریان"
            value="۳۵"
            icon={Users}
            className="col-span-2 xl:col-span-1"
          />
        </div>
      </FadeIn>
    </DashboardShell>
  );
}
