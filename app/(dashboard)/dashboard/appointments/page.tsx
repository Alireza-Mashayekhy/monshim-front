// app/(dashboard)/appointments/page.tsx
'use client';

import { useState } from 'react';

import AppointmentFilter from '@/components/dashboard/appointments/appointment-filter';
import AppointmentList from '@/components/dashboard/appointments/appointment-list';
import AppointmentSearch from '@/components/dashboard/appointments/appointment-search';
import AppointmentSummary from '@/components/dashboard/appointments/appointment-summary';
import DashboardShell from '@/components/dashboard/layout/dashboard-shell';
import FadeIn from '@/components/shared/fade-in';

export default function AppointmentsPage() {
  const [filter, setFilter] = useState('today');
  const [search, setSearch] = useState('');

  return (
    <DashboardShell>
      <FadeIn>
        <AppointmentSummary />
      </FadeIn>

      <FadeIn delay={0.1}>
        <AppointmentFilter onFilterChange={setFilter} initialFilter={filter} />
      </FadeIn>

      <FadeIn delay={0.15}>
        <AppointmentSearch onSearch={setSearch} value={search} />
      </FadeIn>

      <FadeIn delay={0.2}>
        <AppointmentList filter={filter} search={search} />
      </FadeIn>
    </DashboardShell>
  );
}
